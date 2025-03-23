import { newUuid } from "@/services/uuid-factory"

export interface Report {
  tests: Suite;
}

export interface Suite {
  uuid: string;
  name: string;
  subSuites: Suite[];
  tests: Test[];
  stats?: Statistics;
}

export class Test {
  uuid: string;
  name: string;
  path: string;
  steps?: string[]; // not the right place
  executions: Execution[];
  stats: Statistics;

  constructor(name: string, path: string) {
    this.uuid = newUuid();
    this.name = name;
    this.path = path;
    this.executions = [];
    this.stats = new Statistics();
  }

  addExecution(execution: Execution) {
    this.executions.push(execution);
    if (execution.status == Status.success) this.stats.passedCount++;
    if (execution.status == Status.failed) this.stats.failedCount++;
    if (execution.status == Status.skipped) this.stats.skippedCount++;
  }
}

export interface Execution {
  name: string;
  status: Status;
  error?: Error;
}

export enum Status {
  success,
  failed,
  skipped,
}

export interface Error {
  message: string;
  stack: string;
}

export class Statistics {
  passedCount = 0;
  failedCount = 0;
  skippedCount = 0;
}
