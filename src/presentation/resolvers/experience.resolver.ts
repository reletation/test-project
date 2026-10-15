import { Info, Query, Resolver } from '@nestjs/graphql';
import { Experience } from '../types/experience.type.js';
import type { GraphQLResolveInfo } from 'graphql';
import { toPrismaSelect } from '../../infrastructure/prisma/prisma-select.js';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';

@Resolver(() => Experience)
export class ExperienceResolver {

    constructor(private readonly prisma: PrismaService) { }

    @Query(() => [Experience], { name: 'experience' })
    experiences(@Info() info: GraphQLResolveInfo) {

        return this.prisma.experience.findMany({
            select: toPrismaSelect('Experience', info),
        });
    }
}