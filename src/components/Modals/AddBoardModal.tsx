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
                    uuidUser: user.uuidUser,
                    name: titleInput,
                    createdAt: date,
                    accessId: [],
                    imageURL:
                        "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2106x1600/57727b42ab34b4fef30c3ed8ba4a71f3/photo-1643330683233-ff2ac89b002c.jpg",
                    listOrder: [],
                    id: null,
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
                destroyOnClose={true}
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
