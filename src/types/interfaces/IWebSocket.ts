import { IFeedOrder } from "./IOrder";

export interface IWebSocketResolve {
  success: boolean;
  orders: IFeedOrder[];
  total: number;
  totalToday: number;
}