import { memo } from "react";

function IconBentoGrid(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="icon-bento-grid" {...props}>
            <rect width="7.14522" height="15.6923" fill="#3182F6"/>
            <rect x="8.12158" width="15.8783" height="7.38462" fill="#E85A5A"/>
            <rect y="16.6155" width="15.6083" height="7.38462" fill="#FFC400"/>
            <rect x="8.06641" y="8.30762" width="7.54218" height="7.38462" fill="#9CD72F"/>
            <rect x="16.458" y="8.30762" width="7.54218" height="7.38462" fill="#FF0000" fillOpacity="0.4"/>
            <rect x="16.458" y="16.6155" width="7.54218" height="7.38462" fill="#5AE8AF" fillOpacity="0.72"/>
        </svg>
    )
}

export default memo(IconBentoGrid);