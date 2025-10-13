import Dexie from "dexie";

export const db = new Dexie("TablatureDB");
db.version(1).stores({
    bookmarks: "id",
});
