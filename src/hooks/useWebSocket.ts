import { useRef } from 'react';

import { fetchGetUser } from '../services/asyncThunk/profileThunk';
import { wsActions } from '../services/slices/wsSlice';

import { ACCESS_TOKEN, WSS_FOR_PROFILE_ORDERS } from '../utils/constants';

import { useAppDispatch } from './useTypedSelector';


export const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const ws = useRef<WebSocket | null>(null);

  const connect = (url: string) => {
    ws.current = new WebSocket(url);

    ws.current.onopen = (e: Event) => {
      dispatch(wsActions.setWsConnected(true));
    };

    ws.current.onmessage = (e: MessageEvent<string>) => {
      const message = JSON.parse(e.data);
      if (message.success) {
        dispatch(wsActions.setWSMessage(message));
      } else {
        dispatch(fetchGetUser());
      }

    };

    ws.current.onerror = (e: Event) => {
      dispatch(wsActions.setWsConnected(false));
      console.log(e);
    };

    ws.current.onclose = (e: CloseEvent) => {
      if(e.wasClean) {
        console.log(e);
        dispatch(wsActions.setWSMessage(null));
      }
      dispatch(wsActions.setWsConnected(false));
    };
  };

  const closeWs = () => {
    ws.current?.close();
  };

  return { connect, closeWs };
};