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

export interface SortType {
  id: number;
  name: string;
  sort: string;
  order: string;
}

export const sortTypes = [
  { id: 0, name: 'popularity (lowest to highest)', sort: 'rating', order: 'asc' },
  { id: 1, name: 'popularity (highest to lowest)', sort: 'rating', order: 'desc' },
  { id: 2, name: 'price (lowest to highest)', sort: 'price', order: 'asc' },
  { id: 3, name: 'price (highest to lowest)', sort: 'price', order: 'desc' },
  { id: 4, name: 'alphabetically (lowest to highest)', sort: 'title', order: 'asc' },
  { id: 5, name: 'alphabetically (highest to lowest)', sort: 'title', order: 'desc' }
];
