import { newUuid } from '@/services/uuid-factory';
import { FlatReport } from './flat-report'
import { capitalizeFirstLetter, suiteNameFromFileName } from '@/services/report-utils'

export interface Report {
  tests: Suite;
}

export class Suite {
  uuid: string;
  name: string;
  testFile: string;
  subSuites: Suite[] = [];
  tests: Test[] = [];
  stats: Statistics;

  constructor(name: string, testFile: string) {
    this.uuid = newUuid()
    this.name = name;
    this.testFile = testFile;
    this.stats = new Statistics();
  }

  addFlatReport(report: FlatReport) {
    let parentNode:Suite = this;
    let testFile: string = ''
    for (let pathPart of report.path.split('/')) {
      if (pathPart.endsWith('.ts') || pathPart.endsWith('.js')) {
        pathPart = suiteNameFromFileName(pathPart);
        testFile = report.testFile
      }
      else pathPart = capitalizeFirstLetter(pathPart);

      let suiteNode = parentNode.subSuites.find((node) => node.name === pathPart);
      if (suiteNode === undefined) {
        suiteNode = new Suite(pathPart, testFile);
        parentNode.subSuites.push(suiteNode);
      }
      suiteNode.addExecutionStats(report)
      parentNode = suiteNode;
    }

    let testNode = parentNode.tests.find((node) => node.name === report.name);
    if (testNode === undefined) {
      testNode = new Test(report.name, report.path + '/' + report.name);
      parentNode.tests.push(testNode);
    }
    testNode.addExecution({
      name: report.project,
      status : report.status,
      error : report.error
    });
  }
  addExecutionStats(execution: Execution) {
    if (execution.status == Status.success) this.stats.passedCount++;
    if (execution.status == Status.failed) this.stats.failedCount++;
    if (execution.status == Status.skipped) this.stats.skippedCount++;
  }
}

export class Test {
  uuid: string;
  name: string;
  path: string;
  steps?: string[]; // not the right place
  executions: Execution[] = [];
  stats: Statistics;

  constructor(name: string, path: string) {
    this.uuid = newUuid();
    this.name = name;
    this.path = path;
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
