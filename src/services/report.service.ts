import { Report, Status, Test, Suite, Statistics } from '@/types/report';
import { v4 as uuidv4 } from 'uuid';
import { getFromReportFile } from './pw-json-report-adapter';
import { buildReportFromFlatItems } from './report-utils';

export function getReport(): Report {
  const report: Report = buildReportFromFlatItems(getFromReportFile());
  report.tests.stats = calculateSuiteStatistics(report.tests);
  return report;
}

function calculateSuiteStatistics(suite: Suite | Test) {
  if ('executions' in suite) {
    return calculateTestStatistics(suite);
  }

  if ('tests' in suite) {
    (suite.tests || []).forEach((each) => {
      each.stats = calculateSuiteStatistics(each);
    });
    const result = new Statistics();
    (suite.tests || []).forEach((each) => {
      if (each.stats) {
        result.passedCount += each.stats.passedCount;
        result.failedCount += each.stats.failedCount;
        result.skippedCount += each.stats.skippedCount;
      }
    });
    return result;
  }
}

function calculateTestStatistics(test: Test) {
  const result = new Statistics();
  test.executions.forEach((each) => {
    if (each.status == Status.success) result.passedCount++;
    if (each.status == Status.failed) result.failedCount++;
    if (each.status == Status.skipped) result.skippedCount++;
  });
  return result;
}

export function getDummyReport(): Suite {
  return {
    name: '',
    uuid: uuidv4(),
    tests: [
      {
        name: 'Test 1',
        uuid: uuidv4(),
        executions: [
          {
            name: 'chromium',
            status: Status.success,
          },
          {
            name: 'firefox',
            status: Status.failed,
          },
        ],
        steps: ['Step 1', 'Step 2', 'Step 3'],
      },
      {
        name: 'Group 2',
        uuid: uuidv4(),
        tests: [
          {
            name: 'Test 2-1',
            uuid: uuidv4(),
            executions: [
              {
                name: 'chromium',
                status: Status.success,
              },
            ],
            steps: ['Step 1', 'Step 2', 'Step 3'],
          },
          {
            name: 'Group 2-2',
            uuid: uuidv4(),
            tests: [
              {
                name: 'Test 2-2-1',
                uuid: uuidv4(),
                executions: [
                  {
                    name: 'chromium',
                    status: Status.failed,
                  },
                ],
                steps: ['Step 1', 'Step 2', 'Step 3'],
              },
              {
                name: 'Test 2-2-2',
                uuid: uuidv4(),
                executions: [
                  {
                    name: 'chromium',
                    status: Status.skipped,
                  },
                ],
                steps: ['Step 1', 'Step 2', 'Step 3'],
              },
              {
                name: 'Group 2-2-3',
                uuid: uuidv4(),
                tests: [
                  {
                    name: 'Test 2-2-3-1',
                    uuid: uuidv4(),
                    executions: [
                      {
                        name: 'chromium',
                        status: Status.success,
                      },
                    ],
                    steps: ['Step 1', 'Step 2', 'Step 3'],
                  },
                  {
                    name: 'Test 2-2-3-2',
                    uuid: uuidv4(),
                    executions: [
                      {
                        name: 'chromium',
                        status: Status.success,
                      },
                    ],
                    steps: ['Step 1', 'Step 2', 'Step 3'],
                  },
                  {
                    name: 'Group 2-2-3-3',
                    uuid: uuidv4(),
                    tests: [
                      {
                        name: 'Test 2-2-3-3-1',
                        uuid: uuidv4(),
                        executions: [
                          {
                            name: 'chromium',
                            status: Status.success,
                          },
                        ],
                        steps: ['Step 1', 'Step 2', 'Step 3'],
                      },
                      {
                        name: 'Test 2-2-3-3-2',
                        uuid: uuidv4(),
                        executions: [
                          {
                            name: 'chromium',
                            status: Status.failed,
                          },
                        ],
                        steps: ['Step 1', 'Step 2', 'Step 3'],
                      },
                      {
                        name: 'Test 2-2-3-3-3',
                        uuid: uuidv4(),
                        executions: [
                          {
                            name: 'chromium',
                            status: Status.success,
                          },
                        ],
                        steps: ['Step 1', 'Step 2', 'Step 3'],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Test 2-3',
            uuid: uuidv4(),
            executions: [
              {
                name: 'chromium',
                status: Status.success,
              },
            ],
            steps: ['Step 1', 'Step 2', 'Step 3'],
          },
        ],
      },
      {
        name: 'Group 3',
        uuid: uuidv4(),
        tests: [
          {
            name: 'Test 3-1',
            uuid: uuidv4(),
            executions: [
              {
                name: 'chromium',
                status: Status.success,
              },
            ],
            steps: ['Step 1', 'Step 2', 'Step 3'],
          },
          {
            name: 'Test 3-3',
            uuid: uuidv4(),
            executions: [
              {
                name: 'chromium',
                status: Status.skipped,
              },
            ],
            steps: ['Step 1', 'Step 2', 'Step 3'],
          },
        ],
      },
      {
        name: 'Test 4',
        uuid: uuidv4(),
        executions: [
          {
            name: 'chromium',
            status: Status.success,
          },
        ],
        steps: ['Step 1', 'Step 2', 'Step 3'],
      },
    ],
  };
}
