export interface userInfo {
  id: string,
  fullName: string,
  profileImagePath: string,
  isAccountActive: boolean,
  email: string,
  createdAt: string,
  roleName: string,
  paymentState?: Boolean;
}
