import {Skeleton, styled} from '@mui/material'
import { blueGrey, grey } from '@mui/material/colors'
import {Link as LinkComponent} from 'react-router-dom'

export const VisuallyHiddenInput = styled("input")({
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1
})

export const Link = styled(LinkComponent)`
    text-decoration: none;
    color: black;
    padding: 1rem;
    &:hover{
        border-radius: 10px;
        background-color: #40404057;
    }
`

export const InputBox = styled("input")`
width: 100%;
height: 100%;
border: none;
outline: none;
padding: 0 3rem;
border-radius: 1.5rem;
background-color: ${blueGrey}
`;

export const SearchField = styled('input')`
padding: 1rem 1rem;
width: 20vmax;
border: none;
outline: none;
border-radius: 1.5rem;
background-color: #181515;
font-size: 1.1rem;
color: #909090;
`

export const CurveButton = styled('button')`
border-radius: 1.5rem;
padding: 1rem 2rem;
border: none;
outline: none;
cursor: pointer;
background-color: #12151d;
box-shadow: inset 12px 12px 22px #0a0b0f,
            inset -12px -12px 22px #262b3b;
color: #7c7c7c;
font-size: 1.1rem;
&:hover {
background-color: #090a0e;
}`

export const BouncingSkeleton = styled(Skeleton)(()=>({
    backgroundColor: "#31b20a",
    animation: 'bounce 1s infinite',
    '@keyframes bounce': {
        '0%': {
            transform: 'scale(1)'
        },
        '50%': {
            transform: 'scale(1.5)'
        },
        '100%': {
            transform: 'scale(1)'
        }
    }
}))