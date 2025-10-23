import { z } from "zod";

export const INSTRUMENTS = [
    "エレキギター",
    "アコースティックギター",
    "エレキベース（4弦）",
    "エレキベース（5弦）",
];

const instrumentSchema = z.enum(INSTRUMENTS, "楽器が選択されていません");

export type Instrument = z.infer<typeof instrumentSchema>;

export const createTablatureSchema = z.object({
    artistId: z.string("アーティストが選択されていません"),
    instrument: instrumentSchema,
    title: z.string("楽曲名が入力されていません"),
    url: z.url("URLの形式が不正です"),
});
