import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    //Object.assing (Função do java script que perimite receber um objeto e os atributos desse objeto,)
    Object.assign(user, {
      name,
      email,
      admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const userExist = this.users.find((user) => user.id == id);
    return userExist;
  }

  findByEmail(email: string): User | undefined {
    const emailExist = this.users.find((user) => user.email == email);
    return emailExist;
  }

  turnAdmin(receivedUser: User): User {
    let updateUser = this.users.find((user) => user.id === receivedUser.id);
    updateUser.admin = true;

    const updatedusers = this.users.map((user) =>
      user.id === updateUser.id ? updateUser : user
    );
    this.users = updatedusers;

    return updateUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
