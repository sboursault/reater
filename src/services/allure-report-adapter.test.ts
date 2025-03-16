import { beforeEach, describe, expect, test, vi } from 'vitest';
import { convertReport } from './allure-report-adapter.js';

vi.mock('./uuid-factory', () => {
  return {
    newUuid: vi.fn().mockImplementation(() => '0000'),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

const source = {
  "uuid": "2b2d064a-6ca9-4a3b-87d3-3bbb5bdd27f0",
  "name": "For baskets strictly bellow 30€, we charge 7€ delivery fees",
  "historyId": "8db4dee4555e1083658fb77258fc9114:b444eb0fbe6390c71e68b51dd25701fc",
  "status": "passed",
  "statusDetails": {},
  "stage": "finished",
  "steps": [
      {
          "status": "passed",
          "statusDetails": {},
          "stage": "finished",
          "steps": [
              {
                  "status": "passed",
                  "statusDetails": {},
                  "stage": "finished",
                  "steps": [
                      {
                          "status": "passed",
                          "statusDetails": {},
                          "stage": "finished",
                          "steps": [],
                          "attachments": [],
                          "parameters": [],
                          "start": 1740906241975,
                          "name": "browserType.launch",
                          "stop": 1740906243758
                      }
                  ],
                  "attachments": [],
                  "parameters": [],
                  "start": 1740906241972,
                  "name": "fixture: browser",
                  "stop": 1740906243758
              },
              {
                  "status": "passed",
                  "statusDetails": {},
                  "stage": "finished",
                  "steps": [
                      {
                          "status": "passed",
                          "statusDetails": {},
                          "stage": "finished",
                          "steps": [],
                          "attachments": [],
                          "parameters": [],
                          "start": 1740906243768,
                          "name": "browser.newContext",
                          "stop": 1740906243822
                      }
                  ],
                  "attachments": [],
                  "parameters": [],
                  "start": 1740906243760,
                  "name": "fixture: context",
                  "stop": 1740906243827
              },
              {
                  "status": "passed",
                  "statusDetails": {},
                  "stage": "finished",
                  "steps": [
                      {
                          "status": "passed",
                          "statusDetails": {},
                          "stage": "finished",
                          "steps": [],
                          "attachments": [],
                          "parameters": [],
                          "start": 1740906243831,
                          "name": "browserContext.newPage",
                          "stop": 1740906245193
                      }
                  ],
                  "attachments": [],
                  "parameters": [],
                  "start": 1740906243828,
                  "name": "fixture: page",
                  "stop": 1740906245194
              },
              {
                  "status": "passed",
                  "statusDetails": {},
                  "stage": "finished",
                  "steps": [],
                  "attachments": [],
                  "parameters": [],
                  "start": 1740906245197,
                  "name": "fixture: catalogPage",
                  "stop": 1740906245198
              },
              {
                  "status": "passed",
                  "statusDetails": {},
                  "stage": "finished",
                  "steps": [],
                  "attachments": [],
                  "parameters": [],
                  "start": 1740906245199,
                  "name": "fixture: basketPage",
                  "stop": 1740906245201
              }
          ],
          "attachments": [],
          "parameters": [],
          "start": 1740906241962,
          "name": "Before Hooks",
          "stop": 1740906245201
      },
      {
          "status": "passed",
          "statusDetails": {},
          "stage": "finished",
          "steps": [],
          "attachments": [],
          "parameters": [],
          "start": 1740906245205,
          "name": "page.goto(/)",
          "stop": 1740906246542
      },
      {
          "status": "passed",
          "statusDetails": {},
          "stage": "finished",
          "steps": [],
          "attachments": [],
          "parameters": [],
          "start": 1740906246548,
          "name": "locator.getByTestId('product-pod-add-button-208').click",
          "stop": 1740906247330
      },
      {
          "status": "passed",
          "statusDetails": {},
          "stage": "finished",
          "steps": [],
          "attachments": [],
          "parameters": [],
          "start": 1740906247333,
          "name": "page.goto(/basket)",
          "stop": 1740906247646
      },
      {
          "status": "passed",
          "statusDetails": {},
          "stage": "finished",
          "steps": [],
          "attachments": [],
          "parameters": [],
          "start": 1740906247650,
          "name": "expect.toContainText",
          "stop": 1740906247724
      },
      {
          "status": "passed",
          "statusDetails": {},
          "stage": "finished",
          "steps": [
              {
                  "status": "passed",
                  "statusDetails": {},
                  "stage": "finished",
                  "steps": [],
                  "attachments": [],
                  "parameters": [],
                  "start": 1740906247725,
                  "name": "fixture: basketPage",
                  "stop": 1740906247726
              },
              {
                  "status": "passed",
                  "statusDetails": {},
                  "stage": "finished",
                  "steps": [],
                  "attachments": [],
                  "parameters": [],
                  "start": 1740906247726,
                  "name": "fixture: catalogPage",
                  "stop": 1740906247727
              },
              {
                  "status": "passed",
                  "statusDetails": {},
                  "stage": "finished",
                  "steps": [],
                  "attachments": [],
                  "parameters": [],
                  "start": 1740906247727,
                  "name": "fixture: page",
                  "stop": 1740906247727
              },
              {
                  "status": "passed",
                  "statusDetails": {},
                  "stage": "finished",
                  "steps": [],
                  "attachments": [],
                  "parameters": [],
                  "start": 1740906247727,
                  "name": "fixture: context",
                  "stop": 1740906247728
              }
          ],
          "attachments": [],
          "parameters": [],
          "start": 1740906247724,
          "name": "After Hooks",
          "stop": 1740906247764
      }
  ],
  "attachments": [],
  "parameters": [
      {
          "name": "Project",
          "value": "firefox"
      }
  ],
  "labels": [
      {
          "name": "language",
          "value": "javascript"
      },
      {
          "name": "framework",
          "value": "playwright"
      },
      {
          "name": "package",
          "value": "checkout.delivery-fees.spec.ts"
      },
      {
          "name": "titlePath",
          "value": " > firefox > checkout/delivery-fees.spec.ts"
      },
      {
          "name": "host",
          "value": "seb-HP-ENVY-Notebook"
      },
      {
          "name": "thread",
          "value": "pid-97759-worker-0"
      },
      {
          "name": "parentSuite",
          "value": "firefox"
      },
      {
          "name": "suite",
          "value": "checkout/delivery-fees.spec.ts"
      }
  ],
  "links": [],
  "start": 1740906241960,
  "testCaseId": "8db4dee4555e1083658fb77258fc9114",
  "fullName": "checkout/delivery-fees.spec.ts:3:5",
  "stop": 1740906245959
}

describe('convertReport', () => {
  test('basic case', () => {

    expect(convertReport(source)).toEqual({
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
