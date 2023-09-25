import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Superpower } from 'modules/superpowers/superpower.entity';
import { Repository } from 'typeorm';
import { CreateSuperpowerDto } from 'modules/superpowers/createSuperpower.dto';

@Injectable()
export class SuperpowerService {
  constructor(@InjectRepository(Superpower) private readonly superpowerRepository: Repository<Superpower>) {}

  async getAllSuperpowers(): Promise<Superpower[]> {
    try {
      const superpowers = await this.superpowerRepository.find();

      return superpowers;
    } catch (e) {
      console.log(e);
    }
  }

  async createSuperpower(createSuperpowerDto: CreateSuperpowerDto): Promise<Superpower> {
    try {
      const superpower = this.superpowerRepository.create(createSuperpowerDto);

      return await this.superpowerRepository.save(superpower);
    } catch (e) {
      console.log(e);
    }
  }

  async getSuperpowerByName(name: string): Promise<Superpower> {
    return await this.superpowerRepository.findOneBy({ name });
  }
}
