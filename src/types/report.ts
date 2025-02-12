export interface Report {
    tests?: (Suite | Test)[]
}

export interface Suite {
    name: string
    tests?: (Suite | Test)[]
}

export interface Test {
    name: string
    steps?: string[]
    executions: Execution[]
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