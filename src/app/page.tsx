import { ArtistClient } from "@/clients/cms/artist";
import { TablatureClient } from "@/clients/cms/tablature";
import { TablatureSearch } from "@/components/tablature/tablature-search";

export default async function IndexPage() {
    const artists = await ArtistClient.findArtists();
    const tablatures = await TablatureClient.findLatestTablatures();

    return (
        <div className="container mx-auto mb-2">
            <TablatureSearch artists={artists} tablatures={tablatures} />
        </div>
    );
}
