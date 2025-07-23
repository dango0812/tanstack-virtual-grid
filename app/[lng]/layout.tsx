import "@styles/main.scss";

// i18next
import { dir } from "i18next";
import { languages } from "@i18n/settings";
import { serverSideTranslation } from "@i18n/server";

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }))
}

interface GenerateMetadataProps {
    params: Promise<{ lng: string; }>;
}

export async function generateMetadata({ params }: GenerateMetadataProps) {
    let { lng } = await params;
    const { t: tMetadata } = await serverSideTranslation(lng, "metadata");
    
    return {
        title: tMetadata("title")
    }
}

interface RootLayoutProps {
    children: React.ReactNode;
    params: Promise<{ lng: string; }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
    const { lng } = await params;
    
    return (
        <html lang={lng} dir={dir(lng)}>
            <head>
                <link href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css" rel="stylesheet" type="text/css" />
            </head>

            <body>
                {children}
            </body>
        </html>
    );
}