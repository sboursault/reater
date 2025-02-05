import { Report } from "@/types/test-group";

export default function getReport(): Report {
    return {
        tests: [
            {
                name: "Test 1",
                steps: [
                    "Step 1",
                    "Step 2",
                    "Step 3",
                ]
            },
            {
                name: "Test 2",
                tests: [
                    {
                        name: "Test 2-1",
                        steps: [
                            "Step 1",
                            "Step 2",
                            "Step 3",
                        ]
                    },
                    {
                        name: "Test 2-2",
                        tests: [
                            {
                                name: "Test 2-2-1",
                                steps: [
                                    "Step 1",
                                    "Step 2",
                                    "Step 3",
                                ]
                            },
                            {
                                name: "Test 2-2-2",
                                steps: [
                                    "Step 1",
                                    "Step 2",
                                    "Step 3",
                                ]
                            },
                            {
                                name: "Test 2-2-3",
                                tests: [
                                    {
                                        name: "Test 2-2-3-1",
                                        steps: [
                                            "Step 1",
                                            "Step 2",
                                            "Step 3",
                                        ]
                                    },
                                    {
                                        name: "Test 2-2-3-2",
                                        steps: [
                                            "Step 1",
                                            "Step 2",
                                            "Step 3",
                                        ]
                                    },
                                    {
                                        name: "Test 2-2-3-3",
                                        tests: [
                                            {
                                                name: "Test 2-2-3-3-1",
                                                steps: [
                                                    "Step 1",
                                                    "Step 2",
                                                    "Step 3",
                                                ]
                                            },
                                            {
                                                name: "Test 2-2-3-3-2",
                                                steps: [
                                                    "Step 1",
                                                    "Step 2",
                                                    "Step 3",
                                                ]
                                            },
                                            {
                                                name: "Test 2-2-3-3-3",
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
                        steps: [
                            "Step 1",
                            "Step 2",
                            "Step 3",
                        ]
                    },
                ]
            },
            {
                name: "Test 3",
                tests: [
                    {
                        name: "Test 3-1",
                        steps: [
                            "Step 1",
                            "Step 2",
                            "Step 3",
                        ]
                    },
                    {
                        name: "Test 3-3",
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
                steps: [
                    "Step 1",
                    "Step 2",
                    "Step 3",
                ]
            }
        ]
    }
}