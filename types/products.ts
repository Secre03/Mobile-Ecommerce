export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: any;
};

export type CartItem = Product & {
  cartQuantity: number;
};