import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Status, Suite, Test } from '@/types/report.js';
import { FlatReport } from '@/types/flat-report.js';
import { buildReportFromFlatItems } from '@/services/report-utils.js';

vi.mock('../../services/uuid-factory', () => {
  return {
    newUuid: vi.fn().mockImplementation(() => '0000'),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Test', {}, () => {
  test('calculate test stats', () => {
    const test = new Test('My test', 'file.spec.ts ');

    test.addExecution({
      name: 'firefox',
      status: Status.success,
    });

    expect(test).toEqual({
      name: 'My test',
      path: 'file.spec.ts ',
      executions: [
        {
          name: 'firefox',
          status: Status.success,
        },
      ],
      stats: {
        passedCount: 1,
        failedCount: 0,
        skippedCount: 0,
      },
      uuid: '0000',
    });
  });

});
