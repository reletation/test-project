import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Experience } from "./experience.type.js";
import { Project } from "./project.type.js";
import { Skill } from "./skill.type.js";

@ObjectType()
export class Profile {
    @Field(() => ID) id!: string;
    @Field() name!: string;
    @Field() description!: string;
    @Field() createdAt!: Date;

    @Field(() => [Project]) projects!: Project[];
    @Field(() => [Skill]) skills!: Skill[];
    @Field(() => [Experience]) experience!: Experience[];
}
