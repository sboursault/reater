import { beforeEach, describe, expect, test, vi } from 'vitest';
import { convertReport } from './pw-json-report-adapter.js';
import { PwReport } from '@/types/playwright-report.js';

vi.mock('./uuid-factory', () => {
  return {
    newUuid: vi.fn().mockImplementation(() => '0000'),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('convertReport', () => {
  test('basic case', () => {
    const input: PwReport = {
      suites: [
        {
          title: 'basket-recovery.spec.ts',
          file: 'basket-recovery.spec.ts',
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
        ],
      },
    });
  });

  test('flatten top level describe', () => {
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
  });

  test('organize tests by folders', () => {
        const input: PwReport = {
            suites: [
                {
                    "title": "basket-recovery.spec.ts",
                    "file": "basket-recovery.spec.ts",
                    "column": 0,
                    "line": 0,
                    "specs": [],
                },
                {
                    "title": "checkout/price/delivery-fees.spec.ts",
                    "file": "checkout/price/delivery-fees.spec.ts",
                    "column": 0,
                    "line": 0,
                    specs: []
                },
                {
                    "title": "checkout/billing-address.spec.ts",
                    "file": "checkout/billing-address.spec.ts",
                    "column": 0,
                    "line": 0,
                    specs: []
                }
            ]
        }
        expect(convertReport(input)).toEqual(
            {
                "tests": {
                    "name": "",
                    "uuid": "0000",
                    "tests": [
                        {
                            "name": "Basket recovery",
                            "uuid": "0000",
                            "tests": [],
                        },
                        {
                            "name": "Checkout",
                            "uuid": "0000",
                            "tests": [
                                {
                                    "name": "Price",
                                    "uuid": "0000",
                                    "tests": [
                                        {
                                            "name": "Delivery fees",
                                            "uuid": "0000",
                                            "tests": [],
                                        }
                                    ],
                                },
                                {
                                    "name": "Billing address",
                                    "uuid": "0000",
                                    "tests": [],
                                }
                            ],
                        }
                    ],
                },
            }
        )
    })
});
