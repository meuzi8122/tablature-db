import { TablatureForm } from "@/components/tablature/tablature-form";

export default async function TablatureNewPage() {
    return (
        <div className="container mx-auto mb-2 px-5 md:px-0">
            <h1 className="mb-5 text-xl">TAB譜を投稿</h1>
            <TablatureForm />
        </div>
    );
}
