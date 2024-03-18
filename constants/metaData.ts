import { Metadata } from "next";
import { whiteFavicon } from "@/public/images";

const productName = 'Level Play';
// edit your sco data here
export const appMetaData = {
    main: {
        title: `${productName}`,
        description: "",
        icons: whiteFavicon.src
    } as Metadata,
}
