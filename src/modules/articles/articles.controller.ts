import {
  Controller,
  UseGuards,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { RequirePermissions } from '../auth/decorators/require-permissions.decorator';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PermissionSubject, PermissionAction } from '../permissions/domain/enums';
import { ArticlesService } from './application/articles.service';
import { ArticleResponse } from './application/dtos/article.respose';
import { CreateArticleRequest } from './application/dtos/create-article.request';
import { UpdateArticleRequest } from './application/dtos/update-article.request';
import { TokenPayload } from '../auth/domain/token.service.interface';
import type { Request } from 'express';

@Controller('articles')
@UseGuards(AuthGuard, PermissionsGuard)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @RequirePermissions(
    { subject: PermissionSubject.ARTICLES, action: PermissionAction.CREATE },
    { subject: PermissionSubject.ARTICLES, action: PermissionAction.MANAGE },
  )
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: Request, @Body() createArticleDto: CreateArticleRequest): Promise<ArticleResponse> {
    return await this.articlesService.createArticle(createArticleDto, req.user as TokenPayload);
  }

  @Get(':id')
  @RequirePermissions(
    { subject: PermissionSubject.ARTICLES, action: PermissionAction.READ },
    { subject: PermissionSubject.ARTICLES, action: PermissionAction.MANAGE },
  )
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ArticleResponse> {
    return await this.articlesService.getById(id);
  }

  @Get('/user/:userId')
  @RequirePermissions(
    { subject: PermissionSubject.ARTICLES, action: PermissionAction.READ },
    { subject: PermissionSubject.ARTICLES, action: PermissionAction.MANAGE },
  )
  async findByUser(@Param('userId', ParseUUIDPipe) userId: string): Promise<ArticleResponse[]> {
    return await this.articlesService.getAllByUserId(userId);
  }

  @Put(':id')
  @RequirePermissions(
    { subject: PermissionSubject.ARTICLES, action: PermissionAction.UPDATE },
    { subject: PermissionSubject.ARTICLES, action: PermissionAction.MANAGE },
  )
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArticleDto: UpdateArticleRequest,
  ): Promise<ArticleResponse> {
    return await this.articlesService.updateArticle(id, updateArticleDto);
  }

  @Delete(':id')
  @RequirePermissions(
    { subject: PermissionSubject.ARTICLES, action: PermissionAction.DELETE },
    { subject: PermissionSubject.ARTICLES, action: PermissionAction.MANAGE },
  )
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.articlesService.deleteArticle(id);
  }
}
