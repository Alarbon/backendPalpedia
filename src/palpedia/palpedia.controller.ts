import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PalpediaService } from './palpedia.service';
import { CreatePalDto } from './dto/create-pal.dto';
import { UpdatePalDto } from './dto/update-pal.dto';
import { Pal } from './entities/pal.entity';

@Controller('v1/palpedia')
export class PalpediaController {
  constructor(private readonly palpediaService: PalpediaService) {}

  @Post()
  /**
   * Creates a new Palpedia entry.
   *
   * @param createPalpediaDto The data for creating the Palpedia entry.
   * @returns The created Palpedia entry.
   */
  async create(@Body() createPalpediaDto: CreatePalDto) {
    try {
      // me traigo todos los pals de la base de datos
      const data = await this.palpediaService.findAll(); // Espera la resolución de la promesa
      const pals: Pal[] = data.map((doc: any) => doc.toObject()); // Utiliza toObject() para obtener un objeto plano

      //empiezo a ver desde 1 la id y si no existe la id la asigno
      let id = 1;

      while (pals.find((pal) => pal._id === id)) {
        id++;
      }

      createPalpediaDto._id = id;
      // le asigno la key
      createPalpediaDto.key = id.toString().padStart(3, '0');
      return this.palpediaService.create(createPalpediaDto);
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  /**
   * Retrieves all items from the Palpedia service.
   * @returns {Promise<any[]>} A promise that resolves to an array of items.
   */
  @Get()
  findAll() {
    return this.palpediaService.findAll();
  }

  /**
   * Retrieves a pal by its id.
   * @param id - The id of the pal to retrieve.
   * @returns {Promise<Pal>} A promise that resolves to the pal with the specified id.
   * @throws {Error} If there is an error finding the pal.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.palpediaService.findOne(+id);
  }

  @Get('/name/:name')
  findbyName(@Param('name') name: string) {
    return this.palpediaService.findbyName(name);
  }

  /**
   * Updates a pal by its id.
   * @param id - The id of the pal to update.
   * @param UpdatePalDto - The data to update the pal with.
   * @returns {Promise<Pal>} A promise that resolves to the updated pal.
   * @throws {Error} If there is an error updating the pal.
   */

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePalpediaDto: UpdatePalDto) {
    return this.palpediaService.update(+id, updatePalpediaDto);
  }

  /**
   *  Removes a pal by its id.
   * @param id  - The id of the pal to remove.
   * @returns
   */

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const pal = await this.palpediaService.remove(+id);
    if (pal.deletedCount > 0) {
      return {
        status: 200,
        message: 'Pal removed',
      };
    }
    return {
      status: 400,
      message: 'Pal not found',
    };
  }

  //borrarTodos

  /**
   *  Removes all pals from the database.
   * @param password  - The password to remove all pals.
   * @returns
   */
  @Delete('all/:password')
  async removeAll(@Param('password') password: string) {
    if (password !== '1324') {
      return {
        status: 400,
        message: 'You are not authorized to perform this action',
      };
    }

    const pals = await this.palpediaService.removeAll();
    if (pals.deletedCount > 0) {
      return {
        status: 200,
        message: 'Pals removed',
      };
    }
    return {
      status: 400,
      message: 'Pals not found',
    };
  }
}
