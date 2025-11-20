import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcrypt';

export class SeedPermissionsAndRoles9999999999999 implements MigrationInterface {
  name = 'SeedPermissionsAndRoles9999999999999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const permissions = {
      manageArticles: crypto.randomUUID(),
      createArticles: crypto.randomUUID(),
      readArticles: crypto.randomUUID(),
      updateArticles: crypto.randomUUID(),
      deleteArticles: crypto.randomUUID(),

      manageUsers: crypto.randomUUID(),
      createUsers: crypto.randomUUID(),
      readUsers: crypto.randomUUID(),
      updateUsers: crypto.randomUUID(),
      deleteUsers: crypto.randomUUID(),
    };

    const roles = {
      admin: crypto.randomUUID(),
      editor: crypto.randomUUID(),
      reader: crypto.randomUUID(),
    };

    const hashedPassword = await hash('root123', 12);
    const rootUserId = crypto.randomUUID();

    await queryRunner.query(`
      INSERT INTO permissions (id, action, subject, description, "createdAt", "updatedAt") VALUES
      ('${permissions.manageArticles}', 'manage', 'articles', 'Full access to articles', NOW(), NOW()),
      ('${permissions.createArticles}', 'create', 'articles', 'Create articles', NOW(), NOW()),
      ('${permissions.readArticles}', 'read', 'articles', 'Read articles', NOW(), NOW()),
      ('${permissions.updateArticles}', 'update', 'articles', 'Update articles', NOW(), NOW()),
      ('${permissions.deleteArticles}', 'delete', 'articles', 'Delete articles', NOW(), NOW()),
      
      ('${permissions.manageUsers}', 'manage', 'users', 'Full access to users', NOW(), NOW()),
      ('${permissions.createUsers}', 'create', 'users', 'Create users', NOW(), NOW()),
      ('${permissions.readUsers}', 'read', 'users', 'Read users', NOW(), NOW()),
      ('${permissions.updateUsers}', 'update', 'users', 'Update users', NOW(), NOW()),
      ('${permissions.deleteUsers}', 'delete', 'users', 'Delete users', NOW(), NOW())
    `);

    await queryRunner.query(`
      INSERT INTO roles (id, name, slug, description, "createdAt", "updatedAt") VALUES
      ('${roles.admin}', 'Administrator', 'admin', 'Full access to manage articles and users', NOW(), NOW()),
      ('${roles.editor}', 'Editor', 'editor', 'Can manage articles (create, read, update, delete)', NOW(), NOW()),
      ('${roles.reader}', 'Reader', 'reader', 'Can only read articles', NOW(), NOW())
    `);

    await queryRunner.query(`
      INSERT INTO role_permissions (role_id, permission_id) VALUES
      ('${roles.admin}', '${permissions.manageArticles}'),
      ('${roles.admin}', '${permissions.createArticles}'),
      ('${roles.admin}', '${permissions.readArticles}'),
      ('${roles.admin}', '${permissions.updateArticles}'),
      ('${roles.admin}', '${permissions.deleteArticles}'),
      ('${roles.admin}', '${permissions.manageUsers}'),
      ('${roles.admin}', '${permissions.createUsers}'),
      ('${roles.admin}', '${permissions.readUsers}'),
      ('${roles.admin}', '${permissions.updateUsers}'),
      ('${roles.admin}', '${permissions.deleteUsers}')
    `);

    await queryRunner.query(`
      INSERT INTO role_permissions (role_id, permission_id) VALUES
      ('${roles.editor}', '${permissions.manageArticles}'),
      ('${roles.editor}', '${permissions.createArticles}'),
      ('${roles.editor}', '${permissions.readArticles}'),
      ('${roles.editor}', '${permissions.updateArticles}'),
      ('${roles.editor}', '${permissions.deleteArticles}')
    `);

    await queryRunner.query(`
      INSERT INTO role_permissions (role_id, permission_id) VALUES
      ('${roles.reader}', '${permissions.readArticles}')
    `);

    await queryRunner.query(`
      INSERT INTO users (id, name, email, password, role_id, "createdAt", "updatedAt") VALUES
      ('${rootUserId}', 'Root Administrator', 'root@admin.com', '${hashedPassword}', '${roles.admin}', NOW(), NOW())
    `);

    console.log('✅ Seed completed: Permissions, Roles and Root user created');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE email = 'root@admin.com'`);
    await queryRunner.query(`DELETE FROM role_permissions`);
    await queryRunner.query(`DELETE FROM roles WHERE slug IN ('admin', 'editor', 'reader')`);
    await queryRunner.query(`DELETE FROM permissions`);
  }
}
