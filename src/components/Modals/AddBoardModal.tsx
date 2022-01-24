import { Input } from "antd";
import { Form } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { addBoard, toggleAddModal } from "../../app/boards/BoardSlice";
import { useState } from "react";
import boardApi from "../../api/boardApi";
import shortid from "shortid";

const AddBoardModal = () => {
    const [form] = Form.useForm();
    const { isModalVisible } = useSelector((state: RootState) => state.boards);
    const { user } = useSelector((state: RootState) => state.auth);

    const [titleInput, setTitleInput] = useState("");
    const dispatch = useAppDispatch();
    const handleOk = async () => {
        if (titleInput) {
            try {
                const date = new Date();
                const newBoard = {
                    boardId: shortid.generate(),
                    userId: user.userId,
                    name: titleInput,
                    createdAt: date,
                    accessId: [],
                    imageURL:
                        "https://media.istockphoto.com/photos/kids-jumping-and-running-at-home-during-the-covid19-pandemic-picture-id1309632440?b=1&k=20&m=1309632440&s=170667a&w=0&h=d0x-ZqV8bwPM9xxaNcNScAACT0Igd1MCTcq9KsKTyHU=",
                };
                const response = await boardApi.createBoard(newBoard);
                dispatch(addBoard(response));
                form.resetFields();
            } catch (error) {
                alert(error);
            }
            dispatch(toggleAddModal(false));
        }
    };

    const handleCancel = () => {
        form.resetFields();
        dispatch(toggleAddModal(false));
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleInput(event.target.value);
    };

    return (
        <>
            <Modal
                title='Add board'
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical' autoComplete='off'>
                    <Form.Item name='url' label='Title'>
                        <Input
                            placeholder='Your board title'
                            value={titleInput}
                            onChange={onInputChange}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddBoardModal;
