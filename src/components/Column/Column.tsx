/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Container, Draggable } from "react-smooth-dnd";
import Card from "../Card/Card";
import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import InlineEdit from "../InlineEdit/InlineEdit";
import { applyDrag } from "../../utilities/dragDrop";
import columnApi from "../../api/columnApi";
import { RootState, useAppDispatch } from "../../app/store";
import {
    updateCardOrder,
    updateColumnName,
} from "../../app/columns/ColumnSlice";
import { useSelector } from "react-redux";
import { Card as CardType } from "../../app/types";
import { addCard, updateListId } from "../../app/cards/CardSlice";
import { mapOrder } from "../../utilities/sortArr";
import cardApi from "../../api/cardApi";

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
    margin: 0 5px 5px 5px;
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
const Column = ({ column, deleteColumn }: any) => {
    const [addCardButton, setAddCardButton] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [columnNameInput, setColumnNameInput] = useState("");
    const [cardsByColumn, setCardsByColumn] = useState([]);
    const inputHeaderRef = useRef<HTMLTextAreaElement>(column.name);
    const addCardRef = useRef<any>(null);
    const dispatch = useAppDispatch();
    const { cards } = useSelector((state: RootState) => state.cards);

    useEffect(() => {
        let cardByColumn = cards.filter((c: any) => c.listId === column.id);
        cardByColumn = mapOrder(cardByColumn, column.cardOrder, "id");
        setCardsByColumn(cardByColumn);
    }, [cards, column.cardOrder, column.id]);
    const onCardDrop = async (columnId: any, dropResult: any) => {
        if (
            dropResult.removedIndex !== null ||
            dropResult.addedIndex !== null
        ) {
            let newCards = [...cardsByColumn];
            newCards = applyDrag(newCards, dropResult);
            const newCardOrder = newCards.map((i: any) => i.id);
            dispatch(
                updateCardOrder({
                    id: columnId,
                    data: newCardOrder,
                })
            );

            if (
                dropResult.removedIndex !== null &&
                dropResult.addedIndex !== null
            ) {
                //Move insite list (update cardOrder)
                columnApi
                    .updateColumn(columnId, {
                        cardOrder: newCardOrder,
                    })
                    .then(() => {})
                    .catch(() => {
                        setCardsByColumn(cardsByColumn);
                    });
            } else {
                //Move outsite list (update columnId,cardOrder)
                if (dropResult.addedIndex !== null) {
                    try {
                        dispatch(
                            updateListId({
                                id: dropResult.payload.id,
                                data: columnId,
                            })
                        );
                        const cardResponse = await cardApi.updateCard(
                            dropResult.payload.id,
                            {
                                listId: columnId,
                            }
                        );

                        const columnResponse = await columnApi.updateColumn(
                            columnId,
                            {
                                cardOrder: newCardOrder,
                            }
                        );
                    } catch (error) {
                        setCardsByColumn(cardsByColumn);
                    }
                }
            }
        }
    };

    const onHandleAddCard = () => {
        if (addCardRef.current.value === "") {
            setAddCardButton(false);
            return;
        }
        const date = new Date();
        const newCard: CardType = {
            id: null,
            name: addCardRef.current.value,
            description: "",
            listId: column.id,
            boardId: column.boardId,
            createdAt: date,
        };
        cardApi
            .createCard(newCard)
            .then((cardResponse: any) => {
                let newCards = [...cardsByColumn];
                const newCardOrder = newCards.map((i: any) => i.id);
                newCardOrder.push(cardResponse.id);
                columnApi
                    .updateColumn(column.id, {
                        cardOrder: newCardOrder,
                    })
                    .then(() => {
                        dispatch(addCard(cardResponse));
                        dispatch(
                            updateCardOrder({
                                id: column.id,
                                data: newCardOrder,
                            })
                        );
                        addCardRef.current.value = "";
                        addCardRef.current.style.height = "0px";
                        addCardRef.current.focus();
                    })
                    .catch((err) => alert(err));
            })
            .catch((err) => alert(err));

        //Handle data
    };

    const onHandleColumnTitleChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsEditing(!isEditing);
        let newName = event.target.value;
        if (newName === "") {
            newName = column.name;
            setColumnNameInput(newName);
        }
        if (newName !== column.name) {
            //update column name
            setColumnNameInput(newName);
            columnApi
                .updateColumn(column.id, {
                    name: newName,
                })
                .then(() => {
                    dispatch(
                        updateColumnName({
                            id: column.id,
                            data: newName,
                        })
                    );
                })
                .catch((err) => {
                    alert(err);
                    setColumnNameInput(column.name);
                });
        }
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

    useEffect(() => {
        setColumnNameInput(column.name);
    }, [column.name]);
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
                            inputHeaderRef.current.select();
                        }}
                    ></div>
                    <InlineEdit
                        inputHeaderRef={inputHeaderRef}
                        onBlur={onHandleColumnTitleChange}
                        setValue={setColumnNameInput}
                        value={columnNameInput}
                    ></InlineEdit>

                    <button
                        className='button-delete'
                        onClick={() => deleteColumn(column.id)}
                    >
                        <DeleteOutlined />
                    </button>
                </ColumnHeader>
                <Container
                    {...column.props}
                    groupName='column-trello'
                    onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
                    getChildPayload={(index) => cardsByColumn[index]}
                    dragClass='card-ghost'
                    dropClass='card-ghost-drop'
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: "card-drop-preview",
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cardsByColumn.map((card: CardType, index: any) => (
                        <Draggable key={index}>
                            <Card card={card} columnName={column.name} />
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
