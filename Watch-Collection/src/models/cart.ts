export interface Cart {
  _id: string;
  orderDetails: OrderDetail[];
  user: string;
  isOrder: boolean;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface OrderDetail {
  watch: Watch;
  quantity: number;
  price: number;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Watch {
  _id: string;
  watchName: string;
  price: number;
  image: string;
}
