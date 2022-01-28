import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm"
import { MomentJS } from "../helpers/MomentJS"

@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "bigint" })
  user_id: bigint

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @CreateDateColumn({ type: "datetime" })
  created_at: string

  @CreateDateColumn({ type: "datetime" })
  updated_at: string

  constructor() {
    const moment = new MomentJS()

    if (!this.created_at) {
      this.created_at = moment.now()
    }

    if (!this.updated_at) {
      this.updated_at = moment.now()
    }
  }
}
