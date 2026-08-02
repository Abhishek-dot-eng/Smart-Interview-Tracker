import { useTheme } from "../context/ThemeContext";


function ThemeToggle(){

    const {darkMode,setDarkMode}=useTheme();


    return(

        <button
        onClick={()=>setDarkMode(!darkMode)}
        className="
        px-3 py-2
        rounded-lg
        bg-gray-200
        dark:bg-gray-700
        text-black
        dark:text-white
        "
        >

        {darkMode ? "☀️ Light" : "🌙 Dark"}

        </button>

    )

}


export default ThemeToggle;