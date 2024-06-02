import React from "react";
import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  // console.log(theme);

  return (
    <div className={theme}>
      <div
        className={`bg-white text-gray-700 ${theme}:text-gray-200 ${theme}:bg-[rgb(16,23,42)] min-h-screen`}
      >
        {children}
      </div>
    </div>
  );
}
