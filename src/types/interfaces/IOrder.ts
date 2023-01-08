export interface IOrder {
  name?: string,
  message?: string,
  order?: {
      number: number
  },
  success: boolean
}