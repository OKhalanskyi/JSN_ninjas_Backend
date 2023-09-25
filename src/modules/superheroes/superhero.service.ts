import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Superhero } from 'modules/superheroes/superhero.entity';
import { S3Service } from 'modules/AWS_S3/aws-s3.service';
import { CreateSuperheroDto } from 'modules/superheroes/createSuperhero.dto';
import { Services } from 'enums/Services';
import { SuperpowerService } from 'modules/superpowers/superpower.service';
import { Picture } from 'modules/Picture/Picture.entity';
import { CreatePictureDto } from 'modules/Picture/createPicture.dto';

@Injectable()
export class SuperheroService {
  constructor(
    @InjectRepository(Superhero) private readonly superheroRepository: Repository<Superhero>,
    @InjectRepository(Picture) private readonly pictureRepository: Repository<Picture>,
    @Inject(Services.Superpower) private readonly superpowerService: SuperpowerService,
    private s3Service: S3Service
  ) {}

  async getSuperheroById(id: string) {
    try {
      return await this.superheroRepository
        .createQueryBuilder('superhero')
        .where('superhero.id = :id', { id })
        .getOne();
    } catch (error) {
      console.log(error)
    }
  }

  async getAllSuperheroes(): Promise<Superhero[]> {
    try {
      const superheroes = await this.superheroRepository.find();

      return superheroes;
    } catch (e) {
      console.log(e);
    }
  }

  async uploadPictures(files: Express.Multer.File[]): Promise<string[]> {
    try {
      const images = await Promise.all(files.map( async (file) => {
        const bucketKey = `${file.fieldname}${Date.now()}`;
        const imageFile = await this.s3Service.uploadFile(file, bucketKey);

        return imageFile;
      }))

      return images;
    } catch (e) {
      console.log(e)
    }
  }

  async createPicture( createPicturesDto: CreatePictureDto) {
    try {
      const superhero = await this.getSuperheroById(
        createPicturesDto.superhero.id,
      );
      console.log(superhero)
      const image = await this.pictureRepository.save({
        url: createPicturesDto.picture,
        superhero,
      });

      return image;
    } catch (error) {
      console.log(error)
    }
  }

  async createSuperhero(files: Express.Multer.File[], createSuperheroDto: CreateSuperheroDto) {
    try {
      const images = await this.uploadPictures(files);

      const parsedSuperpowers = JSON.parse(`${createSuperheroDto.superpowers}`)

      const superpowers = await Promise.all(
        parsedSuperpowers.map(async superpower => {
          try {
            const existingSuperpower = await this.superpowerService.getSuperpowerByName(superpower);
            if (!existingSuperpower) {
              console.log(existingSuperpower)
            }

            return existingSuperpower;
          } catch (error) {
            console.log(error)
          }
        }),
      );

      const superhero = this.superheroRepository.create({
        nickname: createSuperheroDto.nickname,
        real_name: createSuperheroDto.real_name,
        description: createSuperheroDto.description,
        catch_phrase: createSuperheroDto.description,
        reference_image: images[0],
        superpowers,
      })

      console.log(images)
      await this.superheroRepository.save(superhero);

      await images.forEach(image => {
        this.createPicture({picture: image, superhero})
      })

    } catch (e) {
      console.log(e);
    }
  }
}
