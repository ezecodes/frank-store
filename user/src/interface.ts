export interface UserAttributes {
  id: string;
  full_name: string;
  email: string;
  password: string;
  user_role: "customer" | "seller";
  status: "active" | "inactive" | "blocked";
  date_of_birth?: number;
  gender?: string;
  country?: string;
  phone_number?: string;
  country_code?: string;
  notification_types?: ["email"?, "sms"?, "push"?];
}
