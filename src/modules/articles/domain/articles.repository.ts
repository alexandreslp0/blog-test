import { Article } from './article.entity';

export interface ArticleRepository {
  findById(id: string): Promise<Article | null>;
  save(article: Article): Promise<Article>;
  delete(article: Article): Promise<void>;
  findAllByUserId(userId: string): Promise<Article[]>;
}
