import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { useTheme } from "next-themes";
import { toastSuccess } from "~/helpers/toasters";
interface Props {
  rclassName?: string;
}
const ThemeToggler = ({ rclassName }: Props) => {
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
      className={
        rclassName ??
        ` relative cursor-pointer !rounded-full !bg-transparent !p-4 
        !text-text  transition-all duration-100 hover:!bg-primary hover:!text-white dark:!text-title-dark 
          `
      }
    >
      {isLight && <MoonIcon className="h-6 w-6 md:h-8 md:w-8 " />}
      {!isLight && <SunIcon className="h-6 w-6 md:h-8 md:w-8 " />}
    </Button>
  );
};
export default ThemeToggler;
