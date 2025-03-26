export interface AllureReport {
  uuid: string;
  name: string;
  historyId: string;
  status: string;
  statusDetails: any;
  stage: string;
  steps: AllureStep[];
  attachments: any[];
  parameters: Parameter[];
  labels: Label[];
  links: any[];
  start: number;
  testCaseId: string;
  fullName: string;
  stop: number;
}

export interface AllureStep {
  status: string;
  statusDetails: any;
  stage: string;
  steps: AllureStep[];
  attachments: any[];
  parameters: any[];
  start: number;
  name: string;
  stop: number;
}

export interface Parameter {
  name: string;
  value: string;
}

export interface Label {
  name: string;
  value: string;
}
