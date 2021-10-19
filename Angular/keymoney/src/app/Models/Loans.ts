// הלוואות

import { Expenses } from "./Expenses";

export class Loans {
  id_loan: number;
  id_expense: number;
  id_user: string;
  date_OfLoan: Date;
  sum: number;
  prisa: number;
  ribit: number; // float?
  days_toGetMailAlert: number; //?להשתמש בחישוב לשליחה?

  Expenses:Expenses;
}
