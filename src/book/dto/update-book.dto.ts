import { IsEnum, IsOptional, IsString } from "class-validator";
import { Category } from "../schema/book.schema"


export class UpdateBookDTO{

    @IsOptional()
    @IsString()
    title:string;
    @IsOptional()
    @IsString()
    description:string;
    @IsOptional()
    @IsString()
    author:string;
    @IsOptional()
    @IsString()
    price:number;
    @IsOptional()
    @IsEnum(Category, {message:"Please enter correct Category..!"})
    category:Category;
}