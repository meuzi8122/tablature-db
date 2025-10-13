import { db } from "@/clients/internal-db/db";
import { useLiveQuery } from "dexie-react-hooks";

export const useBookmarks = () => {
    const bookmarks = useLiveQuery(async () => {
        return await db.table("bookmarks").toArray();
    });

    const addBookmark = async (id: string) => {
        await db.table("bookmarks").add({ id });
    };

    const deleteBookmark = async (id: string) => {
        await db.table("bookmarks").delete(id);
    };

    return { bookmarks, addBookmark, deleteBookmark };
};
