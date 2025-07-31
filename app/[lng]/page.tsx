// components
import HomeHeroSection from "@components/Home/HomeHeroSection";
import HomeTechStackSection from "@components/Home/HomeTechStackSection";
import HomeTrySample from "@components/Home/HomeTrySample";

interface MainPageProps {
    params: Promise<{ lng: string; }>;
}

export default async function MainPage({ params }: MainPageProps) {
    const { lng } = await params;

    return (
        <main>
            <HomeHeroSection lng={lng} />
            <HomeTechStackSection lng={lng} />
            <HomeTrySample lng={lng} />
        </main>
    )
}