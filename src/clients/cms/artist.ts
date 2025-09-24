import { cmsClient } from "./cms-client";

export type Artist = {
    id: string;
    name: string;
};

export async function findArtists() {
    return await cmsClient.getAllContents<Artist>({
        endpoint: "artists",
        queries: {
            fields: "id,name",
        },
    });
}
