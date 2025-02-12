import { Report, Status, Test, Suite } from "@/types/report";
import playwrightReport from "../../test-results-3-projects.json"
import { PwReport, PwSpec, PwSuite } from "@/types/playwright-report";


export function getFromReportFile(): Report {
    const source: PwReport = playwrightReport

    return {
        tests: convertSuiteArray(source.suites)
    }
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
        tests: convertSuiteArray(source.suites || []).concat(convertSpecArray(source.specs))
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
    return source.map(each => {
        return {
            name: each.title,
            executions: []
        }
    })
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