import {
    AntDesignOutlined,
    DashOutlined,
    UserAddOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import boardApi from "../../api/boardApi";
import { addBoard } from "../../app/boards/BoardSlice";
import { RootState, useAppDispatch } from "../../app/store";
import Header from "../../components/Header/Header";
import InlineEdit from "../../components/InlineEdit/InlineEdit";
import { Board as BoardType } from "../../app/types/index";
import BoardMenu from "../../components/Board/BoardMenu";
import BoardContent from "../../components/Board/BoardContent/BoardContent";

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
    const { boards } = useSelector((state: RootState) => state.boards);
    const [boardCurrent, setBoardCurrent] = useState<BoardType>();

    let { id } = useParams();
    const dispatch = useAppDispatch();
    const history = useNavigate();

    const showDrawer = () => {
        setIsVisibleBoardMenu(true);
    };
    useEffect(() => {
        const checkParams = async () => {
            let findBoard = boards.find(
                (board: any) => board.boardId.toString() === id?.toString()
            );

            if (!findBoard) {
                //call API get board by id
                try {
                    const response: any = await boardApi.getBoardById(
                        id?.toString()
                    );
                    if (response.length > 0) {
                        findBoard = response[0];
                        dispatch(addBoard(findBoard));
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

        checkParams();

        //call api get list,card
    }, [dispatch, boardCurrent, history, boards, id]);

    return (
        <>
            <Header />
            {boardCurrent && (
                <BoardWrapper>
                    <BoardMainWrapper>
                        <BoardTop>
                            <div className='board-name'>
                                <InlineEdit boardCurrent={boardCurrent} />
                                <Divider type='vertical' />
                                <Avatar.Group
                                    maxCount={2}
                                    maxStyle={{
                                        color: "#f56a00",
                                        backgroundColor: "#fde3cf",
                                    }}
                                >
                                    <Avatar src='https://joeschmoe.io/api/v1/random' />
                                    <Avatar
                                        style={{ backgroundColor: "#f56a00" }}
                                    >
                                        K
                                    </Avatar>
                                    <Tooltip title='Ant User' placement='top'>
                                        <Avatar
                                            style={{
                                                backgroundColor: "#87d068",
                                            }}
                                            icon={<UserOutlined />}
                                        />
                                    </Tooltip>
                                    <Avatar
                                        style={{ backgroundColor: "#1890ff" }}
                                        icon={<AntDesignOutlined />}
                                    />
                                </Avatar.Group>
                                <Button type='primary' className='add-member'>
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

                        <BoardContent />
                    </BoardMainWrapper>
                </BoardWrapper>
            )}
        </>
    );
};

export default Board;
