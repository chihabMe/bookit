import type { RootState } from "~/store/index";
import { useSelector, TypedUseSelectorHook } from "react-redux";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useAppSelector;
