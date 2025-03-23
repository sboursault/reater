import { Report, Suite, Test } from '@/types/report';

import { newUuid } from './uuid-factory';
import { FlatReportItem as FlatReport } from '@/types/flat-report';

export function buildReportFromFlatItems(source: FlatReport[]): Report {
  const root: Suite = {
    uuid: newUuid(),
    name: '',
    subSuites: [],
    tests: [],
  };

  source.forEach((report) => {
    let parentNode = root;
    for (let pathPart of report.path.split('/')) {
      if (pathPart.endsWith('.ts') || pathPart.endsWith('.js'))
        pathPart = suiteNameFromFileName(pathPart);
      else pathPart = capitalizeFirstLetter(pathPart);

      let node = parentNode.subSuites.find((node) => node.name === pathPart);
      if (node === undefined) {
        node = {
          uuid: newUuid(),
          name: pathPart,
          subSuites: [],
          tests: [],
        };
        parentNode.subSuites.push(node);
      }
      parentNode = node;
    }

    let testNode = parentNode.tests.find((node) => node.name === report.name);
    if (testNode === undefined) {
      testNode = new Test(report.name, report.path + '/' + report.name);
      parentNode.tests.push(testNode);
    }
    testNode.addExecution({
      name: report.project,
      status : report.status,
      error : report.error
    });
  });

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
