export interface Role {
  success: Boolean,
  message: string,
  data: [
    {
      id: string,
      name: string,
      roleIcon: {
        id: number,
        iconPath: string
      },
      description: string,
      isActive: true,
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
    }
  ]
  total: number,
  pagesNumber: number
}
