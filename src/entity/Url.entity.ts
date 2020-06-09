import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Url {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    longUrl: string;

    @Column("varchar", { length: 40 })
    shortUrl: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}