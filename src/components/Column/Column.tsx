import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Container, Draggable } from "react-smooth-dnd";
import Card from "../Card/Card";
import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import InputColumnHeader from "../InlineEdit/InputColumnHeader";

const ColumnWrapper = styled.div`
    box-sizing: border-box;
    display: inline-block;
    height: 100%;
    margin: 0 4px;
    width: 272px;
`;
const ColumnContent = styled.div`
    background-color: #ebecf0;
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: 78vh;
    width: 100% !important;
    padding-right: 4px;
    .card-drop-preview {
        /* background-color: rgba(150, 150, 200, 0.1); */
        border-radius: 3px;
        margin: 0 5px 10px 5px;
    }
    .card-ghost {
        transition: transform 0.18s ease;
        transform: rotateZ(5deg);
    }

    .card-ghost-drop {
        transition: transform 0.18s ease-in-out;
        transform: rotateZ(0deg);
    }
`;
const ColumnHeader = styled.header`
    padding: 10px 8px;
    padding-right: 36px;
    position: relative;
    display: flex;
    align-items: center;
    .list-header-target {
        bottom: 0;
        cursor: pointer;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;

        &.hidden {
            display: none;
        }
    }

    .button-delete {
        all: unset;
        position: absolute;
        right: 4px;
        top: 4px;
        z-index: 1;
        color: #6b778c;
        padding: 6px;
        font-size: 16px;
        height: 20px;
        line-height: 20px;
        width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
            background-color: #091e4214;
            color: #172b4d;
            text-decoration: none;
        }
    }
`;
const AddCardButton = styled.span`
    border-radius: 3px;
    color: #5e6c84;
    display: block;
    flex: 1 0 auto;
    padding: 5px 5px 5px 10px;
    margin: 5px;
    position: relative;
    text-decoration: none;
    -webkit-user-select: none;
    user-select: none;

    cursor: pointer;
    span {
        margin-right: 6px;
    }
    &:hover {
        background-color: #091e4214;
        color: #172b4d;
    }

    &:active {
        background-color: #091e4221;
    }
`;

const FormAddCard = styled.div`
    margin: 0px 5px 10px 5px;
    height: 100%;
    textarea {
        background-color: #fff;
        border-radius: 3px;
        box-shadow: 0 1px 0 #091e4240;
        display: block;
        margin-bottom: 8px;
        max-width: 300px;
        min-height: 20px;

        position: relative;
        z-index: 0;
        padding: 5px 5px 5px 10px;
        font-weight: 400;
        width: 100%;
        min-height: 66px;
        border: none;
        resize: none;
        outline: none;
    }
    .button-action {
        display: flex;
    }

    .btn-card {
        border: none;
        box-shadow: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .add-card-btn {
        background-color: #0079bf;
        color: #fff;
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 3px;
        &:hover {
            background-color: #026aa7;
        }
        &:active {
            background-color: #055a8c;
        }
    }
    .close-form {
        cursor: pointer;
        font-size: 22px;
        height: 32px;
        line-height: 32px;
        width: 32px;
        color: #6b778c;
        &:hover {
            color: #172b4d;
        }
    }
`;
const Column = ({ column }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [columnNameInput, setColumnNameInput] = useState(column.name);

    const inputHeaderRef = useRef<HTMLTextAreaElement>(column.name);

    const addCardRef = useRef<any>(null);

    const [addCardButton, setAddCardButton] = useState(false);
    const [cards, setCards] = useState([
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
        {
            createdAt: "2022-01-25T19:14:09.381Z",
            name: "Angelina DuBuque",
            listId: "listId 2",
            boardId: "boardId 2",
            cardId: "5",
        },
    ]);
    const onCardDrop = (dropResult: any) => {
        console.log(dropResult);
    };

    const onHandleAddCard = () => {
        if (addCardRef.current.value === "") {
            setAddCardButton(false);
            return;
        }
        console.log("Add");
        addCardRef.current.value = "";
        addCardRef.current.style.height = "0px";
        //Handle data
    };

    const onKeyDownHandle = (event: React.KeyboardEvent<any>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (addCardRef.current.value) {
                onHandleAddCard();
                return;
            }
            setAddCardButton(false);
        }

        if (event.key === "Escape") {
            setAddCardButton(false);
        }
    };

    return (
        <ColumnWrapper>
            <ColumnContent>
                <ColumnHeader>
                    <div
                        className={
                            isEditing
                                ? "list-header-target column-drag-handle hidden"
                                : "list-header-target column-drag-handle"
                        }
                        onClick={() => {
                            setIsEditing(!isEditing);
                            inputHeaderRef.current.selectionStart =
                                inputHeaderRef.current.value.length;
                            inputHeaderRef.current.selectionEnd =
                                inputHeaderRef.current.value.length;
                            inputHeaderRef.current.focus();
                        }}
                    ></div>
                    <InputColumnHeader
                        inputHeaderRef={inputHeaderRef}
                        onBlur={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setIsEditing(!isEditing);
                            let newName = event.target.value;
                            if (newName === "") {
                                newName = column.name;
                                setColumnNameInput(column.name);
                            }
                            if (newName !== column.name) {
                                //update column name
                                column.name = newName;
                                console.log(inputHeaderRef.current.value);
                            }
                        }}
                        setValue={setColumnNameInput}
                        value={columnNameInput}
                    ></InputColumnHeader>
                    <button className='button-delete'>
                        <DeleteOutlined />
                    </button>
                </ColumnHeader>
                <Container
                    {...column.props}
                    groupName='column-trello'
                    onDrop={onCardDrop}
                    getChildPayload={(index) => cards[index]}
                    dragClass='card-ghost'
                    dropClass='card-ghost-drop'
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: "card-drop-preview",
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards.map((card, index) => (
                        <Draggable key={index}>
                            <Card card={card} />
                        </Draggable>
                    ))}
                    {addCardButton && (
                        <FormAddCard>
                            <textarea
                                name='column'
                                id='1'
                                spellCheck='false'
                                placeholder='Enter a title for this card'
                                rows={3}
                                ref={addCardRef}
                                onChange={() => {
                                    addCardRef.current.style.height = "0px";
                                    const scrollHeight =
                                        addCardRef.current.scrollHeight;
                                    addCardRef.current.style.height =
                                        scrollHeight + "px";
                                    if (scrollHeight >= 256) {
                                        addCardRef.current.style.overflow =
                                            "auto";
                                    }
                                }}
                                onKeyDown={onKeyDownHandle}
                            ></textarea>
                            <div className='button-action'>
                                <button
                                    className='btn-card add-card-btn'
                                    onClick={onHandleAddCard}
                                >
                                    Add card
                                </button>
                                <button
                                    className='btn-card close-form'
                                    onClick={() => {
                                        setAddCardButton(false);
                                    }}
                                >
                                    <CloseOutlined />
                                </button>
                            </div>
                        </FormAddCard>
                    )}
                </Container>
                {!addCardButton && (
                    <AddCardButton
                        onClick={() => {
                            setAddCardButton(true);
                            setTimeout(() => {
                                addCardRef.current.focus();
                                addCardRef.current.scrollIntoView();
                            }, 1);
                        }}
                    >
                        <PlusOutlined />
                        Add a card
                    </AddCardButton>
                )}
            </ColumnContent>
        </ColumnWrapper>
    );
};

export default Column;
