import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import styled from "styled-components";
import Column from "../../Column/Column";

const BoardContainerWrapper = styled.div`
    position: relative;
    height: calc(100% - 62px);
    #board {
        bottom: 0;
        left: 0;
        margin-bottom: 8px;
        overflow-x: auto;
        overflow-y: hidden;
        padding-bottom: 8px;
        position: absolute;
        right: 0;
        top: 0;
        padding-left: 8px;
        -webkit-user-select: none;
        user-select: none;
        white-space: nowrap;
    }

    #board::-webkit-scrollbar-track {
        border-radius: 6px;
    }

    #board::-webkit-scrollbar {
        width: 12px;
        height: 12px;
    }
    #board::-webkit-scrollbar-thumb {
        border-radius: 6px;

        background-color: #ffffff6e;
    }
    #board::-webkit-scrollbar-track-piece {
        background: #00000026;
    }

    #board::-webkit-scrollbar-button {
        display: block;
    }
`;

const BoardContainer = styled.div`
    display: flex;
    .column-drop-preview {
        background-color: rgba(10, 10, 15, 0.39);
        margin: 0 4px;
        border-radius: 3px;
        z-index: -1;
    }

    .smooth-dnd-container {
        overflow-y: auto;
        height: fit-content;
        &::-webkit-scrollbar-track {
            border-radius: 6px;
        }

        &::-webkit-scrollbar {
            width: 8px;
        }
        &::-webkit-scrollbar-thumb {
            background: #091e4214;
            border-radius: 6px;
        }
        &::-webkit-scrollbar-track-piece {
            background: #091e4214;
            border-radius: 6px;
        }
    }
`;

const AddColumnWrapper = styled.div`
    margin: 0 6px 0 4px;
`;
const AddColumnButton = styled.div`
    display: flex;
    align-items: center;
    width: 272px;
    color: #fff;
    background-color: #ffffff3d;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 8px 12px;
    min-width: 100% !important;
    min-height: 32px;
    cursor: pointer;
    span {
        margin-right: 6px;
    }
`;

const FormAddColumn = styled.div`
    background-color: #ebecf0;
    padding: 5px;
    border-radius: 3px;
    width: 272px;

    input {
        background-color: #fff;
        box-shadow: inset 0 0 0 2px #0079bf;
        display: block;
        margin: 0;
        transition: margin 85ms ease-in, background 85ms ease-in;
        width: 100%;
        -webkit-appearance: none;
        background-color: #fafbfc;
        border: none;
        border-radius: 3px;
        box-sizing: border-box;
        display: block;
        line-height: 20px;
        margin-bottom: 6px;
        outline: none;
        padding: 8px 12px;
        transition-duration: 85ms;
        transition-property: background-color, border-color, box-shadow;
        transition-timing-function: ease;
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

const BoardContent = () => {
    const [addColumnButton, setAddColumnButton] = useState(false);
    const inputRef = useRef<any>();

    const [columns, setColumns] = useState([
        {
            boardId: "boardId 2",
            name: "Mae Barton1",
            listId: "1",
            cardOrder: [],
        },

        {
            boardId: "boardId 3",
            name: "Mae Barton3",
            listId: "1",
            cardOrder: [],
        },
        {
            boardId: "boardId 3",
            name: "Mae Barton3",
            listId: "1",
            cardOrder: [],
        },
        {
            boardId: "boardId 3",
            name: "Mae Barton3",
            listId: "1",
            cardOrder: [],
        },
        {
            boardId: "boardId 3",
            name: "Mae Barton3",
            listId: "1",
            cardOrder: [],
        },
        {
            boardId: "boardId 3",
            name: "Mae Barton3",
            listId: "1",
            cardOrder: [],
        },
        {
            boardId: "boardId 3",
            name: "Mae Barton3",
            listId: "1",
            cardOrder: [],
        },
        {
            boardId: "boardId 3",
            name: "Mae Barton3",
            listId: "1",
            cardOrder: [],
        },
        {
            boardId: "boardId 3",
            name: "Mae Barton3",
            listId: "1",
            cardOrder: [],
        },
    ]);

    const onColumnDrop = (dropResult: any) => {
        console.log(dropResult);
    };

    const onHandleAddColumn = () => {
        if (inputRef.current.value !== "") {
            console.log(inputRef.current.value);
            inputRef.current.value = "";
            //Handle data
        }
        inputRef.current.focus();
    };

    const onKeyDownHandle = (event: React.KeyboardEvent<any>) => {
        if (event.key === "Enter") {
            if (inputRef.current.value) {
                onHandleAddColumn();
                return;
            }
        }

        if (event.key === "Escape") {
            setAddColumnButton(false);
        }
    };
    return (
        <BoardContainerWrapper>
            <BoardContainer
                id='board'
                className='collapsed-workspace-nav u-fancy-scrollbar'
            >
                <Container
                    orientation='horizontal'
                    onDrop={onColumnDrop}
                    getChildPayload={(index) => columns[index]}
                    dragHandleSelector='.column-drag-handle'
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: "column-drop-preview",
                    }}
                >
                    {columns.map((column, index) => (
                        <Draggable key={index}>
                            <Column column={column} />
                        </Draggable>
                    ))}
                </Container>
                <AddColumnWrapper>
                    {!addColumnButton ? (
                        <AddColumnButton
                            onClick={() => {
                                setAddColumnButton(true);
                                setTimeout(() => {
                                    inputRef.current.focus();
                                }, 1);
                            }}
                        >
                            <PlusOutlined />
                            Add another list
                        </AddColumnButton>
                    ) : (
                        <FormAddColumn>
                            <input
                                name='column'
                                id='1'
                                spellCheck='false'
                                ref={inputRef}
                                placeholder='Enter a title for this card'
                                onKeyDown={onKeyDownHandle}
                            ></input>
                            <div className='button-action'>
                                <button
                                    className='btn-card add-card-btn'
                                    onClick={onHandleAddColumn}
                                >
                                    Add list
                                </button>
                                <button
                                    className='btn-card close-form'
                                    onClick={() => {
                                        setAddColumnButton(false);
                                    }}
                                >
                                    <CloseOutlined />
                                </button>
                            </div>
                        </FormAddColumn>
                    )}
                </AddColumnWrapper>
            </BoardContainer>
        </BoardContainerWrapper>
    );
};

export default BoardContent;
