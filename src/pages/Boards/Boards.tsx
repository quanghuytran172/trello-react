import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import { Row, Col } from "antd";

import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import styled from "styled-components";
import boardApi from "../../api/boardApi";
import { setBoard, toggleAddModal } from "../../app/boards/BoardSlice";
import BoardItem from "../../components/Board/BoardItem";
import userApi from "../../api/userApi";
import { addUser } from "../../app/auth/AuthSlice";
import AddBoardModal from "../../components/Modals/AddBoardModal";
const BoardContainer = styled.div`
    width: 100%;
    max-width: 1250px;
    margin: 0 auto;
    margin-top: 60px;
    padding: 0 10px;
    .col-item {
        padding: 8px 0;
    }
    h2 {
        color: #5e6c84;
    }
`;

const AddBoardButton = styled.button`
    display: inline-block;
    width: 100%;
    height: 90px;
    background-color: #091e4214;
    border: none;
    border-radius: 3px;

    cursor: pointer;
    .bg-overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        &:hover {
            opacity: 0.7;
        }
        p {
            font-size: 14px;
            color: #172b4d;
            margin: 0;
        }
    }
`;

const Boards: React.FC = () => {
    const history = useNavigate();
    const dispatch = useAppDispatch();
    const {
        user: { email, userId, uuid },
    } = useSelector((state: RootState) => state.auth);
    const boards = useSelector((state: RootState) => state.boards.boards);

    const usePathname = () => {
        const location = useLocation();
        return location.pathname;
    };

    const openAddModal = () => {
        dispatch(toggleAddModal(true));
    };

    const pathName = usePathname();

    useEffect(() => {
        const [userName] = email.split(/(?<=^.+)@(?=[^@]+$)/);
        if (pathName === "/" || !pathName.includes(`/${userName}/boards`)) {
            history(`/${userName}/boards`);
        }
    }, [email, pathName, history]);

    useEffect(() => {
        const fetchBoard = async (id: String) => {
            try {
                const response = await boardApi.getBoardById(id);
                dispatch(setBoard(response));
            } catch (error) {
                alert(error);
            }
        };
        const getUserId = async (uuid: String) => {
            try {
                const response: any = await userApi.getUser(uuid);
                console.log(response[0]);
                dispatch(addUser(response[0]));
            } catch (error) {
                console.log(error);
            }
        };
        if (!userId) {
            getUserId(uuid);
        }
        fetchBoard(userId);
    }, [dispatch, userId, uuid]);

    return (
        <div>
            <Header />
            <BoardContainer>
                <h2>YOUR WORKSPACES</h2>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {boards.map((board: any) => (
                        <Col
                            xs={24}
                            sm={12}
                            xl={4}
                            md={6}
                            className='col-item'
                            key={board.boardId}
                        >
                            <BoardItem
                                board={board}
                                linkTo={`/b/${board.boardId}/${board.name}`}
                            />
                        </Col>
                    ))}

                    <Col xs={24} sm={12} xl={4} md={6} className='col-item'>
                        <AddBoardButton onClick={openAddModal}>
                            <div className='bg-overlay'>
                                <p>Add new board</p>
                            </div>
                        </AddBoardButton>
                    </Col>
                </Row>

                <AddBoardModal />
            </BoardContainer>
        </div>
    );
};

export default Boards;
