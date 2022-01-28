import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1643202797062 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "user_id",
            type: "bigint",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            unsigned: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "100",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "datetime",
            isNullable: true,
            default: null,
          },
          {
            name: "updated_at",
            type: "datetime",
            isNullable: true,
            default: null,
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user")
  }
}
