export interface NewRole {
    name: string,
    description: string,
    isActive: Boolean,
    color: string,
    roleIconId: number,
    userPermissionId: [
        string
    ]
}