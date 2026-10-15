import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProfileResolver } from './presentation/resolvers/profile.resolver';
import { SkillResolver } from './presentation/resolvers/skills.resolver';
import { ExperienceResolver } from './presentation/resolvers/experience.resolver';
import { ProjectResolver } from './presentation/resolvers/project.resolver';
import { PrismaService } from './infrastructure/prisma/prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/presentation/generated/schema.gql'),
      sortSchema: true,
      playground: true
    })
  ],
  providers: [PrismaService, ProfileResolver, SkillResolver, ExperienceResolver, ProjectResolver]
})
export class AppModule { }
