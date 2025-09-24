import type { TablatureSearchFilter } from "@/domains/tablature";
import { cmsClient } from "./cms-client";

export async function findTablatures(tablature: TablatureSearchFilter) {
    const filters = Object.entries(tablature)
        .filter(([_, value]) => Boolean(value))
        .map(([key, value]) => {
            if (key === "instrument") {
                return `${key}[equals]${value}`;
            }

            return `${key}[contains]${value}`;
        })
        .join("[and]");

    return (
        await cmsClient.getList({
            endpoint: "tablatures",
            queries: {
                fields: "id,title,artist,instrument,link",
                // filters,
            },
        })
    ).contents;
}
