import { Report, Status, Test, Suite, Execution, Statistics } from "@/types/report";
import playwrightReport from "../../test-results-3-projects.json"
import { PwReport, PwSpec, PwSuite } from "@/types/playwright-report";


export function getFromReportFile(): Report {
    const source: PwReport = playwrightReport

    const suite = convertSuiteArray(source.suites)
    suite.forEach(
        each => {
            calculateStatistics(each)
        }
    )
    return {
        tests: suite
    }
}


function calculateStatistics(suite: Suite | Test) {

    if ('executions' in suite) {
        suite.stats = calculateExecutionStatistics(suite.executions)
    }

    if ('tests' in suite) {
        (suite.tests || []).forEach(
            each => {
                calculateStatistics(each)
            }
        )
    }
}


function calculateExecutionStatistics(executions: Execution[]) {
    let passedCount = 0;
    let failedCount = 0;
    let skippedCount = 0;
    executions.forEach(each => {
        if (each.status == Status.success) passedCount++
        if (each.status == Status.failed) failedCount++
        if (each.status == Status.skipped) skippedCount++
    })
    const result = new Statistics()
    result.passedCount = passedCount
    result.failedCount = failedCount
    result.skippedCount = skippedCount
    return result
}


function convertSuiteArray(source: PwSuite[]): (Suite | Test)[] {
    return source.map(suite => {
        return convertPwSuite(suite)
    })
}

function convertPwSuite(source: PwSuite): Suite {

    if (source.title == source.file
        && source.suites?.length == 1)
        source = source.suites[0]

    return {
        name: buildGroupName(source),
        tests: convertSuiteArray(source.suites || []).concat(convertSpecArray(source.specs)),
    }
}

function buildGroupName(source: PwSuite) {
    return source.title == source.file ?
        capitalizeFirstLetter(source.title.replace('.ts', '').replace('.spec', '').replace('-', ' ')) : source.title
}

function capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function convertSpecArray(source: PwSpec[]): Test[] {

    const groupByFileAndLine = new Map<string, PwSpec[]>();
    const target: Test[] = []

    source.forEach(each => {
        const key: string = each.file + ':' + each.line
        if (!groupByFileAndLine.has(key))
            groupByFileAndLine.set(key, [])
        groupByFileAndLine.get(key)?.push(each)
    })

    groupByFileAndLine.forEach((group) => {
        const executions: Execution[] = group.map(spec => {
            return {
                name: spec.tests[0].projectName,
                status: spec.ok ? Status.success : Status.failed
            }
        })
        target.push({
            name: group[0].title,
            executions: executions,
            stats: new Statistics()
        })
    })
    return target
}

export function getDummyReport(): Report {
    return {
        tests: [
            {
                name: "Test 1",
                executions: [
                    {
                        name: "chromium",
                        status: Status.success
                    },
                    {
                        name: "firefox",
                        status: Status.failed
                    }
                ],
                steps: [
                    "Step 1",
                    "Step 2",
                    "Step 3",
                ]
            },
            {
                name: "Group 2",
                tests: [
                    {
                        name: "Test 2-1",
                        executions: [
                            {
                                name: "chromium",
                                status: Status.success
                            }
                        ],
                        steps: [
                            "Step 1",
                            "Step 2",
                            "Step 3",
                        ]
                    },
                    {
                        name: "Group 2-2",
                        tests: [
                            {
                                name: "Test 2-2-1",
                                executions: [
                                    {
                                        name: "chromium",
                                        status: Status.failed
                                    }
                                ],
                                steps: [
                                    "Step 1",
                                    "Step 2",
                                    "Step 3",
                                ]
                            },
                            {
                                name: "Test 2-2-2",
                                executions: [
                                    {
                                        name: "chromium",
                                        status: Status.skipped
                                    }
                                ],
                                steps: [
                                    "Step 1",
                                    "Step 2",
                                    "Step 3",
                                ]
                            },
                            {
                                name: "Group 2-2-3",
                                tests: [
                                    {
                                        name: "Test 2-2-3-1",
                                        executions: [
                                            {
                                                name: "chromium",
                                                status: Status.success
                                            }
                                        ],
                                        steps: [
                                            "Step 1",
                                            "Step 2",
                                            "Step 3",
                                        ]
                                    },
                                    {
                                        name: "Test 2-2-3-2",
                                        executions: [
                                            {
                                                name: "chromium",
                                                status: Status.success
                                            }
                                        ],
                                        steps: [
                                            "Step 1",
                                            "Step 2",
                                            "Step 3",
                                        ]
                                    },
                                    {
                                        name: "Group 2-2-3-3",
                                        tests: [
                                            {
                                                name: "Test 2-2-3-3-1",
                                                executions: [
                                                    {
                                                        name: "chromium",
                                                        status: Status.success
                                                    }
                                                ],
                                                steps: [
                                                    "Step 1",
                                                    "Step 2",
                                                    "Step 3",
                                                ]
                                            },
                                            {
                                                name: "Test 2-2-3-3-2",
                                                executions: [
                                                    {
                                                        name: "chromium",
                                                        status: Status.failed
                                                    }
                                                ],
                                                steps: [
                                                    "Step 1",
                                                    "Step 2",
                                                    "Step 3",
                                                ]
                                            },
                                            {
                                                name: "Test 2-2-3-3-3",
                                                executions: [
                                                    {
                                                        name: "chromium",
                                                        status: Status.success
                                                    }
                                                ],
                                                steps: [
                                                    "Step 1",
                                                    "Step 2",
                                                    "Step 3",
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        name: "Test 2-3",
                        executions: [
                            {
                                name: "chromium",
                                status: Status.success
                            }
                        ],
                        steps: [
                            "Step 1",
                            "Step 2",
                            "Step 3",
                        ]
                    },
                ]
            },
            {
                name: "Group 3",
                tests: [
                    {
                        name: "Test 3-1",
                        executions: [
                            {
                                name: "chromium",
                                status: Status.success
                            }
                        ],
                        steps: [
                            "Step 1",
                            "Step 2",
                            "Step 3",
                        ]
                    },
                    {
                        name: "Test 3-3",
                        executions: [
                            {
                                name: "chromium",
                                status: Status.skipped
                            }
                        ],
                        steps: [
                            "Step 1",
                            "Step 2",
                            "Step 3",
                        ]
                    },
                ]
            },
            {
                name: "Test 4",
                executions: [
                    {
                        name: "chromium",
                        status: Status.success
                    }
                ],
                steps: [
                    "Step 1",
                    "Step 2",
                    "Step 3",
                ]
            }
        ]
    }
}
