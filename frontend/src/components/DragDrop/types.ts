export type UserStatus = 'ACTIVE' | 'NON_ACTIVE' ;

export type User = {
  id: string;
  status: UserStatus;
  name: string;
  lastActive: number; // Add lastActive timestamp
};

export type Column = {
  id: UserStatus;
  title: string;
};