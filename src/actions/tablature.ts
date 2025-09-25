"use server";

import { TablatureClient } from "@/clients/cms/tablature";
import { COMMON_ERROR_MESSAGE } from "@/contants/tablature";
import { createTablatureSchema } from "@/schemas/tablature";

export async function createTablature(formData: FormData) {
    const submission = createTablatureSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!submission.success) {
        return { success: false, message: submission.error.issues[0].message };
    }

    try {
        await TablatureClient.createTablature(submission.data);
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: COMMON_ERROR_MESSAGE,
        };
    }

    return { success: true, message: "TAB譜を投稿しました" };
}
