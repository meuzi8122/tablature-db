import { ArtistSection } from "@/components/tablature/artist-section";
import { ServerTablatureList } from "@/components/tablature/tablature-list/tablature-list.server";
import { TablatureSearch } from "@/components/tablature/tablature-search";

type Props = {
    params: Promise<{ artistId: string }>;
};

export default async function TablatureSearchPage({ params }: Props) {
    const { artistId } = await params;

    return (
        <div className="container mx-auto mb-2 px-6 md:px-0">
            <TablatureSearch
                ArtistSection={<ArtistSection artistId={artistId} />}
                TablatureList={<ServerTablatureList artistId={artistId} />}
            />
        </div>
    );
}
