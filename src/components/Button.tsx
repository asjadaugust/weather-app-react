import styled from "styled-components"

interface ButtonProps {
    primary?: boolean;
    onSubmit?: (e: React.MouseEvent) => void
}

export const Button = styled.button<ButtonProps>`
    background: ${props => props.primary ? "blue":"white"};
    color: ${props => props.primary ? "white" : "blue"};
    font-size: 1em;
    padding: 0.25em 1em;
    border: 1px solid blue;
    border-radius: 3px;
`;

