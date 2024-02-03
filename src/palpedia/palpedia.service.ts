import { Injectable } from '@nestjs/common';
import { CreatePalDto } from './dto/create-pal.dto';
import { UpdatePalDto } from './dto/update-pal.dto';
import { Pal } from './entities/pal.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PalpediaService {
  constructor(@InjectModel(Pal.name) private readonly palModel: Model<Pal>) {}

  /**
   * Create a new pal
   * @param createPalDTO - The pal to be created
   * @returns The created pal
   */
  create(createPalDTO: CreatePalDto) {
    try {
      const newPal = new this.palModel(createPalDTO);
      newPal.save();

      return newPal;
    } catch (error) {
      throw new Error('Error creating pal');
    }
  }

  /**
   * Retrieves all pals from the database.
   * @returns {Promise<Pal[]>} A promise that resolves to an array of pals.
   * @throws {Error} If there is an error finding pals.
   */
  findAll() {
    try {
      return this.palModel.find();
    } catch (error) {
      throw new Error('Error finding pals');
    }
  }

  /**
   * Retrieves a pal by its id.
   * @param id - The id of the pal to retrieve.
   * @returns {Promise<Pal>} A promise that resolves to the pal with the specified id.
   * @throws {Error} If there is an error finding the pal.
   */
  findOne(id: number) {
    try {
      return this.palModel.findById(id);
    } catch (error) {
      throw new Error('Error finding pal by id');
    }
  }

  /**
   * Retrieves a pal by its name.
   * @param name - The name of the pal to retrieve.
   * @returns {Promise<Pal>} A promise that resolves to the pal with the specified name.
   * @throws {Error} If there is an error finding the pal.
   */

  findbyName(name: string) {
    try {
      return this.palModel.find({ name: { $regex: name, $options: 'i' } });
    } catch (error) {
      throw new Error('Error finding pal with that name');
    }
  }

  /**
   * Updates a pal by its id.
   * @param id - The id of the pal to update.
   * @param UpdatePalDto - The data to update the pal with.
   * @returns {Promise<Pal>} A promise that resolves to the updated pal.
   * @throws {Error} If there is an error updating the pal.
   */
  update(id: number, UpdatePalDto: UpdatePalDto) {
    try {
      return this.palModel.findByIdAndUpdate(id, UpdatePalDto);
    } catch (error) {
      throw new Error('Error updating pal');
    }
  }

  /**
   * Removes a pal by its id.
   * @param id - The id of the pal to remove.
   * @returns {Promise<Pal>} A promise that resolves to the removed pal.
   * @throws {Error} If there is an error removing the pal.
   */
  remove(id: number) {
    try {
      return this.palModel.deleteOne({ _id: id });
    } catch (error) {
      throw new Error('Error deleting pal');
    }
  }

  /**
   * Removes all pals from the database.
   * @returns {Promise<Pal>} A promise that resolves to the removed pal.
   * @throws {Error} If there is an error removing the pal.
   */
  removeAll() {
    try {
      return this.palModel.deleteMany();
    } catch (error) {
      throw new Error('Error deleting pal');
    }
  }
}
