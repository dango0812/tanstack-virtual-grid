import { memo } from "react";

function IconKorean(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 20 19" fill="none" role="img" aria-label="icon-korean" {...props}>
            <path d="M18.7622 9.71108C18.7622 14.5231 14.8613 18.4231 10.0502 18.4231C5.2382 18.4231 1.3382 14.5231 1.3382 9.71108C1.3382 4.9 5.2382 1 10.0502 1C14.8613 1 18.7622 4.9 18.7622 9.71108Z" stroke="black" strokeWidth="1.2"/>
            <path d="M18.6256 11.1936C18.2093 8.63757 16.4499 7.38218 14.3397 7.29172C12.093 7.27049 11.1173 8.87018 10.401 9.70557L9.85267 10.3425C8.59636 11.4853 7.65205 11.8499 6.27482 11.8083C3.57205 11.7779 1.71759 9.28834 1.71759 7.22803" stroke="black" strokeWidth="1.2"/>
        </svg>
    )
}

export default memo(IconKorean);