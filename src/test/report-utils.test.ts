import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Status } from '@/types/report.js';
import { FlatReportItem } from '@/types/flat-report.js';
import { buildReportFromFlatItems } from '@/services/report-utils.js';

vi.mock('../services/uuid-factory', () => {
  return {
    newUuid: vi.fn().mockImplementation(() => '0000'),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('buildReportFromFlatItems', {}, () => {
  test('build tree', () => {
    const input: FlatReportItem[] = [
      {
        uuid: '0001',
        name: 'After login, the mini basket contains the items from my last session',
        path: 'basket-recovery.spec.ts',
        project: 'chromium',
        status: Status.success,
        steps: [],
      },
      {
        uuid: '0002',
        name: 'After logout, the mini basket is empty',
        path: 'basket-recovery.spec.ts',
        project: 'chromium',
        status: Status.success,
        steps: [],
      },
      {
        uuid: '0003',
        name: 'The login accepts valid credentials',
        path: 'login.spec.ts/Login',
        project: 'chromium',
        status: Status.failed,
        steps: [],
      },
      {
        uuid: '0004',
        name: 'For baskets strictly bellow 30€, we charge 7€ delivery fees',
        path: 'checkout/delivery-fees.spec.ts',
        project: 'chromium',
        status: Status.success,
        steps: [],
      },
      /*{
        uuid: '0004',
        name: 'For baskets strictly bellow 30€, we charge 7€ delivery fees',
        path: 'checkout/delivery-fees.spec.ts',
        project: 'firefox',
        status: Status.success,
        steps: [],
      },*/
    ];

    const got = buildReportFromFlatItems(input);

    expect(got.tests).toMatchObject({
      subSuites: [
        {
          name: 'Basket recovery',
          tests: [
            {
              name: 'After login, the mini basket contains the items from my last session',
              executions: [{ name: 'chromium' }],
            },
            {
              name: 'After logout, the mini basket is empty',
              executions: [{ name: 'chromium' }],
            },
          ],
        },
        {
          name: 'Login',
          subSuites: [
            {
              name: 'Login',
              tests: [
                {
                  name: 'The login accepts valid credentials',
                  executions: [{ name: 'chromium' }],
                },
              ],
            },
          ],
        },
        {
          name: 'Checkout',
          subSuites: [
            {
              name: 'Delivery fees',
              tests: [
                {
                  name: 'For baskets strictly bellow 30€, we charge 7€ delivery fees',
                  executions: [{ name: 'chromium' }],
                },
              ],
            },
          ],
        },
      ],
    });
  });

  test('calculate stats', () => {
    const input: FlatReportItem[] = [
      {
        uuid: '0001',
        name: 'After login, the mini basket contains the items from my last session',
        path: 'basket-recovery.spec.ts',
        project: 'chromium',
        status: Status.success,
        steps: [],
      },
      {
        uuid: '0003',
        name: 'The login accepts valid credentials',
        path: 'user/login.spec.ts',
        project: 'chromium',
        status: Status.failed,
        steps: [],
      },
      {
        uuid: '0004',
        name: 'The login accepts valid credentials',
        path: 'user/login.spec.ts',
        project: 'firefox',
        status: Status.success,
        steps: [],
      },
    ];

    const got = buildReportFromFlatItems(input);

    expect(got.tests).toMatchObject({
      subSuites: [
        {
          name: 'Basket recovery',
          tests: [
            {
              name: 'After login, the mini basket contains the items from my last session',
              executions: [{ name: 'chromium' }],
              stats: {
                passedCount: 1,
                failedCount: 0,
                skippedCount: 0,
              },
            },
          ],
          stats: {
            passedCount: 1,
            failedCount: 0,
            skippedCount: 0,
          },
        },
        {
          name: 'User',
          subSuites: [
            {
              name: 'Login',
              tests: [
                {
                  name: 'The login accepts valid credentials',
                  executions: [{ name: 'chromium' }, { name: 'firefox' }],
                  stats: {
                    passedCount: 1,
                    failedCount: 1,
                    skippedCount: 0,
                  },
                },
              ],
              stats: {
                passedCount: 1,
                failedCount: 1,
                skippedCount: 0,
              },
            },
          ],
          stats: {
            passedCount: 1,
            failedCount: 1,
            skippedCount: 0,
          },
        },
      ],
    });
  });

  /*test('flatten top level describe', () => {
    const input: PwReport = {
      suites: [
        {
          // a test file with a single top level describe
          title: 'basket-recovery.spec.ts',
          file: 'basket-recovery.spec.ts',
          column: 0,
          line: 0,
          suites: [
            {
              title: 'Basket recovery',
              file: 'basket-recovery.spec.ts',
              line: 0,
              column: 0,
              specs: [],
            },
          ],
          specs: [],
        },
        {
          // a test file without top level describe
          title: 'delivery-fees.spec.ts',
          file: 'delivery-fees.spec.ts',
          column: 0,
          line: 0,
          specs: [],
        },
        {
          // a test file without several top level describes
          title: 'account.spec.ts',
          file: 'account.spec.ts',
          column: 0,
          line: 0,
          suites: [
            {
              title: 'Registration',
              file: 'account.spec.ts',
              line: 0,
              column: 0,
              specs: [],
            },
            {
              title: 'Login',
              file: 'account.spec.ts',
              line: 0,
              column: 0,
              specs: [],
            },
          ],
          specs: [],
        },
      ],
    };
    expect(convertReport(input)).toEqual({
      tests: {
        name: '',
        uuid: '0000',
        tests: [
          {
            name: 'Basket recovery',
            uuid: '0000',
            tests: [],
          },
          {
            name: 'Delivery fees',
            tests: [],
            uuid: '0000',
          },
          {
            name: 'Account',
            tests: [
              {
                name: 'Registration',
                tests: [],
                uuid: '0000',
              },
              {
                name: 'Login',
                tests: [],
                uuid: '0000',
              },
            ],
            uuid: '0000',
          },
        ],
      },
    });
  });*/
});
