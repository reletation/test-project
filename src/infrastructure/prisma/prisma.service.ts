import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "./generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            log: ['query'],
            adapter: new PrismaPg(
                { connectionString: process.env['DATABASE_URL']! }
            )
        })
    }

    async onModuleInit() { await this.$connect(); }
    async onModuleDestroy() { await this.$disconnect(); }

}