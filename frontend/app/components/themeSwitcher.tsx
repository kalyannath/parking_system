"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuSunDim } from "react-icons/lu";
import { CiDark } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { toggleProgressBar } from "../redux/features/progressBar-slice";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = () => {
    dispatch(toggleProgressBar(true));
    setTheme(theme === 'light' ? "purple-dark" : "light")
    setTimeout(() => {
      dispatch(toggleProgressBar(false));
    }, 1500)
  }

  if (!mounted) return null

  return (
    <div className="flex gap-5">
      <Switch
        isSelected={theme === 'purple-dark'} onValueChange={handleThemeChange}
        size="md"
        startContent={<LuSunDim size={15} />}
        endContent={<CiDark size={15} />}
        thumbIcon={({ isSelected }) =>
          isSelected ? (
            <CiDark color="black" size={15} />
          ) : (
            <LuSunDim color="black" size={15} />
          )
        }
      />
    </div>
  )
};