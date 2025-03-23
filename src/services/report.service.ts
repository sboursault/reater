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
  suite.subSuites.forEach((subSuite) => calculateSuiteStatistics(subSuite));

  const result = new Statistics();
  const subStats: Statistics[] = suite.tests
    .map((test) => test.stats) 
    .concat(suite.subSuites.map((subSuite) => subSuite.stats || new Statistics()));  // move this to an addExecution method

  subStats.forEach((each) => {
    result.passedCount += each.passedCount;
    result.failedCount += each.failedCount;
    result.skippedCount += each.skippedCount;
  });

  return suite.stats = result;
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
