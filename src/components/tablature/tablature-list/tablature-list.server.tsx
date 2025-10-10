import { TablatureClient } from "@/clients/cms/tablature";
import { ClientTablatureList } from "./tablature-list.client";

type Props = {
    artistId?: string;
};

export async function ServerTablatureList({ artistId }: Props) {
    const tablatures = artistId
        ? await TablatureClient.findTablatures(artistId)
        : await TablatureClient.findLatestTablatures();

    return <ClientTablatureList artistId={artistId} tablatures={tablatures} />;
}
