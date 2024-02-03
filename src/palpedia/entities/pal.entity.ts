import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Pal {
  @Prop()
  _id?: number;

  @Prop()
  key: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  wiki?: string;

  @Prop([String])
  types: string[];

  @Prop([String])
  drops?: string[];

  @Prop({ required: true })
  description: string;
}

export const PalSchema = SchemaFactory.createForClass(Pal);
