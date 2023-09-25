import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile, UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { Services } from 'enums/Services';
import { Superhero } from 'modules/superheroes/superhero.entity';
import { SuperheroService } from 'modules/superheroes/superhero.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CreateSuperheroDto } from 'modules/superheroes/createSuperhero.dto';

@Controller()
export class SuperheroController {
  constructor(@Inject(Services.Superhero) private superheroService: SuperheroService) {}

  @Get('superhero')
  getSuperheroes(): Promise<Superhero[]> {
    return this.superheroService.getAllSuperheroes();
  }

  @Post('superhero')
  @UseInterceptors(AnyFilesInterceptor())
  async createSuperhero(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createSuperheroDto: CreateSuperheroDto
  ) {
    await this.superheroService.createSuperhero(files, createSuperheroDto);
  }
}