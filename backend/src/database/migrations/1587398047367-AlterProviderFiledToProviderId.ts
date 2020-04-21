import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
  Column,
} from 'typeorm';

export default class AlterProviderFiledToProviderId1587398047367
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentPovider',
        columnNames: ['provider_id'], // Quais colunas são foreing keys?
        referencedColumnNames: ['id'], // Lá na outra tabela, qual coluna que o provider_id representa?
        referencedTableName: 'users',
        onDelete: 'SET NULL', // O que fazer quando o user for deletado
        // RESTRICT => Não deixa o usuário ser deletado
        // SET NULL => Coloca os provider_id referentes a ele como NULL
        // CASCADE => Deleta junto os dados que fazem referência a ele
        onUpdate: 'CASCADE', // Cado o ID seja alterado (algo BEEEM raro)
        // No caso, se houver um upDate do ID, ele vai alterar de todos os registros que referenciam ele (CASCADE)
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Faz o 3 2 1 do UP
    await queryRunner.dropForeignKey('appointments', 'AppointmentPovider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new Column({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
