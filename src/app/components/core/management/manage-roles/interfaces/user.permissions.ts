export interface UserPermissionsRoles {
    name: string,
    showPermission?: Boolean,
    userPermissions: [
        {
            id: number,
            name: string,
            checked?: Boolean
        }
    ]
}