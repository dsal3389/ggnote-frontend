import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { FiMoon, FiSun, FiPlus } from "react-icons/fi";
import IcoBtnComponent from "./components/buttons/ico.btn.component";

const queryClient = new QueryClient();
const darkThemeClass = "dark";

export default function App() {
  const [darkTheme, darkThemeSet] = useState(localStorage.darkTheme === "true");

  useEffect(() => {
    if (darkTheme) document.documentElement.classList.add(darkThemeClass);
    else document.documentElement.classList.remove(darkThemeClass);
    localStorage.setItem("darkTheme", darkTheme);
  }, [darkTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="text-normal">
        <header className="p-4 border-b-2 sticky top-0 z-[1000] backdrop-blur items-center flex dark:bg-accent/50">
          <Link to="/">
            <h1 className="font-bold text-xl">GGNOTE</h1>
          </Link>
          <div className="flex-1"></div>
          <div className="space-x-2">
            <IcoBtnComponent
              Icon={<FiPlus />}
              title="create new note"
              href="/new"
            />
            <IcoBtnComponent
              Icon={darkTheme ? <FiSun /> : <FiMoon />}
              onClick={() => darkThemeSet(!darkTheme)}
            />
          </div>
        </header>
        <main className="m-auto px-4 max-w-screen-md">
          <Outlet />
        </main>
      </div>
    </QueryClientProvider>
  );
}
