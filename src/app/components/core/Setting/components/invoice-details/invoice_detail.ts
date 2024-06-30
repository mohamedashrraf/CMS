export interface invoice_detail {
    message: string,
    success: Boolean,
    data: [
        {
            id: number;
            ammount: number;
            currency: number;
            description: string;
            email: string;
            name: string;
            paymentStatus: Boolean;
            expirationDate: string;
            paymentType: string;
            numberOfUsers: number;
            seO_Usage: string;
            numberOfPosts: number;
            storageCapacity: number;
        }
    ]
}