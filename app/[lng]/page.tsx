// components
import Header from "@components/Layout/Header";

interface MainPageProps {
    params: Promise<{ lng: string; }>;
}

export default async function MainPage({ params }: MainPageProps) {
    const { lng } = await params;

    return (
        <>
            <Header />
            <main>
                language {lng}
            </main>
        </>
    )
}