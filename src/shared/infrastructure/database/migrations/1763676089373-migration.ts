import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1763676089373 implements MigrationInterface {
  name = 'Migration1763676089373';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_87bb15395540ae06337a486a77a"`);
    await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "REL_87bb15395540ae06337a486a77"`);
    await queryRunner.query(
      `ALTER TABLE "articles" ADD CONSTRAINT "FK_87bb15395540ae06337a486a77a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_87bb15395540ae06337a486a77a"`);
    await queryRunner.query(
      `ALTER TABLE "articles" ADD CONSTRAINT "REL_87bb15395540ae06337a486a77" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD CONSTRAINT "FK_87bb15395540ae06337a486a77a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
