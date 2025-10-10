import { ArtistSection } from "@/components/tablature/artist-section";
import { TablatureList } from "@/components/tablature/tablature-list";
import { TablatureSearch } from "@/components/tablature/tablature-search";

export default async function IndexPage() {
    return (
        <div className="container mx-auto mb-2">
            <TablatureSearch
                ArtistSection={<ArtistSection artistId={undefined} />}
                TablatureList={<TablatureList artistId={undefined} />}
            />
        </div>
    );
}
