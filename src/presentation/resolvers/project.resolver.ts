import { Info, Query, Resolver } from "@nestjs/graphql";
import { Project } from "../types/project.type";
import type { GraphQLResolveInfo } from "graphql";
import { toPrismaSelect } from "../../infrastructure/prisma/prisma-select";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";

@Resolver(() => Project)
export class ProjectResolver {

    constructor(private readonly prisma: PrismaService) { }

    @Query(() => [Project], { name: 'projects' })
    projects(@Info() info: GraphQLResolveInfo) {

        return this.prisma.project.findMany({
            select: toPrismaSelect('Project', info),
        });
    }
}
