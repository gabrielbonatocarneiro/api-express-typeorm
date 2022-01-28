import { EntityRepository, EntityManager } from "typeorm"
import { User } from "../entities/User"

type CreateUser = {
  name: string
  email: string
  password: string
}

type UpdateUser = {
  name: string
  email: string
  password: string
}

@EntityRepository(User)
export class UserRepository {
  constructor(private manager: EntityManager) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.manager.findOne(User, {
      where: { email }
    })

    return user
  }

  async show(userId: bigint, returnPw: boolean = false): Promise<User> {
    if (returnPw) {
      return await this.manager.findOne(User, Number(userId))
    }

    return await this.manager.findOne(User, Number(userId), {
      select: ["user_id", "name", "email", "created_at", "updated_at"],
    })
  }

  async store({ name, email, password }: CreateUser): Promise<User | Error> {
    try {
      const user = this.manager.create(User, {
        name,
        email,
        password,
      })

      await this.manager.save(user)

      return user
    } catch (e) {
      return new Error(`Error create user: ${e}`)
    }
  }

  async update({ name, email, password }: UpdateUser, user: User): Promise<User | Error> {
    try {
      user.name = name
      user.email = email
      user.password = password
      user.created_at = user.created_at

      await this.manager.save(user)

      return user
    } catch (e) {
      return new Error(`Error update user: ${e}`)
    }
  }

  async destroy(userId: bigint) {
    await this.manager.delete(User, userId)
  }
}
