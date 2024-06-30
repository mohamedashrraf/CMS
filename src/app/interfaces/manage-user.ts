export interface ManageUser {
    id: string;
    fullName: string;
    profileImagePath: string;
    userStatus: Boolean;
    email: string;
    createdAt: string;
    roleName: string;
    paymentState?: Boolean;
}