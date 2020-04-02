interface GroceryListItem {
  name: string;
  quantity: number;
  calories: number;
  purchaseDate: string;
  expirationDate: string;
  consumptionDate: string;
};

interface User {
  email: string;
  createdAt?: string;
  updatedAt?: string;
}
