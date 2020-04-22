import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAvatarFieldToUsers1587490547548
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<Void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar',
        type: 'varchar', // Is Just a URL to a local file or in the cloud
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<Void> {
    await queryRunner.dropColumn('users', 'avatar');
  }
}
