export interface ViewRole {
    data: {
        id: string,
        name: string,
        roleIcon: {
            id: number,
            iconPath: string
        },
        description: string,
        isActive: Boolean,
        color: string,
        createdAt: string,
        applicationUsers: [
            {
                id: string,
                fullName: string,
                profileImagePath: string
            }
        ],
        usersCount: number
    },
    message: string,
    success: Boolean
}