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
                ]
            },
            {
                name: "child 3",
            }
        ]
    }
}