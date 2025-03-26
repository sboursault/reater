import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Status } from '@/types/report.js';
import { FlatReport } from '@/types/flat-report.js';
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
    const input: FlatReport[] = [
      {
        uuid: '0001',
        name: 'After login, the mini basket contains the items from my last session',
        path: 'basket-recovery.spec.ts',
        testFile: 'basket-recovery.spec.ts',
        project: 'chromium',
        status: Status.success,
        steps: [],
      },
      {
        uuid: '0002',
        name: 'After logout, the mini basket is empty',
        path: 'basket-recovery.spec.ts',
        testFile: 'basket-recovery.spec.ts',
        project: 'chromium',
        status: Status.success,
        steps: [],
      },
      {
        uuid: '0003',
        name: 'The login accepts valid credentials',
        path: 'authentication.spec.ts/Login/With valid Credentials',
        testFile: 'authentication.spec.ts',
        project: 'chromium',
        status: Status.failed,
        steps: [],
      },
      {
        uuid: '0004',
        name: 'For baskets strictly bellow 30€, we charge 7€ delivery fees',
        path: 'checkout/delivery-fees.spec.ts',
        testFile: 'checkout/delivery-fees.spec.ts',
        project: 'chromium',
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
              name: 'With valid Credentials',
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
    const input: FlatReport[] = [
      {
        uuid: '0001',
        name: 'After login, the mini basket contains the items from my last session',
        path: 'basket-recovery.spec.ts',
        testFile: 'basket-recovery.spec.ts',
        project: 'chromium',
        status: Status.success,
        steps: [],
      },
      {
        uuid: '0003',
        name: 'The login accepts valid credentials',
        path: 'user/login.spec.ts',
        testFile: 'user/login.spec.ts',
        project: 'chromium',
        status: Status.failed,
        steps: [],
      },
      {
        uuid: '0004',
        name: 'The login accepts valid credentials',
        path: 'user/login.spec.ts',
        testFile: 'user/login.spec.ts',
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

  test('flatten top level describe', () => {
    const input: FlatReport[] = [
      {
        uuid: '0001',
        name: 'The mini basket contains the items from my last session',
        path: 'basket-recovery.spec.ts/After login',
        testFile: 'basket-recovery.spec.ts',
        project: 'chromium',
        status: Status.success,
        steps: [],
      },
      {
        uuid: '0002',
        name: 'The mini basket is empty',
        path: 'basket-recovery.spec.ts/After logout',
        testFile: 'basket-recovery.spec.ts',
        project: 'chromium',
        status: Status.success,
        steps: [],
      },
      {
        uuid: '0003',
        name: 'The login accepts valid credentials',
        path: 'login.spec.ts/Login',
        testFile: 'login.spec.ts',
        project: 'chromium',
        status: Status.failed,
        steps: [],
      },
    ];

    const got = buildReportFromFlatItems(input);

    expect(got.tests).toMatchObject({
      subSuites: [
        {
          name: 'Basket recovery',
          subSuites: [
            {
              name: 'After login',
              tests: [
                {
                  name: 'The mini basket contains the items from my last session',
                },
              ],
            },
            {
              name: 'After logout',
              tests: [
                {
                  name: 'The mini basket is empty',
                },
              ],
            },
          ],
        },
        {
          name: 'Login',
          tests: [
            {
              name: 'The login accepts valid credentials',
            },
          ],
        },
      ],
    });
  });
});
