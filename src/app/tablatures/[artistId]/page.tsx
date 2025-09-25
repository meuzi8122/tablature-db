import { ArtistClient } from "@/clients/cms/artist";
import { TablatureClient } from "@/clients/cms/tablature";
import { TablatureSearch } from "@/components/tablature/tablature-search";

type Props = {
    params: Promise<{ artistId: string }>;
};

export default async function TablatureSearchPage({ params }: Props) {
    const { artistId } = await params;
    const artists = await ArtistClient.findArtists();
    const tablatures = await TablatureClient.findTablatures(artistId);

    return (
        <div className="container mx-auto mb-2">
            <TablatureSearch artistId={artistId} artists={artists} tablatures={tablatures} />
        </div>
    );
}
