import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import "./Login.css";
import instapng from "../Img/insta.png"
import insta from "../Img/Instagram.jpg";
import img1 from "../Img/img1.jpg"
import img2 from "../Img/img2.jpg"
import img3 from "../Img/img3.jpg"
import img4 from "../Img/img4.jpg"
import img5 from "../Img/img5.jpg"
import bg from "../Img/bg.jpg"
import { CloudUpload } from "@material-ui/icons";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Link}  from 'react-router-dom';


export default function Login() {
  return (
    <div className="loginWrapper">
        <div className="imgcar" style={{backgroundImage: 'url('+instapng+')', backgroundSize:'cover'}}>
            <div className="car">
                <CarouselProvider
                    visibleSlides={1}
                    totalSlides={5}
                    naturalSlideWidth={238}
                    naturalSlideHeight={423}
                    hasMasterSpinner
                    isPlaying={true}
                    infinite={true}
                    dragEnabled={false}
                    touchEnabled={false}
                >
                    <Slider>
                    <Slide index={0}><Image src={img1}/></Slide>
                    <Slide index={1}><Image src={img2}/></Slide>
                    <Slide index={2}><Image src={img3}/></Slide>
                    <Slide index={3}><Image src={img4}/></Slide>
                    <Slide index={4}><Image src={img5}/></Slide>
                    </Slider>
                </CarouselProvider>
            </div>
        </div>
        <div className="loginCard">
            <Card variant="outlined">
                <div className="insta-logo">
                    <img src={insta} alt="" />
                </div>
                <CardContent>                    
                    {true && (<Alert severity="error">This is an error alert — check it out!</Alert>)}
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" />
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small"/>   
                    <Typography className="text1" color="primary" variant="subtitle1">
                        Forgot Password ?
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button color="primary" fullWidth={true} variant="contained">
                        Log in
                    </Button>
                </CardActions>
            </Card>
            <Card variant="outlined" className="card2">
                <CardContent>
                    <Typography className="text1" variant="subtitle1">
                        Don't have an account ? <Link to="/signup" style={{textDecoration: 'none'}}>Sign Up</Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </div>
    
  );
}
