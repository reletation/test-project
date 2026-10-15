import { Info, Query, Resolver } from "@nestjs/graphql";
import { Project } from "../types/project.type.js";
import type { GraphQLResolveInfo } from "graphql";
import { toPrismaSelect } from "../../infrastructure/prisma/prisma-select.js";
import { PrismaService } from "../../infrastructure/prisma/prisma.service.js";

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
