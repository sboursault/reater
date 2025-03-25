import { Report, Suite, Test } from '@/types/report';

import { newUuid } from './uuid-factory';
import { FlatReport as FlatReport } from '@/types/flat-report';

export function buildReportFromFlatItems(source: FlatReport[]): Report {
  const root = new Suite('', '');
  source.forEach((report) => {
    root.addFlatReport(report);
  });
  root.subSuites;
  flattenTopLevelDescribe(null, root);
  return {
    tests: root,
  };
}

export function suiteNameFromFileName(filename: string) {
  return capitalizeFirstLetter(
    filename
      .replace('.test.ts', '')
      .replace('.test.js', '')
      .replace('.spec.ts', '')
      .replace('.spec.js', '')
      .replace('-', ' ')
  );
}

export function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function flattenTopLevelDescribe(parentSuite: Suite | null, childSuite: Suite) {
  if (childSuite.testFile == '')
    childSuite.subSuites.forEach((each) => {
      flattenTopLevelDescribe(childSuite, each);
    });
  else if (parentSuite && childSuite.tests.length == 0 && childSuite.subSuites.length == 1) {
    parentSuite.subSuites[parentSuite.subSuites.indexOf(childSuite)] = childSuite.subSuites[0];
  }
}
