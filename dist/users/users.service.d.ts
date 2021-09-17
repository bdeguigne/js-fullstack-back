import { Model } from "mongoose";
import { UserDocument } from "src/schema/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto): Promise<import("src/schema/user.schema").User & Document & import("mongoose").Document<any, any, UserDocument>>;
    findAll(): Promise<(import("src/schema/user.schema").User & Document & import("mongoose").Document<any, any, UserDocument>)[]>;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
