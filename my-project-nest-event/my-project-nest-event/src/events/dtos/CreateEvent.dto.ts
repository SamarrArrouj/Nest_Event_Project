import { IsEnum, IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { EventCategory } from 'src/typeorm/entities/EventEntity';


export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  date: Date;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(EventCategory)
  category: EventCategory;
}
