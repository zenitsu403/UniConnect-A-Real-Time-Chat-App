import React, {lazy, Suspense, useEffect} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProtectRoute from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';
import axios from "axios";
import {server} from "./constants/config.js";
import { useDispatch, useSelector } from "react-redux"
import { userExists, userNotExists } from './redux/reducers/auth.js';
import { Toaster } from "react-hot-toast"

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ChatsManagement = lazy(() => import("./pages/admin/ChatsManagement"));
const UsersManagement = lazy(() => import("./pages/admin/UsersManagement"));
const MessagesManagement = lazy(() => import("./pages/admin/MessagesManagement"));

const App = () => {

  const {user,loader} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`,{ withCredentials: true })
      .then(({data}) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch])
  

  return loader ? 
    (<LayoutLoader />) 
    : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>

          <Route element={<ProtectRoute user={user} redirect="/login"/>}>
            <Route path="/" element={<Home />}/>
            <Route path="/chat/:chatId" element={<Chat />}/>
            <Route path="/groups" element={<Groups />}/>
          </Route>

          <Route path="/login" element={
            <ProtectRoute user={!user} redirect="/">
              <Login />
            </ProtectRoute>
          }
          />

          <Route path='/admin' element={<AdminLogin/>} />
          <Route path='/admin/dashboard' element={<Dashboard/>} />
          <Route path='/admin/chats' element={<ChatsManagement/>} />
          <Route path='/admin/users' element={<UsersManagement/>} />
          <Route path='/admin/messages' element={<MessagesManagement/>} />

          <Route path='*' element={<NotFound/>}/>
          
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  )
}

export default App

// route * for any invalid route that doesnt match with any above given routes