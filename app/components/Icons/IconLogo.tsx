import { memo } from "react";

function IconLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-label="Logo" {...props}>
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <rect width="6.5" height="6.5" x="3.75" y="13.75" rx="2" />
                <rect width="6.5" height="6.5" x="13.75" y="13.75" rx="2" />
                <rect width="6.5" height="6.5" x="3.75" y="3.75" rx="2" />
                <rect width="6.5" height="6.5" x="13.75" y="3.75" rx="2" />
            </g>
        </svg>
    )
}

export default memo(IconLogo);