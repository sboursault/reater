
export interface Report {
    tests: Suite
}

export interface Suite {
    uuid: string
    name: string
    tests?: (Suite | Test)[]
    stats?: Statistics
}

export interface Test {
    name: string
    steps?: string[]
    executions: Execution[]
    stats?: Statistics
}

export interface Execution {
    name: string
    status: Status
}

export enum Status {
    success,
    failed,
    skipped,
}

export class Statistics {
    passedCount =0
    failedCount = 0
    skippedCount = 0
}