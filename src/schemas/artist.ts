import { z } from "zod";

export const createArtistSchema = z.object({
    name: z.string("アーティスト名が入力されていません"),
});
