import { Report, Status, Test, Suite, Statistics } from '@/types/report';
import { v4 as uuidv4 } from 'uuid';
import { getFromReportFile } from './pw-json-report-adapter';
import { buildReportFromFlatItems } from './report-utils';

export function getReport(): Report {
  const report: Report = buildReportFromFlatItems(getFromReportFile());
  calculateSuiteStatistics(report.tests);
  return report;
}

function calculateSuiteStatistics(suite: Suite) {
  suite.tests.forEach((test) => calculateTestStatistics(test));
  suite.subSuites.forEach((subSuite) => calculateSuiteStatistics(subSuite));

  const result = new Statistics();
  const subStats: Statistics[] = suite.tests
    .map((test) => test.stats || new Statistics())  // try to replace by composable types
    .concat(suite.subSuites.map((subSuite) => subSuite.stats || new Statistics()));

  subStats.forEach((each) => {
    result.passedCount += each.passedCount;
    result.failedCount += each.failedCount;
    result.skippedCount += each.skippedCount;
  });

  return suite.stats = result;
}

function calculateTestStatistics(test: Test) {
  const result = new Statistics();
  test.executions.forEach((each) => {
    if (each.status == Status.success) result.passedCount++;
    if (each.status == Status.failed) result.failedCount++;
    if (each.status == Status.skipped) result.skippedCount++;
  });
  test.stats = result;
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
