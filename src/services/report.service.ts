import { Report, Status, TestDetail, TestGroup } from "@/types/report";
import playwrightReport from "../../test-results-3-projects.json"
import { PlaywrightReport, Suite } from "@/types/playwright-report";


export function getFromReportFile(): Report {
    const source: PlaywrightReport = playwrightReport

    return {
        tests: convertPwSuiteArray(source.suites)
    }
}

function convertPwSuiteArray(source: Suite[]): (TestGroup | TestDetail)[] {
    return source.map(suite => {
        return convertPwSuite(suite)
    })
}

function convertPwSuite(source: Suite): TestGroup {
    return {
        name: source.title,
        tests: convertPwSuiteArray(source.suites || [])
    }
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