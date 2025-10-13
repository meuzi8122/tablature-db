import { db } from "@/clients/internal-db/db";
import { useLiveQuery } from "dexie-react-hooks";

export const useBookmarks = () => {
    const TABLE_NAME = "bookmarks";

    const bookmarks = useLiveQuery(async () => {
        return await db.table(TABLE_NAME).toArray();
    });

    const addBookmark = async (id: string) => {
        await db.table(TABLE_NAME).add({ id });
    };

    const deleteBookmark = async (id: string) => {
        await db.table(TABLE_NAME).delete(id);
    };

    return { bookmarks, addBookmark, deleteBookmark };
};
