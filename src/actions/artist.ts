"use server";

import { ArtistClient } from "@/clients/cms/artist";
import { createArtistSchema } from "@/schemas/artist";

export async function createArtist(formData: FormData) {
    const submission = createArtistSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!submission.success) {
        return {
            success: false,
            artistId: undefined,
        };
    }

    try {
        const artist = await ArtistClient.createArtist(submission.data.name);
        // 既にアーティストが存在する場合はそのIDを返す
        return { success: true, artistId: artist.id };
    } catch (error) {
        return {
            success: false,
            artistId: undefined,
        };
    }
}
