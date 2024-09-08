"use client"

import { Navbar, NavbarBrand, NavbarContent, Progress } from "@nextui-org/react";
import { ThemeSwitcher } from "./themeSwitcher";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaSquareParking } from "react-icons/fa6";

const AppNavBar = () => {
    const progressBarState = useSelector((state: RootState) => state.ProgressBarReducer);
    const Router = useRouter();

    return (
        <div className="relative">
            <Navbar
                maxWidth={'full'}
                className="bg-secondaryBackground/50 p-0 backdrop-blur-3xl"
                classNames={{
                    wrapper: "px-4"
                }}
            >

                <NavbarContent justify="center">
                    <NavbarBrand className="transition-color duration-[500ms] flex gap-2 text-secondaryForeground">
                        <FaSquareParking className="w-6 h-6"/>
                        <span className="text-sm">
                            P A R K I N G
                        </span>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent as="div" justify="end">
                    <ThemeSwitcher />
                </NavbarContent>
            </Navbar>
            {progressBarState.state && <Progress
                radius="sm"
                size="lg"
                isIndeterminate
                className="absolute top-0"
                classNames={{
                    track: "bg-transparent",
                    indicator: "bg-gradient-to-r from-pink-500 to-yellow-500 opacity-40",
                }}
            />}
            {progressBarState.state && <Progress
                radius="sm"
                size="lg"
                isIndeterminate
                className="absolute bottom-0"
                classNames={{
                    track: "bg-transparent",
                    indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                }}
            />}
        </div>
    )
}

export default AppNavBar;