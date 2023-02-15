export interface IOrder {
  name?: string,
  message?: string,
  order?: {
      number: number
  },
  success: boolean
}

export interface IFeedOrder {
  _id: number;
  ingredients: string[];
  name: string;
  number: number;
  status: IOrderStatus;
  createdAt: string;
  updatedAt: string;
}

export enum IOrderStatus {
  done = 'done',
  pending = 'pending',
}