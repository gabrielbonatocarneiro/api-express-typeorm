import { Bcrypt } from "./../helpers/Bcrypt"
import { UserRepository } from "./../repositories/UserRepository"
import { User } from "../entities/User"
import { getCustomRepository } from "typeorm"

type LoginRequest = {
  email: string
  password: string
}

type CreateUserRequest = {
  name: string
  email: string
  password: string
}

type UpdateUserRequest = {
  userId: bigint
  name: string
  email: string
  oldPassword: string
  newPassword: string
}

export class UserService {
  private repository = getCustomRepository(UserRepository)

  async login({ email, password }: LoginRequest): Promise<User | Error> {
    const user = await this.repository.getUserToLoginByEmail(email);

    if (!user) {
      return new Error("User not exists")
    }

    if (!await new Bcrypt().valueIsEqualHash(password, user.password)) {
      return new Error("Invalid password")
    }

    delete user.password

    return user
  }

  async show(userId: bigint): Promise<User | Error> {
    const user = await this.repository.show(userId)

    if (!user) {
      return new Error("User not exists")
    }

    return user
  }

   async store({ name, email, password }: CreateUserRequest): Promise<User | Error> {
    const hashedPassword = await new Bcrypt().generateHash(password)

    const result = await this.repository.store({
      name,
      email,
      password: hashedPassword,
    })

    if (result instanceof Error) {
      return result
    }

    delete result.password

    return result
  }

  async update({ userId, name, email, oldPassword, newPassword }: UpdateUserRequest): Promise<User | Error> {
    const user = await this.repository.show(userId, true)

    if (!user) {
      return new Error("User not exists")
    }

    if (oldPassword && newPassword && !(await new Bcrypt().valueIsEqualHash(oldPassword, user.password))) {
      return new Error("Invalid password")
    }

    let hashedPassword = user.password

    if (newPassword) {
      hashedPassword = await new Bcrypt().generateHash(newPassword)
    }

    const result = await this.repository.update({
      name,
      email,
      password: hashedPassword,
    }, user)

    if (result instanceof Error) {
      return result
    }

    delete result.password

    return result
  }

  async destroy(userId: bigint) {
    const user =  await this.repository.show(userId)

    if (!user) {
      return new Error("User not exists")
    }

    await this.repository.destroy(userId)
  }
}
