import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Superpowers } from 'enums/Superpowers';

export class CreateSuperheroDto {
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  real_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  catch_phrase: string;

  superpowers: Superpowers[];
}