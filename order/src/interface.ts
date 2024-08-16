export interface OrderCreation {
  action: "OrderCreation";
  data: {
    customer_id: string;
    invoice_id: string;
    shipping_address: {
      address_line1: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    items: {
      product_id: string;
      name: string;
      quantity: number;
      price: number;
      currency: string;
      images: string[];
    }[];
  };
}

export interface OrderItemAttributes {
  id: string;
  product_id: string;
  name: string;
  images: string[];
  quantity: number;
  order_id: string;
  invoice_id: string;
  price: number;
  currency: string;
}

export interface OrderAttributes {
  id: string;
  status: string;
  customer_id: string;
  city: string;
  state: string;
  address_line1: string;
  postal_code: string;
  country: string;
  invoice_id: string;
  tracking_id?: string;
  payment_id?: string;
  delivery_note?: string;
  address_line2?: string;
  address_line3?: string;
}
