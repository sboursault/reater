import { beforeEach, describe, expect, test, vi } from 'vitest';
import { convertToFlatReport } from '../services/pw-json-report-adapter.js';
import { PwReport } from '@/types/playwright-report.js';
import { Status } from '@/types/report.js';

vi.mock('../services/uuid-factory', () => {
  return {
    newUuid: vi.fn().mockImplementation(() => '0000'),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('convertReport', {}, () => {
  test('convert spec', () => {
    const input: PwReport = {
      suites: [
        {
          title: 'basket-recovery.spec.ts',
          file: 'basket-recovery.spec.ts',
          column: 0,
          line: 0,
          specs: [
            {
              title: 'After login, the mini basket contains the items from my last session',
              ok: false,
              tags: [],
              tests: [
                {
                  projectName: 'chromium',
                  results: [
                    {
                      status: 'failed',
                      duration: 371,
                      error: {
                        message: 'An error message',
                        stack: 'stacktrace',
                      },
                    },
                  ],
                },
              ],
              id: '06f3687a23c3c5be608e-6a02f0817b59caf6b379',
              file: 'basket-recovery.spec.ts',
              line: 8,
              column: 7,
            },
          ],
        },
      ],
    };

    const got = convertToFlatReport(input);

    expect(got[0]).toEqual({
      uuid: '0000',
      name: 'After login, the mini basket contains the items from my last session',
      path: 'basket-recovery.spec.ts',
      project: 'chromium',
      status: Status.failed,
      steps: [],
      error: {
        message: 'An error message',
        stack: 'stacktrace',
      },
    });
  });

  test('preserve path', () => {
    const input: PwReport = {
      suites: [
        {
          title: 'basket-recovery.spec.ts',
          file: 'basket-recovery.spec.ts',
          column: 0,
          line: 0,
          specs: [
            {
              title: 'After login, the mini basket contains the items from my last session',
              ok: false,
              tags: [],
              tests: [
                {
                  projectName: 'chromium',
                  results: [
                    {
                      status: 'passed',
                      duration: 371,
                    },
                  ],
                },
              ],
              id: '06f3687a23c3c5be608e-6a02f0817b59caf6b379',
              file: 'basket-recovery.spec.ts',
              line: 8,
              column: 7,
            },
            {
              title: 'After logout, the mini basket is empty',
              ok: false,
              tags: [],
              tests: [
                {
                  projectName: 'chromium',
                  results: [
                    {
                      status: 'passed',
                      duration: 323,
                    },
                  ],
                },
              ],
              id: '06f3687a23c3c5be608e-2a15e651d9535ad0d4c4',
              file: 'basket-recovery.spec.ts',
              line: 25,
              column: 7,
            },
          ],
        },
        {
          title: 'login.spec.ts',
          file: 'login.spec.ts',
          column: 0,
          line: 0,
          specs: [],
          suites: [
            {
              title: 'Login',
              file: 'login.spec.ts',
              line: 4,
              column: 6,
              specs: [
                {
                  title: 'The login accepts valid credentials',
                  ok: false,
                  tags: [],
                  tests: [
                    {
                      projectName: 'chromium',
                      results: [
                        {
                          status: 'passed',
                          duration: 5882,
                        },
                      ],
                    },
                  ],
                  id: '41d3fd2474a19feb00a1-e9b86894e28a801a07e0',
                  file: 'login.spec.ts',
                  line: 5,
                  column: 7,
                },
              ],
            },
          ],
        },
        {
          title: 'checkout/delivery-fees.spec.ts',
          file: 'checkout/delivery-fees.spec.ts',
          column: 0,
          line: 0,
          specs: [
            {
              title: 'For baskets strictly bellow 30€, we charge 7€ delivery fees',
              ok: true,
              tags: [],
              tests: [
                {
                  projectName: 'chromium',
                  results: [
                    {
                      status: 'passed',
                      duration: 3311,
                    },
                  ],
                },
              ],
              id: 'b53c27d10696e7c81cbc-6dc31858a4ec7430a672',
              file: 'checkout/delivery-fees.spec.ts',
              line: 3,
              column: 5,
            },
          ],
        },
      ],
    };

    const got = convertToFlatReport(input);

    expect(got[0]).toMatchObject({
      name: 'After login, the mini basket contains the items from my last session',
      path: 'basket-recovery.spec.ts',
    });
    expect(got[1]).toMatchObject({
      name: 'After logout, the mini basket is empty',
      path: 'basket-recovery.spec.ts',
    });
    expect(got[2]).toMatchObject({
      name: 'The login accepts valid credentials',
      path: 'login.spec.ts/Login',
    });
    expect(got[3]).toMatchObject({
      name: 'For baskets strictly bellow 30€, we charge 7€ delivery fees',
      path: 'checkout/delivery-fees.spec.ts',
    });
  });

  test('Several projects', () => {
    const input: PwReport = {
      suites: [
        {
          title: 'login.spec.ts',
          file: 'login.spec.ts',
          column: 0,
          line: 0,
          specs: [],
          suites: [
            {
              title: 'Login',
              file: 'login.spec.ts',
              line: 4,
              column: 6,
              specs: [
                {
                  title: 'The login accepts valid credentials',
                  ok: false,
                  tags: [],
                  tests: [
                    {
                      projectName: 'chromium',
                      results: [
                        {
                          status: 'passed',
                          duration: 5882,
                        },
                      ],
                    },
                  ],
                  id: '41d3fd2474a19feb00a1-e9b86894e28a801a07e0',
                  file: 'login.spec.ts',
                  line: 5,
                  column: 7,
                },
                {
                  title: 'The login accepts valid credentials',
                  ok: false,
                  tags: [],
                  tests: [
                    {
                      projectName: 'firefox',
                      results: [
                        {
                          status: 'passed',
                          duration: 6525,
                        },
                      ],
                    },
                  ],
                  id: '41d3fd2474a19feb00a1-f89065efdfe6ef02898d',
                  file: 'login.spec.ts',
                  line: 5,
                  column: 7,
                },
              ],
            },
          ],
        },
      ],
    };

    const got = convertToFlatReport(input);

    expect(got[0].path).toEqual('login.spec.ts/Login');
    expect(got[0].name).toEqual('The login accepts valid credentials');
    expect(got[0].project).toEqual('chromium');
    expect(got[1].path).toEqual('login.spec.ts/Login');
    expect(got[1].name).toEqual('The login accepts valid credentials');
    expect(got[1].project).toEqual('firefox');
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

  /*test('organize tests by folders', () => {
    const input: PwReport = {
      suites: [
        {
          title: 'basket-recovery.spec.ts',
          file: 'basket-recovery.spec.ts',
          column: 0,
          line: 0,
          specs: [],
        },
        {
          title: 'checkout/price/delivery-fees.spec.ts',
          file: 'checkout/price/delivery-fees.spec.ts',
          column: 0,
          line: 0,
          specs: [],
        },
        {
          title: 'checkout/billing-address.spec.ts',
          file: 'checkout/billing-address.spec.ts',
          column: 0,
          line: 0,
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
            name: 'Checkout',
            uuid: '0000',
            tests: [
              {
                name: 'Price',
                uuid: '0000',
                tests: [
                  {
                    name: 'Delivery fees',
                    uuid: '0000',
                    tests: [],
                  },
                ],
              },
              {
                name: 'Billing address',
                uuid: '0000',
                tests: [],
              },
            ],
          },
        ],
      },
    });
  });*/
});
