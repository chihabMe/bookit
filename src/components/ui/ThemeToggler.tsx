import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { useTheme } from "next-themes";
import { toastSuccess } from "~/helpers/toasters";

const ThemeToggler = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const isLight = theme == "light";
  const currentTheme = theme == "system" ? systemTheme : theme;
  const themeToggler = () => {
    const newTheme = isLight ? "dark" : "light";
    setTheme(newTheme);
    toastSuccess({ message: `${newTheme} theme on` });
  };
  return (
    <Button
      onClick={themeToggler}
      className=" relative cursor-pointer !rounded-full !bg-transparent !p-4 px-2 py-2
        !text-text  transition-all duration-100 hover:!bg-primary hover:!text-white dark:!text-title-dark 
          "
    >
      {isLight && <MoonIcon className="h-6 w-6 md:h-8 md:w-8 " />}
      {!isLight && <SunIcon className="h-6 w-6 md:h-8 md:w-8 " />}
    </Button>
  );
};
export default ThemeToggler;