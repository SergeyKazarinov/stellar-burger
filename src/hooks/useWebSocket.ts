import { useRef } from 'react';

import { wsActions } from '../services/slices/wsSlice';

import { useAppDispatch } from './useTypedSelector';


export const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const ws = useRef<WebSocket | null>(null);

  const connect = (url: string) => {
    ws.current = new WebSocket(url);

    ws.current.onopen = (e: Event) => {
      dispatch(wsActions.setWsConnected(true));
      console.log(e);
    };

    ws.current.onmessage = (e: MessageEvent<string>) => {
      const message = JSON.parse(e.data);

      dispatch(wsActions.setWSMessage(message));
      console.log(message);
    };

    ws.current.onerror = (e) => {
      dispatch(wsActions.setWsConnected(false));
      console.log(e);
    };

    ws.current.onclose = (e) => {
      dispatch(wsActions.setWsConnected(false));
      console.log(e);
    };
  };


  return { connect };
};