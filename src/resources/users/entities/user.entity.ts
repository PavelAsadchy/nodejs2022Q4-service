export class User {
  id: string;
  login: string;
  password?: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  static toResponse(user: User): User {
    const { password, ...rest } = user;

    return rest;
  }
}
