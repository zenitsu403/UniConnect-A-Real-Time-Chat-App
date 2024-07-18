import { Avatar, AvatarGroup, Box, Stack } from '@mui/material'
import React from 'react'

const AvatarCard = ({avatar=[], max=4}) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
        <AvatarGroup max={max}>
            <Box width={"5rem"} height={"3rem"}>
                {avatar.map((i,index) => (
                    <Avatar
                        key={Math.random() *100}
                        srcSet={i}
                        alt={`Avatar ${index}`}
                        sx={{
                            width: "3rem",
                            height: "3rem",
                            position: "absolute",
                            left: {
                                xs: `${0.5 + index}rem`,
                                sm: `${index}rem`
                            }
                        }}
                    />
                ))}
            </Box>
        </AvatarGroup>
    </Stack>
  )
}

export default AvatarCard

// Avatar issue resolved!!
// https://chatgpt.com/share/706fd66a-ecd7-407f-8e9d-3d59fccef302