import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class NotifyParticipantDto {
  @IsNumber()
  eventId: number;

  @IsString()
  @IsNotEmpty()
  message: string;
}

export class NotifyGlobalDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
