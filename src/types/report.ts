
export interface Report {
  tests: Suite
}

export interface Suite {
  uuid: string
  name: string
  subSuites: Suite[]
  tests: Test[]
  stats?: Statistics
}

export interface Test {
  uuid: string
  name: string
  path: string
  steps?: string[]
  executions: Execution[]
  stats?: Statistics
}

export interface Execution {
  name: string
  status: Status
  error?: Error
}

export enum Status {
  success,
  failed,
  skipped,
}

export interface Error {
  message: string
  stack: string
}

export class Statistics {
  passedCount = 0
  failedCount = 0
  skippedCount = 0
}