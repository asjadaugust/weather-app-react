import styled from 'styled-components'

const TextTitle = styled.h3`
font-size: 18px;
font-family: "Verdana", sans-serif;
`

const TextValue = styled.h3`
font-size: 18px;
font-family: "Verdana", sans-serif;
font-weight: 200;
`

const Wrapper = styled.div`
    border-bottom: 1px dashed black;
    display: flex;
    flex-direction: row;
    justify-content: space-between
`
interface CellProps {
    title: string;
    value: string
}

export const Cell = (props: CellProps) => (
    <Wrapper>
        <TextTitle>{props.title}</TextTitle>
        <TextValue>{props.value}</TextValue>
    </Wrapper>
)