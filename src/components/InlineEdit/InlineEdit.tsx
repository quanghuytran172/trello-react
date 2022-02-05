import { useRef, useState } from "react";
import styled from "styled-components";
import boardApi from "../../api/boardApi";
import { updateBoardName } from "../../app/boards/BoardSlice";
import { useAppDispatch } from "../../app/store";

const InputStyle = styled.input`
    background-color: #fff6;
    border: 0;
    border-radius: 3px;
    padding: 8px 12px;
    max-width: 250px;
    &:hover {
        background-color: #ffffff52;
        cursor: pointer;
    }

    &:focus {
        background-color: #fff;
        color: #172b4d;
        outline: 0;
        box-shadow: inset 0 0 0 2px #0079bf;
        cursor: auto;
    }
`;

const InlineEdit = ({ value, setState }: any) => {
    const [editingValue, setEditingValue] = useState(value.name);
    const dispatch = useAppDispatch();

    let width = (editingValue.length + 10) * 8;
    const inputRef = useRef<HTMLInputElement>(null);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditingValue(event.target.value);
    };

    const onKeyDown = (event: React.KeyboardEvent<any>) => {
        if (event.key === "Enter" || event.key === "Escape") {
            if (inputRef.current !== null) {
                inputRef.current.blur();
            }
        }
    };

    const onBlur = async (event: React.ChangeEvent<HTMLInputElement>) => {
        let newName = event.target.value;
        if (newName !== value.name) {
            try {
                const response: any = await boardApi.updateNameBoard(value.id, {
                    name: newName,
                });
                dispatch(
                    updateBoardName({
                        id: value.boardId,
                        data: response.name,
                    })
                );
                setEditingValue(newName);
            } catch (error) {
                alert(error);
            }
        }
    };

    return (
        <InputStyle
            type='text'
            ref={inputRef}
            aria-label='Field name'
            value={editingValue}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            style={{ width: width + "px" }}
        />
    );
};

export default InlineEdit;
