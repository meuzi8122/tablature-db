import { db } from "@/internal-db";
import { useLiveQuery } from "dexie-react-hooks";

export const useBookmarks = () => {
    const TABLE_NAME = "bookmarks";

    const bookmarks = useLiveQuery(async () => {
        return await db.table(TABLE_NAME).toArray();
    });

    const addBookmark = async (id: string) => {
        await db.table(TABLE_NAME).add({ id });
        alert("ブックマークを追加しました");
    };

    const deleteBookmark = async (id: string) => {
        await db.table(TABLE_NAME).delete(id);
        alert("ブックマークを削除しました");
    };

    return { bookmarks, addBookmark, deleteBookmark };
};
