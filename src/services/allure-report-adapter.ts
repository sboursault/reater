import { AllureReport } from '@/types/allure-report';
import { Report } from '@/types/report';
import { newUuid } from './uuid-factory';
import { groupSpecFileReportsByFolders, suiteNameFromFileName } from './report-utils';
import { join } from 'path';
import * as fs from 'fs';

export function convertReportFromFiles(paths: string[]) {
  const report: AllureReport = JSON.parse(
    fs.readFileSync(join(process.cwd(), paths[0])).toString()
  );
  return convertReport(report);
}

function convertReport(source: AllureReport): Report {
  return groupSpecFileReportsByFolders([
    {
      name: suiteNameFromFileName(source.labels.find((it) => it.name === 'suite')?.value || ''),
      uuid: newUuid(),
      tests: [
        {
          name: source.name,
          executions: [],
          uuid: newUuid(),
        },
      ],
    },
  ]);
}
