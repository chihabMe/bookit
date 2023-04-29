import { useDispatch } from "react-redux";

import type { AppDispatch } from "~/store/index";

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
