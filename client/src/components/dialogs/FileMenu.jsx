import { Menu } from '@mui/material'
import React from 'react'

const FileMenu = ({anchorEl}) => {
  return (
    <Menu anchorEl={anchorEl} open={false}>
        <div 
            style={{
                width: "10rem"
            }}
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quia ratione cumque nostrum velit enim porro distinctio! Commodi beatae, aspernatur quisquam tempore saepe repellendus nam quis, labore iure reiciendis veritatis.
        </div>
    </Menu>
  )
}

export default FileMenu