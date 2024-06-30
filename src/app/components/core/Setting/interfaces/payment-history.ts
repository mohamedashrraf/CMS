export interface PaymentHistoryResponse {
    data: [
        {
            id: number,
            ammount: string,
            currency: string,
            description: string,
            email: string,
            name: string,
            paymentStatus: Boolean,
            expirationDate: Date,
            paymentType: string
        }
    ],
    total: number,
    pagesNumbr: number
    success: Boolean,
    message: string
}