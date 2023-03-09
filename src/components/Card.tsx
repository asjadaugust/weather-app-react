import styled from 'styled-components'

interface CardProps {
    variant: 'dashed' | 'solid'
}

export const Card = styled.section<CardProps>`
    border: ${props => props.variant === "dashed" ?"2px dashed black":"2px solid black"};
    background: ${props => props.variant === "dashed" ?"white":"lightgrey"};
    gap: ${props => props.variant === "dashed" ?"10px":"2px"};
    border-radius: 20px;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-top: 40px;
    padding: 10px;
`