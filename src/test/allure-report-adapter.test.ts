import { beforeEach, describe, expect, test, vi } from 'vitest';
import { convertReportFromFiles } from '../services/allure-report-adapter';

vi.mock('../services/uuid-factory', () => {
  return {
    newUuid: vi.fn().mockImplementation(() => '0000'),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('convertReportFromFiles', () => {
  test('organize tests by folders', () => {
    expect(
      convertReportFromFiles([
        'src/test/samples/allure/checkout--delivery-fees--baskets-bellow-30.json',
      ])
    ).toEqual({
      tests: {
        name: '',
        uuid: '0000',
        tests: [
          {
            name: 'Checkout',
            uuid: '0000',
            tests: [
              {
                name: 'Delivery fees',
                uuid: '0000',
                tests: [
                  {
                    name: 'For baskets strictly bellow 30€, we charge 7€ delivery fees',
                    uuid: '0000',
                    executions: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  });

/*  test('basic case', () => {
    expect(
      convertReportFromFiles(['src/test/samples/allure/mini-basket--toggle--product-count.json'])
    ).toEqual({
      tests: {
        name: '',
        uuid: '0000',
        tests: [
          {
            name: 'Mini-basket',
            uuid: '0000',
            tests: [
              {
                name: 'Toggle',
                uuid: '0000',
                tests: [
                  {
                    name: 'The mini-basket always shows the number of products in basket',
                    uuid: '0000',
                    executions: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  });*/
});
