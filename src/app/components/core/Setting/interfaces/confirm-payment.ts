export interface ConfirmPaymentRequest {
    subscriptionId: number;
    paymentType: number;
}

export interface ConfirmPaymentResponse {
    success: Boolean,
    message: string
}