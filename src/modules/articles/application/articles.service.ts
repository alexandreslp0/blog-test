import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Article } from '../domain/article.entity';
import type { ArticleRepository } from '../domain/articles.repository';
import { ArticleResponse } from './dtos/article.respose';
import { CreateArticleRequest } from './dtos/create-article.request';
import { TokenPayload } from 'src/modules/auth/domain/token.service.interface';
import { UpdateArticleRequest } from './dtos/update-article.request';

@Injectable()
export class ArticlesService {
  constructor(
    @Inject('ArticleRepository')
    private readonly articleRepository: ArticleRepository,
  ) {}

  async createArticle(request: CreateArticleRequest, token: TokenPayload): Promise<ArticleResponse> {
    const id = crypto.randomUUID();
    const article = new Article(id, request.title, request.content, token.userId);

    await this.articleRepository.save(article);
    return ArticleResponse.fromDomain(article);
  }

  async getById(id: string): Promise<ArticleResponse> {
    const article = await this.articleRepository.findById(id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return ArticleResponse.fromDomain(article);
  }

  async getAllByUserId(userId: string): Promise<ArticleResponse[]> {
    const articles = await this.articleRepository.findAllByUserId(userId);

    return articles.map((article) => ArticleResponse.fromDomain(article));
  }

  async updateArticle(id: string, request: UpdateArticleRequest): Promise<ArticleResponse> {
    const article = await this.articleRepository.findById(id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (request.title) {
      article.title = request.title;
    }

    if (request.content) {
      article.content = request.content;
    }

    await this.articleRepository.save(article);
    return ArticleResponse.fromDomain(article);
  }

  async deleteArticle(id: string): Promise<void> {
    const article = await this.articleRepository.findById(id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    await this.articleRepository.delete(article);
  }
}
