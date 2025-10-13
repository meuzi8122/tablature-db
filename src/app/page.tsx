import { ArtistSection } from "@/components/tablature/artist-section";
import { ServerTablatureList } from "@/components/tablature/tablature-list/tablature-list.server";
import { TablatureSearch } from "@/components/tablature/tablature-search";

export default async function IndexPage() {
    return (
        <div className="container mx-auto mb-2 px-4 md:px-0">
            <TablatureSearch
                ArtistSection={<ArtistSection artistId={undefined} />}
                TablatureList={<ServerTablatureList artistId={undefined} />}
            />
        </div>
    );
}
