import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userAdminExist = this.usersRepository.findById(user_id);
    if (!userAdminExist) {
      throw new Error("User not exists!");
    } else if (userAdminExist.admin === true) {
      const users = this.usersRepository.list();

      return users;
    } else {
      throw new Error("non admin user!");
    }
  }
}

export { ListAllUsersUseCase };
