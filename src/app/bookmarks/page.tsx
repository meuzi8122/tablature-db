import { ClientBookmarkedTablatureList } from "@/components/tablature/tablature-list/tablature-list.bookmark.client";

export default async function BookmarkPage() {
    return (
        <div className="container mx-auto mb-2 px-6">
            <ClientBookmarkedTablatureList />
        </div>
    );
}
