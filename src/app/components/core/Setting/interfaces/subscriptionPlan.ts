export interface SubscriptionPlan {
    id: number,
    title: string,
    subTitle: string,
    price: number,
    duration: number,
    numberOfUsers: number,
    seoUsage: Boolean,
    numberOfPosts: number,
    storageCapacity: number,
    isCurrentPlan: Boolean
}