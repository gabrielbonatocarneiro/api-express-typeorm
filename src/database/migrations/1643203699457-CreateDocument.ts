import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateDocument1643203699457 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "document",
        columns: [
          {
            name: "document_id",
            type: "bigint",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            unsigned: true,
          },
          {
            name: "user_id",
            type: "bigint",
            unsigned: true,
          },
          {
            name: "international",
            type: "tinyint",
            length: "1",
            unsigned: true,
            default: false,
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "number",
            type: "varchar",
            length: "255",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "complement",
            type: "varchar",
            length: "255",
            isNullable: true,
            default: null,
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
        foreignKeys: [
          {
            name: "fk_document_user",
            columnNames: ["user_id"],
            referencedTableName: "user",
            referencedColumnNames: ["user_id"],
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("document")
  }
}
