"use server";

import { TablatureClient } from "@/clients/cms/tablature";
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
            message: "TAB譜の投稿に失敗しました。しばらくしてから再度お試しください。",
        };
    }

    return { success: true, message: "TAB譜を投稿しました" };
}
