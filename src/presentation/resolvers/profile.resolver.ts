import { Info, Query, Resolver } from "@nestjs/graphql";
import { Profile } from "../types/profile.type";
import type { GraphQLResolveInfo } from "graphql";
import { toPrismaSelect } from "../../infrastructure/prisma/prisma-select";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";

@Resolver(() => Profile)
export class ProfileResolver {

    constructor(private readonly prisma: PrismaService) { }

    @Query(() => [Profile], { name: 'profile' })
    profiles(@Info() info: GraphQLResolveInfo) {

        return this.prisma.profile.findMany({
            select: toPrismaSelect('Profile', info),
        });
    }
}
