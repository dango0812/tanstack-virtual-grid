// components
import Header from "@components/Layout/Header";
import HomeHeroSection from "@components/Home/HomeHeroSection";

interface MainPageProps {
    params: Promise<{ lng: string; }>;
}

export default async function MainPage({ params }: MainPageProps) {
    const { lng } = await params;

    return (
        <>
            <Header lng={lng} />
            <main>
                <HomeHeroSection lng={lng} />
            </main>
        </>
    )
}