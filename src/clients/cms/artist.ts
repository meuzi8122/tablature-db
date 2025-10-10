import { cmsClient } from "./cms-client";

export type Artist = {
    id: string;
    name: string;
};

export class ArtistClient {
    static async findArtists() {
        "use cache";
        return await cmsClient.getAllContents<Artist>({
            endpoint: "artists",
            queries: {
                fields: "id,name",
                orders: "name",
            },
        });
    }

    static async createArtist(name: string) {
        const artists = await this.findArtists();
        const artist = artists.find((artist) => artist.name === name);
        if (artist) {
            return artist;
        }

        return await cmsClient.create({
            endpoint: "artists",
            content: {
                name,
            },
        });
    }
}
