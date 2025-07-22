import "@styles/globals.scss";

export default function Layout({
    children
}: React.PropsWithChildren) {
    return (
        <html>
            <head>

            </head>
            <body>
                {children}
            </body>
        </html>
    );
}