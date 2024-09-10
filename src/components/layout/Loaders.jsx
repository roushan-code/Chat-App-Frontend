import { Grid, Skeleton, Stack } from '@mui/material'
import React from 'react'
import HeaderLoader from './HeaderLoader'
import Title from '../shared/Title';
import { BouncingSkeleton } from '../styles/StyledComponents';

export const LayoutLoader = () => {
    return (
        <>
        <Title />
        <HeaderLoader/>
        <Grid container height={"calc(100vh - 3rem)"} >
            <Grid item sm={4} md={3} sx={{
                display: { xs: "none", sm: "block" },
                bgcolor: "rgb(9 10 13)"
            }} height={"100%"} >
                <Skeleton variant='rectangular'height={'calc(100vh - 3rem)'}/>
            </Grid>

            <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"} bgcolor={"rgb(14 16 23)"} borderLeft={'1px solid #202500'}
                    borderRight={'1px solid #202500'}>
            <Stack spacing={'1rem'} bgcolor={'rgb(125 123 123 / 11%)'}>
            {Array.from({length: 7}).map((_, index)=>(
                <Skeleton sx={{
                    bgcolor: 'rgb(1 1 1 / 48%)'
                }} variant='rectangular' key={index} height={'5rem'}/>
            ))}
            </Stack>
            </Grid>

            <Grid
                item
                md={4}
                lg={3}
                sx={{
                    display: { xs: "none", md: "block" },
                    padding: "2rem",
                    bgcolor: "rgb(9 10 13)"
                }}
                height={"calc(100vh - 3rem)"}>
                    <Skeleton variant='rectangular' height={'calc(100vh - 5rem)'}/>
                </Grid>
        </Grid>
        </>
    )
}

export const TypingLoader = ()=>{
return <Stack 
spacing={"0.5rem"}
direction={"row"}
justifyContent={"center"}
padding={"0.5rem"}
>
    <BouncingSkeleton 
    variant='circular' 
    width={15} 
    height={15}
    style={{
        animationDelay: '0.1s'
    }}
    />
    <BouncingSkeleton 
    variant='circular' 
    width={15} 
    height={15}
    style={{
        animationDelay: '0.2s'
    }}
    />
    <BouncingSkeleton 
    variant='circular' 
    width={15} 
    height={15}
    style={{
        animationDelay: '0.4s'
    }}
    />
    <BouncingSkeleton 
    variant='circular' 
    width={15} 
    height={15}
    style={{
        animationDelay: '0.6s',
    }}
    />
</Stack>
}

