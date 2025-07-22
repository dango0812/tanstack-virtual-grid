import "@styles/globals.scss";

export default function Layout({
    children
}: React.PropsWithChildren) {
    return (
        <html>
            <head>
                <link href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css" rel="stylesheet" type="text/css" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}