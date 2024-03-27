import { usePathname, useRouter } from "next/navigation"

export const useAppTheme = () => {
    const router = useRouter();
    const pathname = usePathname();

    return { pathname, router }
} 