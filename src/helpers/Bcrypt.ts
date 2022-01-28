import bcrypt from "bcrypt"

const saltRounds = 10

export class Bcrypt {
  async generateHash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedValue = await bcrypt.hash(value, salt)

    return hashedValue
  }

  async valueIsEqualHash(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
