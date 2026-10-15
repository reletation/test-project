import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Experience {
    @Field(() => ID) id!: string;
    @Field() startDate!: Date;
    @Field(() => Date, { nullable: true }) endDate?: Date | null;
    @Field() company!: string;
    @Field() position!: string;
    @Field() createdAt!: Date;
}
