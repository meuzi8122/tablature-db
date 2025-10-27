"use server";

import { ArtistClient } from "@/clients/cms/artist";
import { TablatureClient } from "@/clients/cms/tablature";
import { COMMON_ERROR_MESSAGE } from "@/constants/tablature";
import { createTablatureSchema } from "@/schemas/tablature";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";

type ActionStateType = {
    success: boolean;
    message: string;
};

export async function createTablature(_: ActionStateType, formData: FormData) {
    const submission = createTablatureSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!submission.success) {
        return { success: false, message: submission.error.issues[0].message };
    }

    if (submission.data.type === "FILE") {
        const file = submission.data.file as File;
        const extension = file.name.split(".").pop();

        try {
            const blob = await put(`${randomUUID()}.${extension}`, file, {
                access: "public",
            });
            submission.data.url = blob.downloadUrl;
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: COMMON_ERROR_MESSAGE,
            };
        }
    }

    if (!submission.data.url) {
        return { success: false, message: COMMON_ERROR_MESSAGE };
    }

    try {
        const artist = await ArtistClient.createArtist(submission.data.artistName);
        await TablatureClient.createTablature({
            title: submission.data.title,
            instrument: submission.data.instrument,
            type: submission.data.type,
            url: submission.data.url,
            artistId: artist.id,
        });
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: COMMON_ERROR_MESSAGE,
        };
    }

    return { success: true, message: "TAB譜を投稿しました" };
}
