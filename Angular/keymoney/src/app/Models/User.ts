// משתמש
import { Amuta } from "./Amuta";
export class User {
  id_user: string;
  name_user: string;
  tel: string;
  misgeret: number;
  email: string;
  id_amuta?: number;
  is_admin: boolean;
  is_disabled: boolean;
  Amuta?: Amuta;
}
