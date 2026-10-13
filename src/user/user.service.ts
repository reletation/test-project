import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';

@Injectable()
export class UserService {

    async findbyTabId(tabid: string) {
        return await db.orm.public.User.where({ TABID_STR: tabid }).first();
    }
}
