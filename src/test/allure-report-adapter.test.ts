import { beforeEach, describe, expect, test, vi } from 'vitest';
import { convertReportFromFiles } from '../services/allure-report-adapter';
import { Status } from '@/types/report';

vi.mock('../services/uuid-factory', () => {
  return {
    newUuid: vi.fn().mockImplementation(() => '0000'),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('convertReportFromFiles', () => {
  test('test in a sub folder', () => {
    const got = convertReportFromFiles([
      'src/test/samples/allure/checkout--delivery-fees--baskets-bellow-30.json',
    ]);

    expect(got).toEqual([
      {
        name: 'For baskets strictly bellow 30€, we charge 7€ delivery fees',
        uuid: '0000',
        path: 'checkout/delivery-fees.spec.ts',
        testFile: 'checkout/delivery-fees.spec.ts',
        project: 'chromium',
        steps: [],
        status: Status.success,
      },
    ]);
  });

  test('test in a "describe"', () => {
    const got = convertReportFromFiles([
      'src/test/samples/allure/mini-basket--toggle--product-count.json',
    ]);

    expect(got).toEqual([
      {
        name: 'The mini-basket always shows the number of products in basket',
        uuid: '0000',
        path: 'mini-basket.spec.ts/Mini-basket/Toggle',
        testFile: 'mini-basket.spec.ts',
        project: 'chromium',
        steps: [],
        status: Status.success,
      },
    ]);
  });
});
