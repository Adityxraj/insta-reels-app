import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../Context/AuthContext';
import { database } from '../Firebase';
import UploadFile from './UploadFile';
import Posts from './Posts';
import Navbar from './Navbar';

function Feed() {
    const {user, logout} = useContext(AuthContext)
    const [userData, setUserData] = useState('')
    useEffect(() => {
        // console.log(user + "HIIIII");
        const unsub = database.users.doc(user?.uid).onSnapshot((snapshot) => {
            setUserData(snapshot.data());
            // console.log(snapshot.data())
        })
        return ()=> {unsub()}
    }, [user])
  return (
      <>
        <Navbar userData={userData}/>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            {/* <div className='comp' style={{width: '50%'}}>
                <h1>Welcome to Feed</h1>
                <button onClick={logout}>Log out</button>
            </div> */}
            <UploadFile user={userData} />
            <Posts userData={userData} />
        </div>
      </>
  )
}

export default Feed