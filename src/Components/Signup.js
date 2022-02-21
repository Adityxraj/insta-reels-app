import * as React from "react";
import { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./Signup.css";
import insta from "../Img/Instagram.jpg";
import { CloudUpload } from "@material-ui/icons";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Link, useNavigate}  from 'react-router-dom';
import { AuthContext } from "../Context/AuthContext";
import { database, storage } from "../Firebase";


export default function Signup() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [file, setFile] = React.useState(null);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const {signup} = useContext(AuthContext);

    const handleClick = async() => {
        if(file==null){
            setError("Please upload a profile picture first");
            setTimeout(() => {
                setError('')
            }, 2000)
            return;
        }
        try{
            setError('')
            setLoading(true)
            let userObj = await signup(email, password)
            let uid = userObj.user.uid
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed',fn1,fn2,fn3);
            function fn1(snapshot){
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                console.log(`Upload is ${progress} done.`)
            }
            function fn2(error){
                setError(error);
                setTimeout(()=>{
                    setError('')
                },2000);
                setLoading(false)
                return;
            }
            function fn3(){
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log(url);
                    database.users.doc(uid).set({
                        email:email,
                        userId:uid,
                        fullname:name,
                        profileUrl:url,
                        createdAt:database.getTimeStamp()
                    })
                })
                setLoading(false);
                navigate('/');
            }
        }catch(err){
            setError(err);
            setTimeout(() => {
                setError('')
            }, 2000)
        }
    }

  return (
    <div className="signupWrapper">
        <div className="signupCard">
            <Card variant="outlined">
                <div className="insta-logo">
                    <img src={insta} alt="" />
                </div>
                <CardContent>
                    <Typography className="text1" variant="subtitle1">
                        Signup to see photos and videos from your friends
                    </Typography>
                    {error != '' && (<Alert severity="error">{error}</Alert>)}
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size="small" value={name} onChange={(e) => setName(e.target.value)}/>
                    <Button color="secondary" fullWidth={true} variant="outlined" margin="dense" startIcon={<CloudUploadIcon />} component="label" >
                        Upload Profile Image 
                        <input type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files[0])}/>
                        </Button> 
                        
                </CardContent>
                <CardActions>
                    <Button color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleClick}>
                        Signup
                    </Button>
                </CardActions>
                <CardContent>
                    <Typography className="text1" variant="subtitle1">
                        By Signing Up you agree to our Terms, Data Policy and Cookies Policy.
                    </Typography>
                </CardContent>
            </Card>
            <Card variant="outlined" className="card2">
                <CardContent>
                    <Typography className="text1" variant="subtitle1">
                        Having an account ? <Link to="/login" style={{textDecoration: 'none'}}>Login</Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
