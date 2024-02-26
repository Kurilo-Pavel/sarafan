import type {AppDispatch, RootState} from "./index";
import {TypedUseSelectorHook, useSelector, useDispatch} from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;