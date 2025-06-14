import { Currency } from "./currency.i";

export interface Price {
  id: number;
  price: string;
  currency: Currency;
}
