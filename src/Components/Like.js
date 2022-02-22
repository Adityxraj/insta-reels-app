import React, {useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../Firebase';

function Like({userData, postData}) {
    const [like, setLike] = useState(null);
    useEffect(() => {
        // console.log(postData);
        let check = postData?.likes.includes(userData.userId)?true:false
        setLike(check)
    }, [postData, userData])

    const handleLike = () => {
        if(like == true){
            let narr = postData.likes.filter((el) => el != userData.userId)
            database.posts.doc(postData.postId).update({
                likes: narr
            })
        }else{
            let narr = [...postData.likes, userData.userId]
            database.posts.doc(postData.postId).update({
                likes: narr
            })
        }
    }
    return (
        <div>
            {
                like != null?
                <>
                    {
                        like == true ? <FavoriteIcon className={`icon-styling like`} onClick={handleLike}/> : <FavoriteIcon className={`icon-styling unlike`} onClick={handleLike}/>
                    }
                </>:
                <></>
            }
        </div>
    )
}

export default Like