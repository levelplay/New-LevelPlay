import { UserType } from "../auth/type";

export interface dataType {
    chat?: {
        _id: string;
        receiverId: string;
        contactId: string;
        senderId: UserType;
        message: string;
        createdAt: string;
        __v: number;
    }[];
    communityChat?: {
        userId: UserType;
        message: string;
        createdAt: string;
        _id: string;
        __v: number;
    }[];
    data?: {
        contacts: {
            _id: string,
            userId: UserType,
            otherUser: UserType
            createdAt: string,
            __v: number
        }[];
        chats: {
            _id: string;
            receiverId: string;
            contactId: string;
            senderId: string;
            message: string;
            createdAt: string;
            __v: number;
        }[];
    }
}