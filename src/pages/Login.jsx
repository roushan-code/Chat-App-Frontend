import { useFileHandler, useInputValidation } from '6pp';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Avatar, Button, Container, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { server } from '../components/constants/config';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import {  userExists } from '../redux/reducers/auth';
import { usernameValidator } from '../utils/validator';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { setTokenToLocalstorage } from '../lib/features';


const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const toggleLogin = () => setIsLogin((prev) => !prev)

    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("", usernameValidator);
    const password = useInputValidation("");
    const [showPassword, setShowPassword] = useState(false);

    const avatar = useFileHandler("single");

    const dispatch = useDispatch();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("SingUp In...")
        setIsLoading(true);
        const formData = new FormData();
        formData.append("name", name.value);
        formData.append("bio", bio.value);
        formData.append("username", username.value);
        formData.append("password", password.value);
        formData.append("avatar", avatar.file);

        try {
            const { data } = await axios.post(`${server}/api/v1/user/new`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
            });
            toast.success(data?.message, {id: toastId});
            dispatch(userExists(data?.user))
            setTokenToLocalstorage(data?.token)
        } catch (error) {
            toast.error(error?.response?.data?.message || "something went wrong", {id: toastId})
        } finally {
            setIsLoading(false);
            
        }

    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Logging In...")
        setIsLoading(true);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };

        try {

            const { data } = await axios.post(`${server}/api/v1/user/login`, {
                username: username.value,
                password: password.value
            }, config);



            dispatch(userExists(data?.user))
            toast.success(data?.message, {id: toastId});
            setTokenToLocalstorage(data?.token)
        } catch (error) {
            toast.error(error?.response?.data?.message || "something went wrong", {id: toastId})
        } finally {
            setIsLoading(false);
        }

    }
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
                        backgroundColor: 'transparent',
                    }}>
                    {
                        isLogin ? (
                            <>
                                <Typography variant='h5'>Login</Typography>
                                <form style={{
                                    width: '100%',
                                    marginTop: "1rem"
                                }}
                                    onSubmit={handleLogin}>
                                    <TextField
                                        variant='outlined'
                                        margin='normal'
                                        required
                                        sx={{
                                            width: '100%',
                                        }}
                                        id='email'
                                        label='Username'
                                        name='username'
                                        value={username.value}
                                        onChange={username.changeHandler}
                                        autoComplete='username'
                                        autoFocus
                                    />
                                    <TextField
                                        variant='outlined'
                                        margin='normal'
                                        required
                                        sx={{
                                            width: '100%',
                                        }}
                                        id='password'
                                        label='Password'
                                        name='password'
                                        value={password.value}
                                        onChange={password.changeHandler}
                                        autoComplete='current-password'
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton 
                                                    aria-label="toggle password visibility"
                                                    onClick={()=>setShowPassword((prev)=> !prev)}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                                }}
                                            />
                                    <Button
                                        type='submit'
                                        disabled={isLoading}
                                        variant='contained'
                                        sx={{ mt: 3, mb: 2, width: '100%', }}
                                    >
                                        Login
                                    </Button>
                                    <Typography sx={{ mt: 3, mb: 2, textAlign: 'center', width: '100%' }} >Or</Typography>
                                    <Button
                                        disabled={isLoading}
                                        variant='outlined'
                                        sx={{ mt: 3, mb: 2, width: '100%' }}
                                        onClick={toggleLogin}
                                    >
                                        Register
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Typography variant='h5'>Register</Typography>
                                <form style={{
                                    width: '100%',
                                    marginTop: "1rem"
                                }}
                                    onSubmit={handleSignUp}
                                >
                                    {/* In Stack, display flex and flex direction column */}
                                    <Stack position={'relative'}
                                        width={'10rem'}
                                        margin={'auto'}>
                                        <Avatar sx={{
                                            width: '10rem',
                                            height: '10rem',
                                            objectFit: "contain"
                                        }}
                                            src={avatar.preview} />

                                        <IconButton
                                            sx={{
                                                position: 'absolute',
                                                bottom: 0,
                                                right: 0,
                                                bgcolor: "rgb(255,255,255,0.2)",
                                                ":hover": {
                                                    bgcolor: "rgb(255,255,255,0.7)"
                                                }
                                            }}
                                            component="label"
                                        >
                                            <>
                                                <CameraAltIcon />
                                                <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} />
                                            </>
                                        </IconButton>
                                    </Stack>
                                    {
                                        avatar.error && (
                                            <Typography
                                                color="error"
                                                variant="caption"
                                                m={"1rem auto"}
                                                width={'fit-content'}
                                                display={'block'}
                                            >
                                                {avatar.error}
                                            </Typography>
                                        )
                                    }
                                    <TextField
                                        variant='outlined'
                                        margin='normal'
                                        required
                                        sx={{
                                            width: '100%',
                                        }}
                                        id='name'
                                        label='Name'
                                        name='name'
                                        value={name.value}
                                        onChange={name.changeHandler}
                                        autoComplete='name'
                                        autoFocus
                                    />
                                    <TextField
                                        variant='outlined'
                                        margin='normal'
                                        required
                                        sx={{
                                            width: '100%',
                                        }}
                                        label='Bio'
                                        name='bio'
                                        value={bio.value}
                                        onChange={bio.changeHandler}
                                    />
                                    <TextField
                                        variant='outlined'
                                        margin='normal'
                                        required
                                        sx={{
                                            width: '100%',
                                        }}
                                        id='username'
                                        label='Username'
                                        name='username'
                                        value={username.value}
                                        onChange={username.changeHandler}
                                        autoComplete='username'
                                    />
                                    {
                                        username.error && (
                                            <Typography color="error" variant="caption">
                                                {username.error}
                                            </Typography>
                                        )
                                    }
                                    <TextField
                                        variant='outlined'
                                        margin='normal'
                                        required
                                        sx={{
                                            width: '100%',
                                        }}
                                        id='password'
                                        label='Password'
                                        name='password'
                                        value={password.value}
                                        onChange={password.changeHandler}
                                        autoComplete='current-password'
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton 
                                                    aria-label="toggle password visibility"
                                                    onClick={()=>setShowPassword((prev)=> !prev)}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                                }}
                                            />

                                    <Button
                                        type='submit'
                                        disabled={isLoading}
                                        variant='contained'
                                        sx={{ mt: 3, mb: 2, width: '100%', }}
                                    >
                                        Sign Up
                                    </Button>
                                    <Typography sx={{ textAlign: 'center', width: '100%', }} >Or</Typography>
                                    <Button
                                        disabled={isLoading}
                                        variant='outlined'
                                        sx={{ mt: 3, mb: 2, width: '100%', }}
                                        onClick={toggleLogin}
                                    >
                                        Login Instead
                                    </Button>
                                </form>
                            </>
                        )
                    }

                </Paper>
            </Container>
        </div>
    )
}

export default Login