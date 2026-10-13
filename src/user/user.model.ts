import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field()
    tabid: string;

    @Field()
    name: string;

    @Field()
    position: string;
}