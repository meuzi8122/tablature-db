import { ArtistClient } from "@/clients/cms/artist";
import { TablatureForm } from "@/components/tablature/tablature-form";

export default async function TablatureNewPage() {
    const artists = await ArtistClient.findArtists();

    return (
        <div className="container mx-auto">
            <h1 className="mb-5 text-xl">TAB譜を投稿</h1>
            <TablatureForm artists={artists} />
        </div>
    );
}
