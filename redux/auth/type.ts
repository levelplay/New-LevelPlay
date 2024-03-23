export type UserAuthType = {
    token?: string,
    user?: UserType
}
export type UserType = {
    _id: string;
    username: string;
    email: string;
    role: Role;
    provider: string;
    watermark: boolean;
    notification: boolean;
    isVerified: boolean;
    pic: string,
    points: number;
    isFreeCredited: boolean,
    isBlocked: boolean;
    lastActive: string,
    totalSpend: number,
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export enum Role {
    USER = 1,
    ADMIN
}
