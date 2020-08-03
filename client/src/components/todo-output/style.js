import styled from 'styled-components'

export const CardStyle=styled.div`
    width:450px;
    display:flex;
    padding-left:8px;
    flex-direction: column;
    align-items: flex-start;
    margin:auto;
    height:auto;
    margin-bottom:10px;
    border-bottom:1px solid ${props=> props.theme.border};

    input{
        border:none;
        background-color:${props => props.theme.background};
        font-family: Arial, Helvetica, sans-serif;
    }

    input:focus{
        outline: none;
    }

    div{
        width:100%;
        display:grid;
        margin-top: 4px;
        grid-template-columns:auto 15ch 2ch;
    }
`;

export const InputDate=styled.input`
    color:gray;
    font-size:12px;
    text-align: end;
`;

export const InputDesc=styled.input`
    font-size:14px;
    color:gray;
    width:95%;
    height:auto;
    margin:0 0 5px 0;
`;

export const InputName=styled.input`
    font-size:18px;
    color: ${props => props.theme.color};
    font-weight: bold;
    text-align: start;
`;

export const ButtonRemove=styled.button`
    font-size:18px;
    color: #dc3545;
    background: none;
    border:none;
    cursor: pointer;
    margin-bottom:20px;

    &:focus{
        outline:none;
        color: #af2b38;
    }
`;

