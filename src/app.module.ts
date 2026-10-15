import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProfileResolver } from './presentation/resolvers/profile.resolver.js';
import { SkillResolver } from './presentation/resolvers/skills.resolver.js';
import { ExperienceResolver } from './presentation/resolvers/experience.resolver.js';
import { ProjectResolver } from './presentation/resolvers/project.resolver.js';
import { PrismaService } from './infrastructure/prisma/prisma.service.js';
import { AppController } from './presentation/controllers/app/app.controller.js';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: join(process.cwd(), 'src/presentation/generated/schema.gql'),
      autoSchemaFile: true,
      sortSchema: true,
      playground: true,
      introspection: true
    })
  ],
  controllers: [AppController],
  providers: [PrismaService, ProfileResolver, SkillResolver, ExperienceResolver, ProjectResolver]
})
export class AppModule { }
