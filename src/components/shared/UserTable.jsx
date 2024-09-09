import { Container, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

const UserTable = ({heading, columns, rows, rowHeight}) => {
  return (
    <Container sx={{
        height: '100vh',
        padding: "1rem"
    }}
    >
        <Paper
        elevation={3}
        sx={{
            padding: '1rem 4rem',
            borderRadius: '1rem',
            margin: 'auto',
            width: '100%',
            height: '100%',
            boxShadow: "none",
            background: 'linear-gradient(145deg, #1a1d28, #161821)',
            color: '#a1b1ff'
        }}
        >
            <Typography
            textAlign={'center'}
                variant='h4'
                sx={{
                    margin: '2rem',
                    textTransform: 'uppercase'
                }}
            >{heading}</Typography>
            <DataGrid rows={rows}
            columns={columns}
            rowHeight={rowHeight}
            style={{
                height: '80%',
                
            }}
            sx={{
                background: '#8493d9',
                border: 'none',
                borderRadius: '20px',
                '.table-header': {
                    bgcolor: 'rgb(47 50 60)',
                    color: '#a1b1ff'
                }
            }}
            />
        </Paper>
    </Container>
  )
}

export default UserTable