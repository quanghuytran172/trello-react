import React, { useEffect } from "react";
import styled from "styled-components";

const TextArea = styled.textarea`
    overflow: hidden;
    overflow-wrap: break-word;
    height: 28px;
    background: transparent;
    border-radius: 3px;
    box-shadow: none;
    font-weight: 600;
    margin: -4px 0;
    max-height: 256px;
    min-height: 20px;
    padding: 4px 8px;
    resize: none;
    outline: none;
    border: none;
    line-height: 20px;
    width: 100%;
    font-size: 14px;
    &:focus {
        background-color: #fff;
        box-shadow: inset 0 0 0 2px #0079bf;
    }
`;

const InlineEdit = ({ inputHeaderRef, onBlur, value, setValue }: any) => {
    const onKeyDown = (event: React.KeyboardEvent<any>) => {
        if (event.key === "Enter" || event.key === "Escape") {
            if (inputHeaderRef.current !== null) {
                inputHeaderRef.current.blur();
            }
        }
    };
    useEffect(() => {
        inputHeaderRef.current.style.height = "0px";
        const scrollHeight = inputHeaderRef.current.scrollHeight;
        inputHeaderRef.current.style.height = scrollHeight + "px";
        if (scrollHeight >= 256) {
            inputHeaderRef.current.style.overflow = "auto";
        }
    }, [value, inputHeaderRef]);
    return (
        <TextArea
            name='inline-edit'
            id='1'
            spellCheck='false'
            onChange={(e) => {
                setValue(e.target.value);
            }}
            value={value}
            ref={inputHeaderRef}
            onBlur={onBlur}
            dir='auto'
            maxLength={512}
            rows={1}
            onKeyDown={onKeyDown}
        ></TextArea>
    );
};

export default InlineEdit;
