import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {

  const { theme, toggleTheme } = useTheme();

  return (

    <button

      onClick={toggleTheme}

      className="
      flex
      items-center
      gap-2
      rounded-full
      bg-white/70
      px-4
      py-2
      shadow-lg
      backdrop-blur-xl

      dark:bg-slate-800
      dark:text-white
      "

    >

      {

        theme === "light"

        ?

        <MdDarkMode size={22}/>

        :

        <MdLightMode size={22}/>

      }

      

    </button>

  );

}