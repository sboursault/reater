import { PwReport, PwSpec, PwSuite } from '@/types/playwright-report';
import { Report, Statistics, Status, Test } from '@/types/report';
import playwrightReport from '../../test-results-3-projects.json';
import { newUuid } from './uuid-factory';
import { buildReportFromFlatItems, suiteNameFromFileName } from './report-utils';
import { FlatReport } from '@/types/flat-report';

export function getFromReportFile(): FlatReport[] {
  return convertToFlatReport(playwrightReport);
}

export function convertToFlatReport(source: PwReport): FlatReport[] {
  return convertSuite(source, '');
}

function convertSuite(source: PwSuite | PwReport, path: string): FlatReport[] {
  let result: FlatReport[] = [];
  if (source.suites) {
    for (const suite of source.suites) {
      result = result.concat(convertSuite(suite, (path ? path + '/' : '') + suite.title));
    }
  }
  if ('specs' in source) {
    result = result.concat(source.specs.map((spec) => convertSpec(spec, path)));
  }
  return result;
}

function convertSpec(source: PwSpec, path: string): FlatReport {
  return {
    uuid: newUuid(),
    name: source.title,
    path,
    testFile: source.file,
    project: source.tests[0].projectName,
    steps: [],
    status: source.tests[0].results[0].error == null ? Status.success : Status.failed,
    error: source.tests[0].results[0].error,
  };
}
