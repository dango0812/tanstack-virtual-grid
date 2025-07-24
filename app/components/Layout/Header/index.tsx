// next
import Link from "next/link";
// styles
import styles from "@components/Layout/Header/Header.module.scss";
// icons
import IconLogo from "@icons/IconLogo";
// components
import LanguageSelect from "@components/Layout/LanguageSelect";
// libs
import { paths } from "@lib/paths";

interface HeaderProps {
    lng: string;
}

export default function Header({
    lng
}: HeaderProps) {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <Link href={paths.home} className={styles.link}>
                        <IconLogo />
                        <span>
                            TanStack Virtual Grid
                        </span>
                    </Link>

                    <LanguageSelect lng={lng}/>
                </div>
            </nav>
        </header>
    )
}