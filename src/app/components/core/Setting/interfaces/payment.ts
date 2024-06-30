export interface CreatePaymentSessionRequest {
    subscriptionId: string,
}

export interface CreatePaymentSessionResponse {
    sessionId: string,
    sessionUrl: string,
    cancelUrl: string,
    successUrl: string
}

export enum paymentType {
    stripe = 1,
    paypal = 2
}
