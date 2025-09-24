import type { Artist } from "./artist";
import { cmsClient } from "./cms-client";

export type Instrument = "エレキギター" | "アコースティックギター" | "エレキベース";

export type Tablature = {
    id: string;
    title: string;
    instrument: Instrument;
    url: string;
    strings: number;
    owner: string;
};

export async function findTablatures(artistId: string) {
    return (
        await cmsClient.getAllContents<Tablature>({
            endpoint: "tablatures",
            queries: {
                fields: "id,title,instrument,url,strings,owner",
                filters: `artist[equals]${artistId}`,
            },
        })
    ).map((tablature) => ({
        ...tablature,
        instrument: tablature.instrument[0] as Instrument,
    }));
}

export async function findLatestTablatures() {
    return (
        await cmsClient.getList<Tablature & { artist: Artist }>({
            endpoint: "tablatures",
            queries: {
                fields: "id,title,instrument,artist.id,artist.name,url,strings,owner",
                orders: "-publishedAt",
                limit: 10,
            },
        })
    ).contents.map((content) => ({
        ...content,
        title: `${content.title} - ${content.artist.name}`,
        instrument: content.instrument[0] as Instrument,
    }));
}
