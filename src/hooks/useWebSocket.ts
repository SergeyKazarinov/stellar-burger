import { useRef } from 'react';

import { orderSliceActions } from '../services/slices/ordersSlice';

import { useAppDispatch } from './useTypedSelector';


export const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const ws = useRef<WebSocket | null>(null);

  const connect = (url: string) => {
    ws.current = new WebSocket(url);

    ws.current.onopen = (e: Event) => {
      console.log(e);
    };

    ws.current.onmessage = (e: MessageEvent<string>) => {
      const message = JSON.parse(e.data);

      dispatch(orderSliceActions.setFeedOrders(message));
      console.log(message);
    };

    ws.current.onerror = (e) => {
      console.log(e);
    };

    ws.current.onclose = (e) => {
      console.log(e);
    };
  };


  return { connect };
};