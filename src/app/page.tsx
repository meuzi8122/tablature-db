import { findArtists } from "@/clients/cms/artist";
import { findLatestTablatures } from "@/clients/cms/tablature";
import { TablatureSearch } from "@/components/tablature/tablature-search";

export default async function IndexPage() {
    const artists = await findArtists();
    const tablatures = await findLatestTablatures();

    return (
        <div className="container mx-auto">
            <TablatureSearch artists={artists} tablatures={tablatures} />
        </div>
    );
}
