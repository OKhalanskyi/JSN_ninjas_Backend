import { IsEnum, IsNotEmpty } from 'class-validator';
import { Superpowers } from 'enums/Superpowers';

export class CreateSuperpowerDto {
  @IsNotEmpty()
  @IsEnum(Superpowers)
  name: Superpowers;
}