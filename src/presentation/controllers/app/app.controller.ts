import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {

    @Get()
    rootResult() {
        return 'Nest js is worked';
    }

}
