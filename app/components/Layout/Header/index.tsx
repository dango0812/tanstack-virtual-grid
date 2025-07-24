// next
import Link from "next/link";
// styles
import styles from "@components/Layout/Header/Header.module.scss";
// icons
import IconLogo from "@icons/IconLogo";
// libs
import { paths } from "@lib/paths";

export default function Header() {
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
                </div>
            </nav>
        </header>
    )
}