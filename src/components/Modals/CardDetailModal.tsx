import {
    AlignLeftOutlined,
    CloseOutlined,
    CreditCardOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import cardApi from "../../api/cardApi";
import {
    removeCard,
    updateCardDescription,
    updateCardName,
} from "../../app/cards/CardSlice";
import { useAppDispatch } from "../../app/store";
import InlineEdit from "../InlineEdit/InlineEdit";

const CardTitle = styled.div`
    display: flex;
    width: 95%;
    color: #172b4d;
    textarea {
        font-size: 18px;
    }
    span {
        font-size: 20px;
        display: flex;
        justify-content: center;
        height: 32px;
        width: 32px;
    }
    .card-title {
        flex-grow: 1;
        div {
            margin-left: 8px;
        }
    }
`;
const CardMain = styled.div`
    display: flex;
    margin-top: 30px;
    color: #172b4d;
    gap: 16px;
    button {
        align-items: center;
        background-color: #091e420a;
        border: none;
        border-radius: 3px;
        box-shadow: none;
        box-sizing: border-box;
        color: #172b4d;
        cursor: pointer;
        display: inline-flex;
        font-size: 14px;
        font-weight: 400;
        justify-content: center;
        line-height: 20px;
        padding: 6px 12px;
        text-decoration: none;
        transition-duration: 85ms;
        transition-property: background-color, border-color, box-shadow;
        transition-timing-function: ease;
        white-space: normal;
    }
    .card-description {
        width: 75%;

        .title {
            display: flex;
            align-items: center;
            margin-bottom: 16px;
            button {
                margin-left: 6px;
                &:hover {
                    background-color: #091e4214;
                }
            }
            span {
                font-size: 20px;
                width: 32px;
                height: 32px;
                line-height: 32px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 6px;
            }

            h3,
            div {
                font-size: 16px;
                color: #172b4d;
                margin: 0;
            }
        }
        .main-content {
            margin-left: 36px;

            .description-fake-text-area {
                background-color: #091e420a;
                border-radius: 3px;
                display: block;
                min-height: 40px;
                padding: 8px 12px;
                font-size: 14px;
                cursor: pointer;
                &:hover {
                    background-color: #091e4214;
                    color: #091e42;
                }
            }
            .description-content {
                cursor: pointer;
            }
            .description-edit {
                width: 100%;
                textarea {
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    overflow-wrap: break-word;
                    resize: none;
                    height: 108px;
                    background: #fff;
                    box-shadow: none;
                    min-height: 108px;
                    border: none;
                    border-radius: 3px;
                    box-shadow: inset 0 0 0 2px #dfe1e6;
                    box-sizing: border-box;
                    display: block;
                    line-height: 20px;
                    margin-bottom: 12px;
                    outline: none;
                    padding: 8px 12px;
                    transition-duration: 85ms;
                    transition-property: background-color, border-color,
                        box-shadow;
                    transition-timing-function: ease;
                    box-shadow: inset 0 0 0 2px #0079bf;
                    font-size: 14px;
                    color: #172b4d;
                }
                .edit-action {
                    display: flex;
                    align-items: center;

                    .save-action {
                        background-color: #0079bf;
                        border: none;
                        box-shadow: none;
                        color: #fff;
                        cursor: pointer;
                        margin-right: 4px;
                        &:hover {
                            background-color: #026aa7;
                            border: none;
                            box-shadow: none;
                            color: #fff;
                        }
                        &:active {
                            background-color: #055a8c;
                        }
                    }
                    .close-action {
                        color: #42526e;
                        border: none;
                        cursor: pointer;
                        text-decoration: none;
                        background-color: transparent;
                        font-size: 20px;
                        height: 32px;
                        line-height: 32px;
                        width: 32px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        &:hover {
                            color: #172b4d;
                        }
                    }
                }
            }
        }
    }
    .card-sidebar-action {
        width: 25%;
        p {
            margin-bottom: 10px;
        }
        .action-box {
            display: block;
            .action-item {
                width: 100%;
                justify-content: flex-start;
                span {
                    margin-right: 8px;
                }
                &:hover {
                    background-color: #091e4214;
                }
            }
        }
    }
`;

const CardDetailModal = ({
    card,
    columnName,
    isCardDetailOpen,
    setIsCardDetailOpen,
}: any) => {
    const [cardNameInput, setCardNameInput] = useState("");
    const inputHeaderRef = useRef<HTMLTextAreaElement>(card.name);
    const descriptionRef = useRef<HTMLTextAreaElement>(card.description);
    const [descriptionState, setDescriptionState] = useState("");
    const [isEditingCardName, setIsEditingCardName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        setCardNameInput(card.name);
    }, [card.name]);

    useEffect(() => {
        setDescriptionState(card.description);
    }, [card.description]);
    const handleCardTitleChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsEditingCardName(!isEditingCardName);
        let newName = event.target.value;
        if (newName === "") {
            newName = card.name;
            setCardNameInput(newName);
        }
        if (newName !== card.name) {
            //update column name
            setCardNameInput(newName);
            cardApi
                .updateCard(card.id, {
                    name: newName,
                })
                .then(() => {
                    dispatch(
                        updateCardName({
                            id: card.id,
                            data: newName,
                        })
                    );
                })
                .catch((err) => {
                    alert(err);
                    setCardNameInput(card.name);
                });
        }
    };

    const openTextArea = () => {
        setIsEditingDescription(true);
        setTimeout(() => {
            descriptionRef.current.select();
        }, 1);
    };

    const onHandleSaveDescription = () => {
        if (descriptionRef.current.value !== card.description) {
            cardApi
                .updateCard(card.id, {
                    description: descriptionRef.current.value,
                })
                .then((res: any) => {
                    dispatch(
                        updateCardDescription({
                            id: card.id,
                            data: res.description,
                        })
                    );
                });
        }

        setDescriptionState(card.description);
        setIsEditingDescription(false);
    };

    const onHandleDeleteCard = () => {
        Modal.confirm({
            title: "Are you sure ?",
            icon: <ExclamationCircleOutlined />,
            content: "This card will be deleted",
            okText: "Delete",
            cancelText: "Cancel",
            onOk: () => {
                cardApi.deleteCard(card.id).then((res: any) => {
                    dispatch(removeCard(card.id));
                });
            },
        });
    };

    return (
        <>
            <Modal
                onCancel={() => {
                    setIsCardDetailOpen(false);
                    setIsEditingDescription(false);
                    setDescriptionState(card.description);
                }}
                destroyOnClose={true}
                footer={null}
                visible={isCardDetailOpen}
                width={768}
            >
                <CardTitle>
                    <CreditCardOutlined />
                    <div className='card-title'>
                        <InlineEdit
                            inputHeaderRef={inputHeaderRef}
                            onBlur={handleCardTitleChange}
                            setValue={setCardNameInput}
                            value={cardNameInput}
                        />
                        <div>
                            in list <u>{columnName}</u>
                        </div>
                    </div>
                </CardTitle>

                <CardMain>
                    <div className='card-description'>
                        <div className='title'>
                            <AlignLeftOutlined />
                            <h3>Description</h3>
                            {!isEditingDescription &&
                                card.description.length > 0 && (
                                    <button onClick={openTextArea}>Edit</button>
                                )}
                        </div>

                        <div className='main-content'>
                            {card.description.length <= 0 &&
                                !isEditingDescription && (
                                    <div
                                        className='description-fake-text-area'
                                        onClick={openTextArea}
                                    >
                                        Add a more detailed description…
                                    </div>
                                )}

                            {isEditingDescription ? (
                                <div className='description-edit'>
                                    <textarea
                                        placeholder='Add a more detailed description…'
                                        value={descriptionState}
                                        onChange={(e) => {
                                            setDescriptionState(e.target.value);
                                        }}
                                        ref={descriptionRef}
                                    ></textarea>
                                    <div className='edit-action'>
                                        <button
                                            className='save-action'
                                            onClick={onHandleSaveDescription}
                                        >
                                            Save
                                        </button>
                                        <CloseOutlined
                                            className='close-action'
                                            onClick={() => {
                                                setIsEditingDescription(false);
                                                setDescriptionState(
                                                    card.description
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className='description-content'
                                    dir='auto'
                                    onClick={openTextArea}
                                >
                                    {card.description}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='card-sidebar-action'>
                        <p>Actions</p>
                        <div className='action-box'>
                            <button
                                className='action-item'
                                onClick={onHandleDeleteCard}
                            >
                                <DeleteOutlined />
                                Delete card
                            </button>
                        </div>
                    </div>
                </CardMain>
            </Modal>
        </>
    );
};

export default CardDetailModal;
