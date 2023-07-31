export type AuthUser = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: 'DZ' | 'FR';
};

export type UserResponse = {
  id: number
  firstName: string 
  lastName: string 
  username: string 
  role: "DZ" | "FR"
};

export type UserModel = {
  username:string 
  password: string
}