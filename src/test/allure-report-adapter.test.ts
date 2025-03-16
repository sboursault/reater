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

describe('convertReport', () => {
  test('basic case', () => {

    expect(convertReportFromFiles(['src/test/samples/checkout--delivery-fees--baskets-bellow-30.json'])).toEqual({
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
                    executions: []
                  }
                ],
              }
            ],
          },
        ],
      },
    });
  });

});
