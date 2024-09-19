import React, { useState } from 'react'
import {Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import {CameraAlt as CameraAltIcon} from "@mui/icons-material"
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import {useFileHandler, useInputValidation} from "6pp";
import { usernameValidator } from '../lib/validators';

function Login() {
    const [isLogin,setIsLogin] = useState(true);

    const toggleLogin = () => {setIsLogin((prev) => !prev)}

    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("",usernameValidator);
    const password = useInputValidation("");

    const avatar = useFileHandler("single");

    const handleSignup = (e) => {
        e.preventDefault();
    }

    const handleLogin = (e) => {
        e.preventDefault();
    }
    
  return (
    <div style={{
        backgroundImage: "linear-gradient(rgb(161 0 255), rgb(0 241 253))"
    }}
    >
        <Container component={"main"} maxWidth='xs' sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Paper elevation={3} sx={{
                // overriding css styles with sx prop
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>

                {isLogin ? (
                    <>
                        <Typography variant='h5'>Login</Typography>
                        <form
                            style={{
                                width: "100%",
                                marginTop: "1rem",
                            }}
                            onSubmit={handleLogin}
                        >
                            <TextField 
                                required
                                fullWidth
                                label="Username"
                                margin='normal'
                                variant='outlined'
                                value={username.value}
                                onChange={username.changeHandler}
                            />
                            <TextField 
                                required
                                fullWidth
                                label="Password"
                                type='password'
                                margin='normal'
                                variant='outlined'
                                value={password.value}
                                onChange={password.changeHandler}
                            />
                            <Button 
                                sx={{
                                    marginTop: "1rem",
                                }}
                                variant='contained'
                                fullWidth
                                color='primary'
                                type='submit'
                            >
                                Login
                            </Button>
                            <Typography textAlign={'center'} m={"1rem"}>
                                Or
                            </Typography>
                            <Button
                                variant='text'
                                fullWidth
                                onClick={toggleLogin}
                            >
                                New User? Sign Up Instead
                            </Button>

                        </form>
                    </>
                ) : (
                    <>
                        <Typography variant='h5'>Sign Up</Typography>
                        <form
                            style={{
                                width: "100%",
                                marginTop: "1rem",
                            }}
                            onSubmit={handleSignup}
                        >
                            <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                                <Avatar src={avatar.preview} sx={{
                                    width: "10rem",
                                    height: "10rem",
                                    objectFit: "contain",
                                }}
                                />
                                <IconButton component="label" sx={{
                                    position: "absolute",
                                    bottom: "0",
                                    right: "0",
                                    color: 'white',
                                    bgcolor: "rgba(0,0,0,0.5)",
                                    ":hover": {
                                        bgcolor: "rgba(0,0,0,0.7)",
                                    }
                                }}
                                >
                                    <>
                                        <CameraAltIcon />
                                        <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} />
                                    </>
                                </IconButton>
                            </Stack>
                            
                            {avatar.error && (
                                <Typography 
                                    m={"1rem auto"}
                                    width={"fit-content"}
                                    display={"block"}
                                    color="error"
                                    variant='caption'
                                >
                                    {avatar.error}
                                </Typography>
                            )}

                            <TextField 
                                required
                                fullWidth
                                label="Name"
                                margin='normal'
                                variant='outlined'
                                value={name.value}
                                onChange={name.changeHandler}
                            />
                            <TextField 
                                required
                                fullWidth
                                label="Bio"
                                margin='normal'
                                variant='outlined'
                                value={bio.value}
                                onChange={bio.changeHandler}
                            />
                            <TextField 
                                required
                                fullWidth
                                label="Username"
                                margin='normal'
                                variant='outlined'
                                value={username.value}
                                onChange={username.changeHandler}
                            />
                            
                            {username.error && (
                                <Typography color="error" variant='caption'>
                                    {username.error}
                                </Typography>
                            )}

                            <TextField 
                                required
                                fullWidth
                                label="Password"
                                type='password'
                                margin='normal'
                                variant='outlined'
                                value={password.value}
                                onChange={password.changeHandler}
                            />
                            <Button 
                                sx={{
                                    marginTop: "1rem",
                                }}
                                variant='contained'
                                fullWidth
                                color='primary'
                                type='submit'
                            >
                                Register
                            </Button>
                            <Typography textAlign={'center'} m={"1rem"}>
                                Or
                            </Typography>
                            <Button
                                variant='text'
                                fullWidth
                                onClick={toggleLogin}
                            >
                                Already a User? Login Instead
                            </Button>

                        </form>
                    </>
                )}

            </Paper>
        </Container>
    </div>
  )
}

export default Login