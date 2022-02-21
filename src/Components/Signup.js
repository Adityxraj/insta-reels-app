import * as React from "react";
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
import {Link}  from 'react-router-dom';


export default function Signup() {
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
                    {true && (<Alert severity="error">This is an error alert — check it out!</Alert>)}
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" />
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small"/>
                    <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size="small" />
                    <Button color="secondary" fullWidth={true} variant="outlined" margin="dense" startIcon={<CloudUploadIcon />} component="label" >
                        Upload Profile Image 
                        <input type="file" accept="image/*" hidden/>
                        </Button> 
                        
                </CardContent>
                <CardActions>
                    <Button color="primary" fullWidth={true} variant="contained">
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
