import { ArtistClient } from "@/clients/cms/artist";
import { getButtonClass } from "@/components/tablature/util";
import Link from "next/link";

type Props = {
    artistId: string | undefined;
};

export async function ArtistSection({ artistId }: Props) {
    const artists = await ArtistClient.findArtists();

    return (
        <div className="shadow-md p-4">
            <h3 className="mb-2 font-bold">アーティスト</h3>
            <div className="flex space-x-2 flex-wrap gap-2 overflow-y-scroll max-h-30">
                {artists.map((artist) => (
                    <Link
                        key={artist.id}
                        href={`/tablatures/${artist.id}`}
                        className={getButtonClass(artist.id === artistId)}
                    >
                        {artist.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
