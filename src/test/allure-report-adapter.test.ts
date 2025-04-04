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

    expect(got).toMatchObject([
      {
        name: 'For baskets strictly bellow 30€, we charge 7€ delivery fees',
        uuid: '0000',
        path: 'checkout/delivery-fees.spec.ts',
        testFile: 'checkout/delivery-fees.spec.ts',
        project: 'chromium',
        status: Status.passed,
      },
    ]);
  });

  test('test in a "describe"', () => {
    const got = convertReportFromFiles([
      'src/test/samples/allure/mini-basket--toggle--product-count.json',
    ]);

    expect(got).toMatchObject([
      {
        name: 'The mini-basket always shows the number of products in basket',
        uuid: '0000',
        path: 'mini-basket.spec.ts/Mini-basket/Toggle',
        testFile: 'mini-basket.spec.ts',
        project: 'chromium',
        status: Status.passed,
      },
    ]);
  });

  test('convert steps', () => {
    const got = convertReportFromFiles([
      'src/test/samples/allure/checkout--delivery-fees--baskets-bellow-30.json',
    ]);

    expect(got).toMatchObject([
      {
        name: 'For baskets strictly bellow 30€, we charge 7€ delivery fees',
        steps: [
          {
            name: 'Before Hooks',
          },
          {
            name: 'page.goto(/)',
          },
          {
            name: "locator.getByTestId('product-pod-add-button-208').click",
          },
          {
            name: 'page.goto(/basket)',
          },
          {
            name: 'expect.toContainText',
          },
          {
            name: 'After Hooks',
          },
        ],
        status: Status.passed,
      },
    ]);
  });
});
