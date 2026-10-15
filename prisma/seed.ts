import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Profile, Project, Resource, Skill, ExperienceAchievement, Experience } from '../src/infrastructure/prisma/generated/client.js';

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool, { schema: 'public' });
const prisma = new PrismaClient({ adapter });

async function main() {

    const now = new Date();

    const profile: Profile = {
        id: 'eac1aa29-9da1-4d34-ac03-0e3735499092',
        name: 'Мельников Владислав Николаевич',
        description: 'Разработчик .NET/C#',
        createdAt: now
    };

    await prisma.profile.upsert({
        where: { id: profile.id },
        create: { ...profile },
        update: { description: profile.description }
    });



    const defaultSkill: Skill = {
        profileId: profile.id,
        createdAt: now,

        id: '',
        name: ''
    }

    const skills: Skill[] = [
        {
            ...defaultSkill,
            id: '4918a9b0-95b3-45b6-9bfa-eb4edb0ac601',
            name: 'ASP.NET',
        },
        {
            ...defaultSkill,
            id: 'f3478fd3-03ba-4a1a-a7c3-21ca866e9093',
            name: 'WPF',
        },
        {
            ...defaultSkill,
            id: 'b29440f8-35f4-405c-87e3-ad97b2fb3d08',
            name: 'Avalonia'
        },
        {
            ...defaultSkill,
            id: 'aa659e7a-8508-4da8-accd-14bfb10d4313',
            name: 'WinForms'
        },
        {
            ...defaultSkill,
            id: '74f6c44b-b0d6-4645-a974-eaa40685b1a0',
            name: 'Angular(v21+)'
        },
        {
            ...defaultSkill,
            id: 'f2d3eafa-c2e7-4665-b90b-3673b6ea0e11',
            name: 'Gitlab ci/cd'
        },
        {
            ...defaultSkill,
            id: '383c5a73-dca3-4a94-8973-0efcbda94693',
            name: 'Docker'
        },
        {
            ...defaultSkill,
            id: 'c76ef979-a24d-4277-8297-a9206f542cf9',
            name: 'Linux'
        },
        {
            ...defaultSkill,
            id: '57f36b57-5c59-4600-8624-548083767d38',
            name: 'SeaweedFS S3'
        },
        {
            ...defaultSkill,
            id: '2fa96021-e14e-4cd2-90f6-44e3f10a1481',
            name: 'Apache Kafka'
        },
        {
            ...defaultSkill,
            id: 'd68874ec-cbe4-4e99-af15-3193a6bf6c98',
            name: 'PostgreSQL'
        },
        {
            ...defaultSkill,
            id: '126e1a26-9f43-4a56-968e-f8bec7f55021',
            name: 'MSSQL'
        },
        {
            ...defaultSkill,
            id: '533500c1-3f8b-4e46-b3e2-11b0cdc79333',
            name: 'MySQL'
        },
        {
            ...defaultSkill,
            id: 'd5750b6c-1624-442c-aabc-6635d33489d4',
            name: 'Oracle(11g)'
        },
        {
            ...defaultSkill,
            id: 'd2c9072f-df13-4e8f-9f24-b016f2042bed',
            name: 'Git'
        }
    ];

    for (const skill of skills) {
        await prisma.skill.upsert({
            where: { id: skill.id },
            update: {},
            create: { ...skill }
        });
    }

    const resources: Resource[] = [
        {
            id: '351b8d7e-d731-4815-9034-b31fab123395',
            profileId: profile.id,
            name: 'Github',
            Url: 'https://github.com/reletation',
            createdAt: now
        }
    ];

    for (const resource of resources) {
        await prisma.resource.upsert({
            where: { id: resource.id },
            update: {},
            create: { ...resource }
        });
    }

    const experience: Experience =
    {
        id: '0a55da5c-bc29-404e-96b3-ca0e3c1d7d65',
        profileId: profile.id,
        startDate: new Date(2024, 11, 27),
        endDate: null,
        companyName: 'Кордиант Ульяновск',
        positionName: 'младший специалист',
        createdAt: now,
    }

    await prisma.experience.upsert({
        where: { id: experience.id },
        update: {},
        create: { ...experience }
    });

    const defaultExperienceAchievement: ExperienceAchievement = {

        experienceId: experience.id,
        createdAt: now,

        id: '',
        name: '',
        description: ''
    }

    const ExperienceAchievements: ExperienceAchievement[] = [
        {
            ...defaultExperienceAchievement,
            id: '47dd02bf-4c53-4374-9b8e-fb066e986688',
            name: 'Портирование приложения терминала сбора данных отходов производства с Java на WPF',
            description: 'Приложение было сложно поддерживать и обслуживать, отсутстовал понятный процесс доставки обновлении. После портирования данные проблемы были устранены.',
        },
        {
            ...defaultExperienceAchievement,
            id: 'db79b647-7a86-4f83-9ebe-2264d902aef6',
            name: 'Разработка драйвера для работы с весовым оборудованием',
            description: 'Производитель предоставлял неудачный драйвер, который зависел от системного окружения. Проанализировал документацию протокола весов - на их основе разработал кроссплатформенную реализацию драйвера. После разработки стабильность работы весового модуля ПО сильно увеличилась.',
        },
        {
            ...defaultExperienceAchievement,
            id: 'a184d11d-cf0d-4442-abc1-52aa0a3a6078',
            name: 'Доработка скрипта агрегации данных справочника сотрудников предприятия.',
            description: 'Существовал неэффективный и сложно написанный скрипт. Проанализировал, сильно упростил логику, повысил производительность.',
        },
        {
            ...defaultExperienceAchievement,
            id: '0b10d09c-f9be-45bf-a825-434d1153ee68',
            name: 'Развёртка и настройка S3-хранилища',
            description: 'Была потребность в S3-хранилище для хранения файлов разных приложений. Проанализировал существующие решения - выбрал SeaweedFS как наиболее подходящее. После развёртки и окончательной настройки, работать с файлами из кода стало проще.'
        },
    ]

    for (const achievement of ExperienceAchievements) {
        await prisma.experienceAchievement.upsert({
            where: { id: achievement.id },
            update: {},
            create: { ...achievement }
        });
    }

    const projects: Project[] = [
        {
            id: '1b813316-dae0-4e1f-8949-f9c764fbde66',
            profileId: profile.id,
            name: 'test-project',
            url: 'https://github.com/reletation/test-project',
            createdAt: now
        }
    ]

    for (const project of projects) {
        await prisma.project.upsert({
            where: { id: project.id },
            update: {},
            create: { ...project }
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });
