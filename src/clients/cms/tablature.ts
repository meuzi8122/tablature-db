import { cmsClient } from "./cms-client";

type Tablature = {
    id: string;
    title: string;
    instrument: string;
    url: string;
    strings: number;
};

export async function findTablatures(artistId: string) {
    return await cmsClient.getAllContents<Tablature>({
        endpoint: "tablatures",
        queries: {
            fields: "id,title,instrument,url,strings",
            filters: `artist[equals]${artistId}`,
        },
    });
}
