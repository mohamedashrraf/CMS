export interface GetAllRoles {
    messages: string,
    success: Boolean,
    data: [
        {
            roleId: string,
            roleName: string,
            roleIconPath: string
        },
    ]
}