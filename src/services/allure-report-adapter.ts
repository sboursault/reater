import { AllureReport, AllureStep, Label } from '@/types/allure-report';
import { Status, Step } from '@/types/report';
import { newUuid } from './uuid-factory';
import { join } from 'path';
import * as fs from 'fs';
import { FlatReport } from '@/types/flat-report';

export function convertReportFromFiles(reportFiles: string[]): FlatReport[] {
  return reportFiles.map((reportFile) => {
    const report: AllureReport = JSON.parse(
      fs.readFileSync(join(process.cwd(), reportFile)).toString()
    );
    return {
      uuid: newUuid(),
      name: report.name,
      path: buildTestPath(report),
      testFile: findLabelOrError(report, 'suite'),
      project: findLabelOrError(report, 'parentSuite'),
      status: report.status === 'passed' ? Status.passed : Status.failed,
      error: undefined,
      steps: report.steps.map(convertStep),
    };
  });
}

function buildTestPath(report: AllureReport): string {
  const suite = findLabelOrError(report, 'suite');
  const subSuite = findLabel(report, 'subSuite');
  return subSuite ? suite + '/' + subSuite.replaceAll(' > ', '/') : suite;
}

function findLabelOrError(report: AllureReport, labelName: string): string {
  const label = findLabel(report, labelName);
  if (label == undefined) {
    throw `no label found with name ${labelName} in Allure report ${report}`;
  }
  return label;
}

function findLabel(report: AllureReport, labelName: string): string | undefined {
  const label = report.labels.find((label) => label.name === labelName);
  return label ? label.value : undefined;
}

function convertStep(source: AllureStep): Step {
  return {
    name: source.name,
    start: source.start,
    stop: source.stop,
    attachments: [],
    status: source.status == 'passed' ? Status.passed : Status.failed,
    steps: source.steps.map(convertStep),
  };
}
