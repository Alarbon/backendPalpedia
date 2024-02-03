import { PartialType } from '@nestjs/mapped-types';
import { CreatePalDto } from './create-pal.dto';

export class UpdatePalDto extends PartialType(CreatePalDto) {
  image?: string;
  name?: string;
  wiki?: string;
  types?: string[];
  drops?: string[];
  description?: string;
}
