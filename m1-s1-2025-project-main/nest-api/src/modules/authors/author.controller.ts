import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';
import type { AuthorId } from './author.entity';
import { AuthorModel } from './author.model';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAllAuthors(): Promise<AuthorModel[]> {
    return this.authorService.getAllAuthors();
  }

  @Get(':id')
  getAuthorById(@Param('id') id: AuthorId): Promise<AuthorModel | undefined> {
    return this.authorService.getAuthorById(id);
  }

  @Post()
  createAuthor(@Body() dto: CreateAuthorDto): Promise<AuthorModel> {
    return this.authorService.createAuthor(dto);
  }

  @Patch(':id')
  updateAuthor(
    @Param('id') id: AuthorId,
    @Body() dto: UpdateAuthorDto,
  ): Promise<AuthorModel | undefined> {
    return this.authorService.updateAuthor(id, dto);
  }

  @Delete(':id')
  deleteAuthor(@Param('id') id: AuthorId): Promise<void> {
    return this.authorService.deleteAuthor(id);
  }
}