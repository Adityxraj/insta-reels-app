import React, {useEffect, useState} from 'react';
import { database } from '../Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css';
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import CommentIcon from '@mui/icons-material/Comment';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Like2 from './Like2';
import AddComment from './AddComment';
import Comments from './Comments';

function Posts({userData}) {

    const [posts, setPosts] = useState(null);
    const [open, setOpen] = useState(null);
    const handleClickOpen = (id) => {
      setOpen(id);
    };
  
    const handleClose = () => {
      setOpen(null);
    };
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
    const callback = (entries) => {
        entries.forEach((entry) => {
            let ele = entry.target.childNodes[0]
            console.log(ele)
            ele.play().then(() => {
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause()
                }
            })
        })
    }
    let observer = new IntersectionObserver(callback, {threshold: 0.6});
    useEffect(() => {
        const elements = document.querySelectorAll(".videos")
        elements.forEach((element) => {
            observer.observe(element)
        })
        return () => {
            observer.disconnect();
        }
    }, [posts])
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
                                    <CommentIcon className='chat-styling' onClick={() => handleClickOpen(post.pId)}/>
                                    <Dialog
                                        open={open==post.pId}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        fullWidth={true}
                                        maxWidth = 'md'
                                    >
                                        <div className='modal-container'>
                                            <div className='video-modal'>
                                                <video autoPlay={true} muted="muted" controls >
                                                    <source src={post.pUrl} />
                                                </video>
                                            </div>
                                            <div className='comment-modal'>
                                                <Card className="card1" style={{padding: '1rem'}}>
                                                    <Comments postData={post}/>
                                                </Card>
                                                <Card variant="outlined" className="card2" style={{paddingBottom: '13%'}}>
                                                    <Typography style={{padding: '0.4rem'}}>{post.likes.length == 0 ? '' : `Liked by ${post.likes.length} users`}</Typography>
                                                    <div style={{display: 'flex'}}>
                                                        <Like2 postData={post} userData={userData} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} />
                                                        <AddComment userData={userData} postData={post}/>
                                                    </div>
                                                </Card>
                                            </div>
                                        </div>
                                        
                                    </Dialog>
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