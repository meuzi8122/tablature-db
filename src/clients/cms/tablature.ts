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
    owner: string | null | undefined;
    createdAt: string;
};

export class TablatureClient {
    private static endpoint = "tablatures";

    static async findTablatures(artistId: string) {
        "use cache";
        return (
            await cmsClient.getAllContents<Tablature>({
                endpoint: this.endpoint,
                queries: {
                    fields: "id,title,instrument,url,strings,owner,createdAt",
                    filters: `artist[equals]${artistId}`,
                },
            })
        ).map((tablature) => ({
            ...tablature,
            createdAt: new Date(tablature.createdAt).toLocaleDateString(),
            instrument: tablature.instrument[0] as Instrument,
        }));
    }

    static async findLatestTablatures() {
        "use cache";
        return (
            await cmsClient.getList<Tablature & { artist: Artist }>({
                endpoint: "tablatures",
                queries: {
                    fields: "id,title,instrument,artist.id,artist.name,url,strings,owner,createdAt",
                    orders: "-publishedAt",
                    limit: 10,
                },
            })
        ).contents.map((content) => ({
            ...content,
            title: `${content.title} - ${content.artist.name}`,
            createdAt: new Date(content.createdAt).toLocaleDateString(),
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
                owner: tablature.owner ?? "",
            },
        });
    }
}
