// styles
import styles from "@components/Home/Home.module.scss";
// i18n
import { serverSideTranslation } from "@i18n/server";
// icons
import IconPeople from "@icons/IconPeople";
import IconLightning from "@icons/IconLightning";
import IconSettings from "@icons/IconSettings";

interface HomeTechStackSectionProps {
    lng: string;
}

const TECH_STACK_CONFIG = [
    { title: "home_tech_stack_section.tech_stacks.design.title", description: "home_tech_stack_section.tech_stacks.design.description", icon: <IconPeople /> },
    { title: "home_tech_stack_section.tech_stacks.performance.title", description: "home_tech_stack_section.tech_stacks.performance.description", icon: <IconLightning /> },
    { title: "home_tech_stack_section.tech_stacks.maximum_composability.title", description: "home_tech_stack_section.tech_stacks.maximum_composability.description", icon: <IconSettings /> }
];

export default async function HomeTechStackSection({
    lng
}: HomeTechStackSectionProps) {
    const { t } = await serverSideTranslation(lng);

    return (
        <section className={styles.techStackSection}>
            <div className={styles.wrapper}>
                <h2>
                    {t("home_tech_stack_section.title")}
                </h2>
                <p>
                    {t("home_tech_stack_section.description")}
                </p>

                <div className={styles.grid}>
                    {TECH_STACK_CONFIG.map(({ title, description, icon }, index) => (
                        <div key={index} className={styles.gridItem}>
                            <div>
                                {icon}
                            </div>
                            <h5>
                                {t(title)}
                            </h5>
                            <p>
                                {t(description)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}