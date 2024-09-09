import { useInputValidation } from '6pp'
import { Avatar, Button, Container, Grid, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { adminLogin, getAdminDetails } from '../../redux/thunks/admin';



const AdminLogin = () => {

    const {isAdmin} = useSelector(state => state.auth);
    const secretKey = useInputValidation("");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(adminLogin(secretKey.value));
    }

    useEffect(()=>{
        dispatch(getAdminDetails());
    }, [dispatch]);

    if(isAdmin) return <Navigate to="/admin/dashboard"/>;

    return (
        <div
            style={{
                backgroundImage: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}

        >
            <Container component={"main"} maxWidth="xs" sx={{
                height: "100vh",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50px'
            }}>
                <Paper elevation={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 4,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>

                    <Typography variant='h5'>Admin login</Typography>
                    <form style={{
                        width: '100%',
                        marginTop: "1rem"
                    }}
                        onSubmit={submitHandler}>

                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='password'
                            label='Secret Key'
                            name='password'
                            value={secretKey.value}
                            onChange={secretKey.changeHandler}
                            autoComplete='current-password'
                        />
                        <Button
                                        type='submit'
                                        fullWidth
                                        variant='contained'
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Login
                                    </Button>
                    </form>



                </Paper>
            </Container>
        </div>
    )
}

export default AdminLogin