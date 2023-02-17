export interface Pizza {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

export const categories = ['All', 'With meat', 'Vegetarian', 'Grilled', 'Spicy', 'Calzone'];

export const pizzaTypes = ['Thin', 'Traditional'];
