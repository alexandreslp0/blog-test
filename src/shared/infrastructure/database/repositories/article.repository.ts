import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmUserEntity } from '../entities/user.entity';
import { User } from 'src/modules/users/domain/user.entity';
import { Role } from 'src/modules/roles/domains/role.entity';
import { ArticleRepository } from 'src/modules/articles/domain/articles.repository';
import { TypeOrmArticleEntity } from '../entities/article.entity';
import { Article } from 'src/modules/articles/domain/article.entity';

@Injectable()
export class TypeOrmArticleRepository implements ArticleRepository {
  constructor(
    @InjectRepository(TypeOrmArticleEntity)
    private readonly ormRepository: Repository<TypeOrmArticleEntity>,
  ) {}

  async findAllByUserId(userId: string): Promise<Article[]> {
    const entities = await this.ormRepository.find({
      where: { userId },
    });

    return entities.map((entity) => this.toDomain(entity));
  }

  async findById(id: string): Promise<Article | null> {
    const articleEntity = await this.ormRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    return articleEntity ? this.toDomain(articleEntity) : null;
  }

  async save(article: Article): Promise<Article> {
    const articleEntity = this.toPersistence(article);
    const savedArticleEntity = await this.ormRepository.save(articleEntity);
    return this.toDomain(savedArticleEntity);
  }

  async delete(article: Article): Promise<void> {
    await this.ormRepository.delete(article.id);
  }

  private toPersistence(article: Article): TypeOrmArticleEntity {
    const entity = new TypeOrmArticleEntity();
    entity.id = article.id;
    entity.title = article.title;
    entity.content = article.content;
    entity.userId = article.userId;
    entity.createdAt = article.createdAt;
    entity.updatedAt = article.updatedAt;
    return entity;
  }

  private toDomain(roleEntity: TypeOrmArticleEntity): Article {
    return new Article(
      roleEntity.id,
      roleEntity.title,
      roleEntity.content,
      roleEntity.userId,
      roleEntity.createdAt,
      roleEntity.updatedAt,
    );
  }

  private userToDomain(entity: TypeOrmUserEntity, role: Role): User {
    return new User(entity.id, entity.name, entity.email, entity.password, role, entity.createdAt, entity.updatedAt);
  }
}
