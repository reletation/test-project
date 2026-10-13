import { Args, Int, Resolver, Query } from "@nestjs/graphql";
import { User } from "./user.model.js";
import { UserService } from "./user.service.js";

@Resolver(() => User)
export class UserResolver {
    private readonly _userService;

    constructor(private userService: UserService) {
        this._userService = userService;
    }

    @Query(() => User)
    async user(@Args('tabid', { type: () => String }) tabid: string) {
        const user = await this._userService.findbyTabId(tabid);

        const response: User = {
            tabid: user?.TABID_STR ?? '',
            name: user?.NAME ?? '',
            position: user?.POSITION_RU ?? ''
        };

        return response;
    }
}