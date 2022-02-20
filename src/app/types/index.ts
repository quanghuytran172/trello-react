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
export type Column = {
    boardId: String;
    name: String;
    id: String | null;
    cardOrder: String[];
};

export type Card = {
    id: String | null;
    createdAt: Date;
    name: String;
    description: String;
    listId: String;
    boardId: String;
};
