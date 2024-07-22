import React, { lazy, memo, Suspense, useEffect, useState } from 'react'
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material"
import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditButton, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from "@mui/icons-material"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Link } from "../components/styles/StyledComponents"
import AvatarCard from "../components/shared/AvatarCard"
import { sampleChats, sampleUsers } from "../constants/sampleData"
import UserItem from '../components/shared/UserItem'

const ConfirmDeleteDialog = lazy(() => import("../components/dialogs/ConfirmDeleteDialog"))
const AddMemberDialog = lazy(() => import("../components/dialogs/AddMemberDialog"))

const isAddMember = false;

function Groups() {

const chatId = useSearchParams()[0].get("group")

const navigate = useNavigate();

const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);
const [isEdit,setIsEdit] = useState(false);
const [confirmDeleteDialog,setConfirmDeleteDialog] = useState(false);
const [groupName,setGroupName] = useState("")
const [groupNameUpdatedValue,setGroupNameUpdatedValue] = useState("")

const navigateBack = () => {
  navigate("/");
}

const handleMobile = () => {
  setIsMobileMenuOpen(prev => !prev)
}

const handleMobileClose = () => setIsMobileMenuOpen(false);

const updateGroupName = () => {
  setIsEdit(false);
}

const openConfirmDeleteHandler = () => {
  setConfirmDeleteDialog(true);
}

const closeConfirmDeleteHandler = () => {
  setConfirmDeleteDialog(false);
}

const openAddMemberHandler = () => {

}

const deleteHandler = () => {
  closeConfirmDeleteHandler();
}

const removeMemberHandler = (id) => {

}

useEffect(() => {
  if(chatId){
    setGroupName(`Group Name ${chatId}`)
    setGroupNameUpdatedValue(`Group Name ${chatId}`)
  }

  return () => {
    // cleanup function exectued first then effect functions above
    // more similar like unmounting component
    // clean UI before re rendering
    setGroupName("");
    setGroupNameUpdatedValue("")
    setIsEdit(false)
  }
}, [chatId])


const GroupName = (
  <Stack
    direction={"row"}
    alignItems={"center"}
    justifyContent={"center"}
    spacing={"1rem"}
    padding={"3rem"}
  >
    {
      isEdit
        ? 
        <>
          <TextField 
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <DoneIcon/>
          </IconButton>
        </>
        : 
        <>
          <Typography variant='h4'>{groupName}</Typography>
          <IconButton 
            onClick={() => setIsEdit(true)}
            sx={{
              color: "white",
              bgcolor: "lightblue",
              ":hover" : {
                bgcolor: "skyblue",
                color: "black"
              }
            }}
          >
            <EditButton/>
          </IconButton>
        </>
    }
  </Stack>
)

const IconBtns = <>

  <Tooltip title="Menu">
    <Box
      sx={{
        display: {
          xs: "block",
          sm: "none",
        },
        position: "fixed",
        top: "2rem",
        right: "2rem",
      }}
    >
      <IconButton onClick={handleMobile}
        sx={{
          color: "white",
          bgcolor: "lightblue",
          ":hover" : {
            bgcolor: "skyblue",
            color: "black"
          }
        }}
      >
        <MenuIcon/>
      </IconButton>
    </Box>
  </Tooltip>

  <Tooltip title="Back">
    <IconButton 
     onClick={navigateBack}
     sx={{
      position: "absolute",
      top: "2rem",
      left: "2rem",
      color: "white",
      bgcolor: "lightblue",
      ":hover" : {
        bgcolor: "skyblue",
        color: "black"
      }
    }}
    >
      <KeyboardBackspaceIcon/>
    </IconButton>
  </Tooltip>
</>

const ButtonGroup = (
  <Stack
    direction={{
      xs: "column-reverse",
      sm: "row"
    }}
    spacing={"1rem"}
    p={{
      xs: "0",
      sm: "1rem",
      md: "1rem 4rem",
    }}
  >
    <Button 
      size='large' 
      variant='outlined' 
      color='error' 
      startIcon={<DeleteIcon/>}
      onClick={openConfirmDeleteHandler}
    >
      Delete Group
    </Button>
    <Button 
      size='large' 
      variant='contained' 
      color='success' 
      startIcon={<AddIcon/>}
      onClick={openAddMemberHandler}
    >
      Add Member
    </Button>
  </Stack>
)

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display:{
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
      >
        <GroupsList myGroups={sampleChats} chatId={chatId} />
      </Grid>

      <Grid item xs={12} sm={8} sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        padding: "1rem 3rem",
      }}>

        {!chatId && <Typography fontSize={"large"} p={"2rem"}>Select a Group to manage</Typography>}

        {IconBtns}
        
        {groupName && (
          <>
            {GroupName}
            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant='body1'
            >
              Members
            </Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                xs:"0",
                sm: "1rem",
                md: "1rem 4rem"
              }}
              spacing={"2rem"}
              bgcolor={"lightblue"}
              height={"50vh"}
              overflow={"auto"}
            >

              {
                sampleUsers.map((i) => (
                  <UserItem 
                    user={i} 
                    key={i._id}
                    isAdded 
                    styling={{
                      boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                      bgcolor: "white"
                    }}
                    handler={removeMemberHandler}
                  />
                ))
              }

            </Stack>

            {ButtonGroup}

          </>
        )}

      </Grid>

      {
        isAddMember && <Suspense fallback={<Backdrop open/>}>
          <AddMemberDialog/>
        </Suspense>
      }

      {
        confirmDeleteDialog && <Suspense fallback={<Backdrop open/>}>
          <ConfirmDeleteDialog 
            open={confirmDeleteDialog} 
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      }

      <Drawer open={isMobileMenuOpen} onClose={handleMobileClose}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          }
        }}
      >
        <GroupsList w={"50vw"} myGroups={sampleChats} chatId={chatId} />
      </Drawer>

    </Grid>
  )
}

const GroupsList = ({w="100%",myGroups=[],chatId}) => {
  return(
    <Stack width={w} overflow={"auto"} sx={{
      height: "100vh",
      bgcolor: "lightblue"
    }}
    >
      {
        myGroups.length>0 
        ? myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id}/>)
        : <Typography textAlign={"center"} padding={"1rem"}>No groups</Typography>
      }
    </Stack>
  )
}

const GroupListItem = memo(({group,chatId}) => {
  const {name,avatar,_id} = group;
   return (
    <Link 
      to={`?group=${_id}`}
      onClick={e => {
        if(chatId === _id) e.preventDefault(); /* to prevent re render on clicking  */
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>

      </Stack>
    </Link>
   )
});

export default Groups