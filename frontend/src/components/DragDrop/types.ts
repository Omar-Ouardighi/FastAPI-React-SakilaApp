export type UserStatus = 'ACTIVE' | 'NON_ACTIVE' ;

export type User = {
  id: string;
  status: UserStatus;
  name: string;
  lastActive: number; //  lastActive timestamp in order to sort the users later
};

export type Column = {
  id: UserStatus;
  title: string;
};