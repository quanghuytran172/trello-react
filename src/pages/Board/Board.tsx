import { DashOutlined, UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import boardApi from "../../api/boardApi";
import { addBoard } from "../../app/boards/BoardSlice";
import { RootState, useAppDispatch } from "../../app/store";
import Header from "../../components/Header/Header";
import BoardNameInline from "../../components/InlineEdit/BoardNameInline";
import { Board as BoardType, User } from "../../app/types/index";
import BoardMenu from "../../components/Board/BoardMenu";
import BoardContent from "../../components/Board/BoardContent/BoardContent";
import columnApi from "../../api/columnApi";
import { setColumns } from "../../app/columns/ColumnSlice";
import { mapOrder } from "../../utilities/sortArr";
import cardApi from "../../api/cardApi";
import { setCard } from "../../app/cards/CardSlice";
import InviteMembers from "../../components/Modals/InviteMembers";
import userApi from "../../api/userApi";

const BoardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 44px);
    position: relative;
`;

const BoardMainWrapper = styled.div`
    flex-grow: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;
const BoardTop = styled.div`
    max-width: 100%;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    body {
        background-color: red;
    }
    input {
        height: 32px;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        display: block;
    }
    .board-name {
        flex: 1;
        display: flex;
        align-items: center;
        .add-member {
            margin-left: 10px;
        }
        .ant-divider {
            background-color: white;
        }
    }
    .board-menu {
        height: 32px;
    }
`;

const ShowMenuButton = styled.button`
    display: flex;
    align-items: center;
    height: 32px;
    font-size: 14px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    color: #fff;
    background-color: #fff6;
    padding: 10px;
    &:hover {
        background-color: #ffffff52;
    }
    .show-title {
        margin-left: 8px;
    }
`;

const Board: React.FC = () => {
    const [isVisibleBoardMenu, setIsVisibleBoardMenu] = useState(false);
    const [isVisibleInviteModal, setIsVisibleInviteModal] = useState(false);

    const [currentMember, setCurrentMember] = useState([]);
    const [boardCurrent, setBoardCurrent] = useState<BoardType>();
    const { boards } = useSelector((state: RootState) => state.boards);
    const {
        user: { uuidUser },
    } = useSelector((state: RootState) => state.auth);

    let { id } = useParams();
    const dispatch = useAppDispatch();
    const history = useNavigate();

    const showDrawer = () => {
        setIsVisibleBoardMenu(true);
    };
    useEffect(() => {
        const checkParamsGetBoard = async () => {
            let findBoard = boards.find(
                (board: BoardType) =>
                    board.boardId.toString() === id?.toString()
            );

            if (!findBoard) {
                //call API get board by id
                try {
                    const response: any = await boardApi.getBoardById(
                        id?.toString()
                    );
                    if (response.length > 0) {
                        if (response[0].accessId.includes(uuidUser)) {
                            findBoard = response[0];
                            dispatch(addBoard(findBoard));
                        } else {
                            alert(
                                "You don't have permission to access this board"
                            );
                        }
                    } else {
                        history("/notfound");
                    }
                } catch (error) {
                    alert(error);
                }
            }

            window.history.replaceState(
                null,
                "New Page Title",
                `/b/${id}/${findBoard.name}`
            );
            setBoardCurrent(findBoard);
            document.body.style.backgroundImage = `url(${findBoard?.imageURL})`;
        };

        checkParamsGetBoard();
    }, [dispatch, boardCurrent, history, boards, id, uuidUser]);

    useEffect(() => {
        const fetchCurrentMember = async () => {
            try {
                const response: any = await userApi.getAllUser();
                const currentMemberFilter = response.filter((user: User) =>
                    boardCurrent?.accessId.includes(user.uuidUser)
                );
                setCurrentMember(currentMemberFilter);
            } catch (error) {
                alert(error);
            }
        };
        const fetchColumn = async (boardId: String) => {
            try {
                const response = await columnApi.getAllColumnByBoardId(
                    boardId.toString()
                );
                dispatch(
                    setColumns(
                        mapOrder(response, boardCurrent?.listOrder, "id")
                    )
                );
            } catch (error) {
                alert(error);
            }
        };

        const fetchCard = async (boardId: String) => {
            try {
                const response = await cardApi.getAllCardByBoardId(
                    boardId.toString()
                );
                dispatch(setCard(response));
            } catch (error) {
                alert(error);
            }
        };

        //call api get list,card
        if (
            boardCurrent &&
            boardCurrent.id &&
            boardCurrent.accessId.includes(uuidUser)
        ) {
            fetchCurrentMember();
            fetchColumn(boardCurrent.id);
            fetchCard(boardCurrent.id);
        }
    }, [dispatch, boardCurrent, uuidUser]);
    return (
        <>
            <Header />
            {boardCurrent && (
                <BoardWrapper>
                    <BoardMainWrapper>
                        <BoardTop>
                            <div className='board-name'>
                                <BoardNameInline boardCurrent={boardCurrent} />
                                <Divider type='vertical' />

                                <Avatar.Group
                                    maxCount={2}
                                    maxStyle={{
                                        color: "#f56a00",
                                        backgroundColor: "#fde3cf",
                                    }}
                                >
                                    {currentMember.map((member: User) => (
                                        <Tooltip
                                            title={member.displayName}
                                            key={member.uuidUser.toString()}
                                        >
                                            <Avatar src={member.photoURL}>
                                                {member.photoURL
                                                    ? ""
                                                    : member.displayName
                                                          ?.charAt(0)
                                                          ?.toUpperCase()}
                                            </Avatar>
                                        </Tooltip>
                                    ))}
                                </Avatar.Group>
                                <Button
                                    type='primary'
                                    className='add-member'
                                    onClick={() => {
                                        setIsVisibleInviteModal(true);
                                    }}
                                >
                                    <UserAddOutlined />
                                    Invite
                                </Button>
                            </div>

                            <div className='board-menu'>
                                <ShowMenuButton onClick={showDrawer}>
                                    <DashOutlined />
                                    <span className='show-title'>
                                        Show menu
                                    </span>
                                </ShowMenuButton>
                            </div>
                            <BoardMenu
                                visible={isVisibleBoardMenu}
                                setVisible={setIsVisibleBoardMenu}
                                currentBoard={boardCurrent}
                            />
                        </BoardTop>
                        <BoardContent currentBoard={boardCurrent} />
                    </BoardMainWrapper>
                    <InviteMembers
                        visible={isVisibleInviteModal}
                        setVisible={setIsVisibleInviteModal}
                        currentBoard={boardCurrent}
                    />
                </BoardWrapper>
            )}
        </>
    );
};

export default Board;
