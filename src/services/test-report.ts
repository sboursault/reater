import TestGroup from "@/types/test-group";

export default function getReport(): TestGroup {
    return {
        name: "",
        subGroups: [
            {
                name: "child 1",
            },
            {
                name: "child 2",
                subGroups: [
                    {
                        name: "child 2-1",
                    },
                    {
                        name: "child 2-2",
                        subGroups: [
                            {
                                name: "child 2-2-1",
                            },
                            {
                                name: "child 2-2-2",
                            },
                            {
                                name: "child 2-2-3",
                            },
                        ]
                    },
                    {
                        name: "child 2-3",
                    },
                ]
            },
            {
                name: "child 3",
                subGroups: [
                    {
                        name: "child 3-1",
                    },
                    {
                        name: "child 3-3",
                    },
                ]
            },
            {
                name: "child 4",
            }
        ]
    }
}