'use client'

import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";
import { toggleProgressBar } from "../redux/features/progressBar-slice";

const MainBody = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const pathName = usePathname();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(toggleProgressBar(true));
        setTimeout(() => {
            dispatch(toggleProgressBar(false));
        }, 1500)
    }, [pathName])

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex-1 w-full overflow-x-hidden overflow-y-hidden flex p-4 gap-4">
                {children}
            </div>
        </Suspense>
    )
}

export default MainBody;