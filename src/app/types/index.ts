export type Card = {};

export type User = {
    uuidUser: String;
    displayName: String;
    email: String;
    photoURL: String;
};

export type Board = {
    boardId: String;
    uuidUser: String;
    name: String;
    createdAt: Date;
    accessId: String[];
    imageURL: String;
    listOrder: String[];
    id: String | null;
};
