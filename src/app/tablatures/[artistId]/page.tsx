import { findArtists } from "@/clients/cms/artist";
import { findTablatures } from "@/clients/cms/tablature";
import { TablatureSearch } from "@/components/tablature/tablature-search";

type Props = {
    params: Promise<{ artistId: string }>;
};

export default async function TablatureSearchPage({ params }: Props) {
    const { artistId } = await params;
    const artists = await findArtists();
    const tablatures = await findTablatures(artistId);

    return (
        <div className="container mx-auto mt-5">
            <TablatureSearch artistId={artistId} artists={artists} tablatures={tablatures} />
        </div>
    );
}
