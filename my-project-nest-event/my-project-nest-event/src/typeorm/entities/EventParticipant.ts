import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { EventEntity } from "./EventEntity";

export enum ParticipationStatus {
    INSCRIT = 'INSCRIT',
    DESINSCRIT = 'DESINSCRIT',
}

@Entity()
export class EventParticipant {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.participations)
    user: User;

    @ManyToOne(() => EventEntity, (event) => event.participants)
    event: EventEntity;

    @Column({
        type: 'enum',
        enum: ParticipationStatus,
        default: ParticipationStatus.DESINSCRIT,
      })
      status: ParticipationStatus;

}