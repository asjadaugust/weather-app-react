import styled from "styled-components"

interface InputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = styled.input<InputProps>`
    height: 30px;
    type: text
`