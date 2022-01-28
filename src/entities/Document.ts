import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"
import { MomentJS } from "../helpers/MomentJS"

@Entity("document")
export class Document {
  @PrimaryGeneratedColumn({ type: "bigint" })
  document_id: bigint

  @Column()
  user_id: bigint

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User

  @Column()
  international: boolean

  @Column()
  name: string

  @Column()
  number: string

  @Column()
  complement: string

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
