import { z } from "zod";

export const INSTRUMENTS = [
    "エレキギター",
    "アコースティックギター",
    "エレキベース",
    "アコースティックベース",
    "ウクレレ",
];

export const createTablatureSchema = z.object({
    artistId: z.string("アーティストが選択されていません"),
    instrument: z.enum(INSTRUMENTS, "楽器が選択されていません"),
    strings: z.preprocess((v) => Number(v), z.number("弦数が選択されていません").min(4).max(7)), // formdataで送られてくる値はstringなのでnumberに変換する
    title: z.string("楽曲名が入力されていません"),
    url: z.url("URLの形式が不正です"),
    owner: z.string().optional().nullable(),
});
