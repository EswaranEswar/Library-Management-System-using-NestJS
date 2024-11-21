import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import * as mongoose from 'mongoose';
import { pageSizeDTO } from './dto/page-size.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel:mongoose.Model<Book>
    ){}

    async findAll(query:pageSizeDTO):Promise<Book[]>{

        const resPerPage = query.pagesize
        const CurrentPage = Number(query.pagenumber) || 1
        const skip = resPerPage * (CurrentPage-1)

        const keyword=query.keyword?{
            title:{
                $regex:query.keyword,
                $options:'i'
            }
        }:{};
        const books = await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip)
        return books;
    }

    async create(book:Book):Promise<Book>{
        const res = await this.bookModel.create(book);
        
        return res;
    }

    async findById(id:string):Promise<Book>{

        const isValidate = mongoose.isValidObjectId(id)
        if(!isValidate){
            throw new BadRequestException('Please Enter Correct id...');
        }

        const book = await this.bookModel.findById(id);
        if(!book){
            throw new NotFoundException('Book Not Found..!');
        }
        
        return book;
    }

    async updateById(id:string,book:Book):Promise<Book>{
        return await this.bookModel.findByIdAndUpdate(id, book,{
            new:true,
            runValidators:true,
        });
    }
}

