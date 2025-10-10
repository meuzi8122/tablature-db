import { ArtistSection } from "@/components/tablature/artist-section";
import { TablatureList } from "@/components/tablature/tablature-list";
import { TablatureSearch } from "@/components/tablature/tablature-search";

type Props = {
    params: Promise<{ artistId: string }>;
};

export default async function TablatureSearchPage({ params }: Props) {
    const { artistId } = await params;

    return (
        <div className="container mx-auto mb-2">
            <TablatureSearch
                ArtistSection={<ArtistSection artistId={artistId} />}
                TablatureList={<TablatureList artistId={artistId} />}
            />
        </div>
    );
}
