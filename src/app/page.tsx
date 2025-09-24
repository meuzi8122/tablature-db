import { findArtists } from "@/clients/cms/artist";
import { TablatureSearch } from "@/components/tablature/tablature-search";

export default async function IndexPage() {
    const artists = await findArtists();

    return (
        <div className="container mx-auto mt-5">
            <TablatureSearch artists={artists} />
        </div>
    );
}
