interface MainPageProps {
    params: Promise<{ lng: string; }>;
}

export default async function MainPage({ params }: MainPageProps) {
    const { lng } = await params;

    return (
        <main>
            language {lng}
        </main>
    )
}