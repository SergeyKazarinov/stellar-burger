import { TypedUseSelectorHook, useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../services';


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;