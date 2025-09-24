import { cmsClient } from "./cms-client";

export type Instrument = "エレキギター" | "アコースティックギター" | "エレキベース";

export type Tablature = {
    id: string;
    title: string;
    instrument: Instrument;
    url: string;
    strings: number;
};

export async function findTablatures(artistId: string) {
    return (
        await cmsClient.getAllContents<Tablature>({
            endpoint: "tablatures",
            queries: {
                fields: "id,title,instrument,url,strings",
                filters: `artist[equals]${artistId}`,
            },
        })
    ).map((tablature) => ({
        ...tablature,
        instrument: tablature.instrument[0] as Instrument,
    }));
}
