import { Form, Select, Spin, Modal } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import * as _ from "lodash";
import React, { useState } from "react";
import boardApi from "../../api/boardApi";
import userApi from "../../api/userApi";
import { updateAccessId } from "../../app/boards/BoardSlice";
import { useAppDispatch } from "../../app/store";
function DebounceSelect({
    fetchOptions,
    debounceTimeout = 300,
    curMembers,
    ...props
}: any) {
    // Search: abcddassdfasdf

    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value: any) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, curMembers).then((newOptions: any) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return _.debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions, curMembers]);

    React.useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);

    return (
        <Select
            filterOption={false}
            onSearch={debounceFetcher}
            onBlur={() => {
                setOptions([]);
            }}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}
        >
            {options.map((opt: any) => (
                <Select.Option
                    key={opt.id}
                    value={opt.uuidUser}
                    title={opt.displayName}
                >
                    <Avatar size='small' src={opt.photoURL}>
                        {opt.photoURL
                            ? ""
                            : opt.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${opt.displayName}`}
                </Select.Option>
            ))}
        </Select>
    );
}

async function fetchUserList(search: any, curMembers: any) {
    if (search) {
        return userApi.searchEmailUser(search).then((res: any) => {
            const newList = res.filter(
                (user: any) => !curMembers.includes(user.uuidUser)
            );
            console.log(newList);
            return newList;
        });
    }
    return [];
}
const InviteMembers = ({ visible, setVisible, currentBoard }: any) => {
    const [value, setValue] = useState([]);
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const handleOk = () => {
        // reset form value
        form.resetFields();
        setValue([]);
        if (value.length > 0) {
            const newAccessIdList = [...currentBoard.accessId, ...value];
            boardApi
                .updateBoard(currentBoard.id, {
                    accessId: newAccessIdList,
                })
                .then((res) => {
                    dispatch(
                        updateAccessId({
                            id: currentBoard.id,
                            data: newAccessIdList,
                        })
                    );
                    setVisible(false);
                })
                .catch((err) => alert(err));
        }
    };

    const handleCancel = () => {
        // reset form value
        form.resetFields();
        setValue([]);
        setVisible(false);
    };

    return (
        <div>
            <Modal
                title='Invite member to this board'
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode='multiple'
                        name='search-user'
                        value={value}
                        placeholder="Enter the members' names"
                        fetchOptions={fetchUserList}
                        onChange={(newValue: any) => setValue(newValue)}
                        style={{ width: "100%" }}
                        curMembers={currentBoard.accessId}
                    />
                </Form>
            </Modal>
        </div>
    );
};

export default InviteMembers;
