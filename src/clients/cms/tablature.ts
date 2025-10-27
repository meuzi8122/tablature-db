import { ContentType, Instrument } from "@/schemas/tablature";
import type { Artist } from "./artist";
import { cmsClient } from "./cms-client";

export type Tablature = {
    id: string;
    title: string;
    instrument: Instrument;
    type: ContentType;
    // ファイルの場合はファイルのURLが入る
    url: string;
    artist: Artist;
};

export class TablatureClient {
    private static endpoint = "tablatures";

    static async findTablatures(artistId: string) {
        return (
            await cmsClient.getAllContents<Tablature>({
                endpoint: this.endpoint,
                queries: {
                    fields: "id,title,instrument,,artist.id,artist.name,url",
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
                    fields: "id,title,instrument,artist.id,artist.name,url",
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
                    fields: "id,title,instrument,artist.id,artist.name,url",
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

    static async createTablature(
        tablature: Omit<Tablature, "id" | "artist"> & { artistId: string },
    ) {
        await cmsClient.create({
            endpoint: this.endpoint,
            content: {
                title: tablature.title,
                url: tablature.url,
                artist: tablature.artistId,
                instrument: [tablature.instrument],
            },
        });
    }
}
