export class AppUser {
    fullName!: string;
    email!: string;
    token!: string;
    emailConfirmed!: string;
    expireDate!: string;
    imageProfilePath?: string
    roleName?: string;
    paymentState?: Boolean;
}