import { Report, Suite, Test } from '@/types/report';

import { newUuid } from './uuid-factory';
import { FlatReportItem as FlatReport } from '@/types/flat-report';

export function buildReportFromFlatItems(source: FlatReport[]): Report {
  const root = new Suite('');
  source.forEach((report) => {
    root.addFlatReport(report)
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
