import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../schema/book.schema"


export class CreateBookDTO{

    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsString()
    description:string;

    @IsNotEmpty()
    @IsString()
    author:string;

    @IsNotEmpty()
    @IsNumber()
    price:number;

    @IsNotEmpty()
    @IsEnum(Category, {message:"Please enter correct Category..!"})
    category:Category;
}