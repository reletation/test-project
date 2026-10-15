import { Info, Query, Resolver } from "@nestjs/graphql";
import { Skill } from "../types/skill.type";
import type { GraphQLResolveInfo } from "graphql";
import { toPrismaSelect } from "../../infrastructure/prisma/prisma-select";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";

@Resolver(() => Skill)
export class SkillResolver {

    constructor(private readonly prisma: PrismaService) { }

    @Query(() => [Skill], { name: 'skills' })
    skills(@Info() info: GraphQLResolveInfo) {

        return this.prisma.skill.findMany({
            select: toPrismaSelect('Skill', info),
        });
    }

}
