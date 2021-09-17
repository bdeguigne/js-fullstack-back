/// <reference types="mongoose" />
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("../schema/user.schema").User & Document & import("mongoose").Document<any, any, import("../schema/user.schema").UserDocument>>;
    findAll(): Promise<(import("../schema/user.schema").User & Document & import("mongoose").Document<any, any, import("../schema/user.schema").UserDocument>)[]>;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
