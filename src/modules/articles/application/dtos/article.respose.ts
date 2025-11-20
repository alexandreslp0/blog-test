import { Article } from '../../domain/article.entity';

export class ArticleResponse {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly userId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static fromDomain(article: Article): ArticleResponse {
    return new ArticleResponse(
      article.id,
      article.title,
      article.content,
      article.userId,
      article.createdAt,
      article.updatedAt,
    );
  }
}
