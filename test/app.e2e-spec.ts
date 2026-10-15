import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/infrastructure/prisma/prisma.service';

type GqlResponse<T> = { data?: T; errors?: { message: string }[] };

describe('GraphQL API (e2e)', () => {
  let app: INestApplication<App>;
  let server: App;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const gql = async <T>(query: string): Promise<GqlResponse<T>> => {
    const res = await request(server)
      .post('/graphql')
      .send({ query })
      .expect(200);

    return res.body as GqlResponse<T>;
  };

  it('Возврат заполненных полей', async () => {
    const { data, errors } = await gql<{
      profile: { id: string; name: string }[];
    }>(`{ profile { id name } }`);

    expect(errors).toBeUndefined();
    expect(data!.profile.length).toBeGreaterThan(0);
    expect(data!.profile[0]).toHaveProperty('id');
    expect(data!.profile[0]).toHaveProperty('name');
  });

  it('Возврат опыта работы, с отсутствующей конечной датой', async () => {
    const { data, errors } = await gql<{
      experience: { id: string; endDate: string | null }[];
    }>(`{ experience { id endDate } }`);

    expect(errors).toBeUndefined();
    expect(data!.experience.length).toBeGreaterThan(0);

    const current = data!.experience.find((e) => e.endDate === null);
    expect(current).toBeDefined();
  });

  it('Возврат только запрошенных полей', async () => {
    const prisma = app.get(PrismaService);
    const findMany = vi
      .spyOn(prisma.profile, 'findMany')
      .mockResolvedValue([] as never);

    await gql(`{ profile { id skills { name } } }`);

    expect(findMany).toHaveBeenCalledTimes(1);
    expect(findMany).toHaveBeenCalledWith({
      select: {
        id: true,
        skills: { select: { name: true } },
      },
    });
  });

  it('Возврат вложенной структуры из БД', async () => {
    const { data, errors } = await gql<{
      profile: { name: string; skills: { name: string }[] }[];
    }>(`{ profile { name skills { name } } }`);

    expect(errors).toBeUndefined();
    expect(data!.profile[0].skills.length).toBeGreaterThan(0);
    expect(typeof data!.profile[0].skills[0].name).toBe('string');
  });
});
