import { AllureReport } from '@/types/allure-report';
import { Report } from '@/types/report';
import { newUuid } from './uuid-factory';
import { groupSpecFileReportsByFolders, suiteNameFromFileName } from './report-utils';

export function convertReport(source: AllureReport): Report {
  return groupSpecFileReportsByFolders([
    {
      name: suiteNameFromFileName(source.labels.find((it) => it.name === 'suite')?.value || ''),
      uuid: newUuid(),
      tests : [
        {
          name: source.name,
          executions: [],
          uuid: newUuid(),
        }
      ]
    },
  ]);
}
