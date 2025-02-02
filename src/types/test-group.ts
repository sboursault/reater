export interface Report {
    tests?: (TestGroup | TestDetail)[]
}


export interface TestGroup {
    name: string;
    tests?: (TestGroup | TestDetail)[]
}

export interface TestDetail {
    name: string;
    steps?: string[]
}