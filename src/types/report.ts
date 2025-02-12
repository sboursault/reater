export type Report = {
    tests?: (TestGroup | TestDetail)[]
}


export type TestGroup = {
    name: string
    tests?: (TestGroup | TestDetail)[]
}

export type TestDetail = {
    name: string
    steps?: string[]
    executions: Execution[]
}

export type Execution = {
    name: string
    status: Status
}

export enum Status {
    success,
    failed,
    skipped,
}