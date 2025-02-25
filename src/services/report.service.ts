import { Report, Status, Test, Suite, Execution, Statistics } from "@/types/report";
import playwrightReport from "../../test-results-3-projects.json"
import { PwReport, PwSpec, PwSuite } from "@/types/playwright-report";
import { v4 as uuidv4 } from 'uuid';

export function getFromReportFile(): Report {
    const source: PwReport = playwrightReport

    const suite = convertSuiteArray(source.suites)
    const report: Report = {
        tests: {
            uuid: uuidv4(),
            name: '',
            tests: suite
        }
    }
    report.tests.stats = calculateSuiteStatistics(report.tests)
    return report
}


function calculateSuiteStatistics(suite: Suite | Test) {

    if ('executions' in suite) {
        return calculateTestStatistics(suite)
    }

    if ('tests' in suite) {
        (suite.tests || []).forEach(
            each => {
                each.stats = calculateSuiteStatistics(each)
            }
        )
        const result = new Statistics();
        (suite.tests || []).forEach(each => {
            if (each.stats) {
                result.passedCount += each.stats.passedCount
                result.failedCount += each.stats.failedCount
                result.skippedCount += each.stats.skippedCount
            }
        })
        return result
    }
}


function calculateTestStatistics(test: Test) {
    const result = new Statistics()
    test.executions.forEach(each => {
        if (each.status == Status.success) result.passedCount++
        if (each.status == Status.failed) result.failedCount++
        if (each.status == Status.skipped) result.skippedCount++
    })
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
        uuid: uuidv4(),
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
            const error = spec.tests[0]?.results[0]?.error
            return {
                name: spec.tests[0].projectName,
                status: spec.ok ? Status.success : Status.failed,
                error
            }
        })
        target.push({
            name: group[0].title,
            uuid: uuidv4(),
            executions: executions,
            stats: new Statistics()
        })
    })
    
    return target
}

export function getDummyReport(): Suite {
    return {
        name: "",
        uuid: uuidv4(),
        tests: [
            {
                name: "Test 1",
                uuid: uuidv4(),
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
                uuid: uuidv4(),
                tests: [
                    {
                        name: "Test 2-1",
                        uuid: uuidv4(),
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
                        uuid: uuidv4(),
                        tests: [
                            {
                                name: "Test 2-2-1",
                                uuid: uuidv4(),
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
                                uuid: uuidv4(),
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
                                uuid: uuidv4(),
                                tests: [
                                    {
                                        name: "Test 2-2-3-1",
                                        uuid: uuidv4(),
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
                                        uuid: uuidv4(),
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
                                        uuid: uuidv4(),
                                        tests: [
                                            {
                                                name: "Test 2-2-3-3-1",
                                                uuid: uuidv4(),
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
                                                uuid: uuidv4(),
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
                                                uuid: uuidv4(),
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
                        uuid: uuidv4(),
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
                uuid: uuidv4(),
                tests: [
                    {
                        name: "Test 3-1",
                        uuid: uuidv4(),
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
                        uuid: uuidv4(),
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
                uuid: uuidv4(),
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
