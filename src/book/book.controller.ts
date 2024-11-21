import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import { pageSizeDTO } from './dto/page-size.dto';

@Controller('books')
export class BookController {
    constructor(private bookService:BookService){}

    @Get()
    async getAllBook(@Body()query:pageSizeDTO):Promise<Book[]>{
        return this.bookService.findAll(query);
    }

    @Post()
    async createBook(@Body()book:CreateBookDTO):Promise<Book>{
        return this.bookService.create(book)
    }

    @Get(':id')
    async getBookById(@Param('id')id:string):Promise<Book>{
        return this.bookService.findById(id);
    }

    @Put(':id')
    async updateBook(
        @Param('id')
        id:string,
        @Body()
        book:UpdateBookDTO
    ):Promise<Book>{
        return this.bookService.updateById(id,book);
    }
}
