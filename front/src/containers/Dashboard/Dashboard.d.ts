interface GroceryListItem {
  id: string;
  name: string;
  quantity: number;
  calories: number;
  purchaseDate: string;
  expirationDate: string;
  consumptionDate: string;
};

interface User {
  id: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}
