import { EntityRepository, EntityManager } from "typeorm"
import { User } from "../entities/User"
import { getRedis, setRedis } from "../redisConfig"

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

  async getUserToLoginByEmail(email: string): Promise<User> {
    const user = await this.manager.findOne(User, {
      where: { email }
    })

    const userToRedis = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    }

    await setRedis(`user_id_${user.user_id}`, JSON.stringify(userToRedis))

    return user
  }

  async show(userId: bigint, returnPw: boolean = false): Promise<User> {
    if (returnPw) {
      // time default to select -> 14.000ms
      return await this.manager.findOne(User, Number(userId))
    }

    // time dafault to select -> 2.000ms
    const userRedis = await getRedis(`user_id_${userId}`)

    const user = JSON.parse(userRedis)

    return user
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
