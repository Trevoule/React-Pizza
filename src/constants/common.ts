export const pizzasUrl = 'https://63efb7b1271439b7fe74db08.mockapi.io/items';
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

export const sortTypes = ['popularity', 'price', 'alphabetically'];
