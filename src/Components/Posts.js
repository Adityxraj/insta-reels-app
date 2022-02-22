import React, {useEffect, useState} from 'react';
import { database } from '../Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css';
import Avatar from '@mui/material/Avatar';
import Like from './Like'

function Posts({userData}) {
    const[posts, setPosts] = useState(null);
    useEffect(() => {
        let parr = []
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            parr = []
            querySnapshot.forEach((doc) => {
                let data = {...doc.data(), postId:doc.id}
                parr.push(data)
            })
            setPosts(parr)
        })
        return unsub
    }, [])
    return (
        <div>
            {
                userData == null || posts == null ? <CircularProgress /> :
                <div className='video-container'>
                    {
                        posts.map((post, index) => (
                            //key is passed so it identifies each entry of the map uniquely
                            <React.Fragment key={index}>      
                                <div className='videos'>
                                    <Video src={post.pUrl}/>
                                    <div className='fa' style={{display: 'flex'}}>
                                        <Avatar src={userData.profileUrl} />
                                        <h4>{userData.fullname}</h4>
                                    </div>
                                    <Like userData={userData} postData={post}/>
                                </div>
                            </React.Fragment>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Posts