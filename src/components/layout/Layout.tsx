import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem("tokio-theme") !== "light";
  });

  useEffect(() => {
    window.localStorage.setItem("tokio-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div
      className={`${isDarkMode ? "dark-mode" : "light-mode"} crt-shell theme-page flex min-h-screen flex-col font-body`}
    >
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((currentMode) => !currentMode)}
      />
      <main className="arcade-screen min-w-0 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
