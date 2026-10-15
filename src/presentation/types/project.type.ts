import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Project {
    @Field(() => ID) id!: string;
    @Field() name!: string;
    @Field() url!: string;
    @Field() createdAt!: Date;
}
