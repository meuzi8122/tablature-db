import { createTablatureSchema } from "@/schemas/tablature";
import { z } from "zod";
import type { Artist } from "./artist";
import { cmsClient } from "./cms-client";

export type Instrument =
    | "エレキギター"
    | "アコースティックギター"
    | "エレキベース"
    | "アコースティックベース"
    | "ウクレレ";

export type Tablature = {
    id: string;
    title: string;
    instrument: Instrument;
    url: string;
    strings: number;
    artist: Artist;
};

export class TablatureClient {
    private static endpoint = "tablatures";

    static async findTablatures(artistId: string) {
        return (
            await cmsClient.getAllContents<Tablature>({
                endpoint: this.endpoint,
                queries: {
                    fields: "id,title,instrument,,artist.id,artist.name,url,strings",
                    filters: `artist[equals]${artistId}`,
                },
            })
        ).map((tablature) => ({
            ...tablature,
            instrument: tablature.instrument[0] as Instrument,
        }));
    }

    static async findLatestTablatures() {
        return (
            await cmsClient.getList<Tablature>({
                endpoint: this.endpoint,
                queries: {
                    fields: "id,title,instrument,artist.id,artist.name,url,strings",
                    orders: "-publishedAt",
                    limit: 10,
                },
            })
        ).contents.map((content) => ({
            ...content,
            instrument: content.instrument[0] as Instrument,
        }));
    }

    static async findTablaturesById(ids: string[]) {
        return (
            await cmsClient.getList<Tablature>({
                endpoint: this.endpoint,
                queries: {
                    fields: "id,title,instrument,artist.id,artist.name,url,strings",
                    orders: "-publishedAt",
                    filters: ids.map((id) => `id[equals]${id}`).join("[or]"),
                    limit: 10,
                },
            })
        ).contents.map((content) => ({
            ...content,
            instrument: content.instrument[0] as Instrument,
        }));
    }

    static async createTablature(tablature: z.infer<typeof createTablatureSchema>) {
        await cmsClient.create({
            endpoint: this.endpoint,
            content: {
                title: tablature.title,
                url: tablature.url,
                artist: tablature.artistId,
                instrument: [tablature.instrument],
                strings: tablature.strings,
            },
        });
    }
}
