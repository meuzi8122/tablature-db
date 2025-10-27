import { z } from "zod";

export const INSTRUMENTS = [
    "エレキギター",
    "アコースティックギター",
    "エレキベース（4弦）",
    "エレキベース（5弦）",
];

const instrumentSchema = z.enum(INSTRUMENTS, "楽器が選択されていません");

export type Instrument = z.infer<typeof instrumentSchema>;

export const CONTENT_TYPES = ["URL", "FILE"];

const contentTypeSchema = z.enum(CONTENT_TYPES);

export type ContentType = z.infer<typeof contentTypeSchema>;

export const createTablatureSchema = z
    .object({
        instrument: instrumentSchema,
        artistName: z.string("アーティスト名が入力されていません"),
        title: z.string("楽曲名が入力されていません").min(1, "楽曲名が入力されていません"),
        type: contentTypeSchema,
        url: z.url().optional(),
        file: z.custom<File>().optional(),
    })
    .refine(
        (data) => {
            if (data.type === "URL") {
                return typeof data.url === "string" && data.url.length > 0;
            }
            return true;
        },
        { message: "URLの形式が不正です" },
    )
    .refine(
        (data) => {
            if (data.type === "FILE") {
                return data.file instanceof File;
            }
            return true;
        },
        { message: "ファイルが選択されていません" },
    );
