import { IsArray, IsNotEmpty } from 'class-validator';
import { Superhero } from 'modules/superheroes/superhero.entity';

export class CreatePictureDto {
  @IsNotEmpty()
  @IsArray()
  picture: string;

  @IsNotEmpty()
  superhero: Superhero;
}