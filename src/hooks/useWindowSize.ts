import { useEffect, useState } from "react";

interface IWindowSize {
  height?: number;
  width?: number;
}
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    height: undefined,
    width: undefined,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};
export default useWindowSize;
