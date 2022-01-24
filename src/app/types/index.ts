export type Card = {};

export type User = {
    userId?: String | null;
    displayName: String | null;
    email: String | null;
    photoURL: String | null;
    uuid: String | null;
};

export type Board = {
    boardId: String;
    userId: String;
    name: String;
    createdAt: Date;
    accessId: String[];
    imageURL: String;
};
