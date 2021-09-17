import { Schema } from "mongoose";
export declare type UserDocument = User & Document;
export declare class User {
    id: Schema.Types.ObjectId;
    username: string;
}
export declare const UserSchema: Schema<import("mongoose").Document<User, any, any>, import("mongoose").Model<import("mongoose").Document<User, any, any>, any, any>, undefined, {}>;
