import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service.js';
import { UserService } from './user/user.service.js';

@Controller()
export class AppController {
  private readonly _appService: AppService;
  private readonly _userService: UserService;

  constructor(
    appService: AppService,
    userService: UserService) {

    this._appService = appService;
    this._userService = userService;

  }

  @Get()
  getHello(): string {
    return this._appService.getHello();
  }

  @Get('userById/:tabid')
  async getUser(@Param('tabid') tabid: string): Promise<string> {

    const user = await this._userService.findbyTabId(tabid);

    return user?.DEPARTMENT_RU ?? '';
  }
}
