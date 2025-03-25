import { AllureReport } from '@/types/allure-report';
import { Report, Status } from '@/types/report';
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
      path: report.labels.find((label) => label.name === 'suite')?.value || '',
      testFile: report.labels.find((label) => label.name === 'suite')?.value || '',
      project: report.labels.find((label) => label.name === 'parentSuite')?.value || '',
      status: report.status === 'passed' ? Status.success : Status.failed,
      error: undefined,
      steps: []
    };
  });
}
