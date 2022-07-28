// Import React
import React, { Component } from 'react';
// Import MUI Elements
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
// Import Toolbar Elements
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import history from '../Navigation/history';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = ""; 


// Parent Component
function MyPage() {

    // Activates the intital APIs
    React.useEffect(() => {
        getMovies();
    }, []);
    
    const getMovies = () => {
        callApiGetMovies()
            .then(res => {
            console.log("callApiGetMovies returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("callApiGetMovies parsed: ", parsed);
            setMovies(parsed);
            });
    }
    
    const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";
    console.log(url);

    const response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Movies: ", body);
    return body;
    }
    
    function findMovieID(arr, movie) {
        return arr.find((item) => {
          return item.name === movie;
        }).id
    }

    const getCast = () => {
        callApiGetCast()
            .then(res => {
            console.log("callApiGetCast returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("callApiGetCast parsed: ", parsed);
            setCast(parsed);
            });
    }
    
    const callApiGetCast = async () => {
    const url = serverURL + "/api/getCast";
    console.log(url);

    const response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            moviesID: selectedMovieID
        })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Movies: ", body);
    return body;
    }
    
    function findMovieID(arr, movie) {
        return arr.find((item) => {
          return item.name === movie;
        }).id
    }
      

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    // Movies List State 
    const [movies, setMovies] = React.useState([]);

    // Movies List State 
    const [cast, setCast] = React.useState([]);

    // userID State 
    const [userID, setUserID] = React.useState(1);

    // selectedMovieID 
    const [selectedMovieID, setSelectedMovieID] = React.useState('');

    // Submission Check State
    const [hasSubmitted, setHasSubmitted] = React.useState(false);

    // Error Check States
    const [hasErrorMovie, setHasErrorMovie] = React.useState(false);

    // Form Value States
    const [selectedMovie, setSelectedMovie] = React.useState('');

    const handleSubmit = () => {
        // Checks if each input has a value
        if(selectedMovie) {
            setHasErrorMovie(false)
            getCast();
        } else {
            setHasErrorMovie(true)
        }

        setHasSubmitted(selectedMovie)
    }

    // Functions to handle the form values
    const handleSelectedMovie = (event) => {
        setSelectedMovie(event.target.value)
        setSelectedMovieID(findMovieID(movies, event.target.value))
    }

    // Resets hasSubmitted when a change occurs
    React.useEffect(() => {
        setHasSubmitted(false);
    }, [selectedMovie]);

    return(
        <div style={{margin: 15}}>
            
            <Box sx={{ display: 'flex', pb:10}}>
                <AppBar style={{ background: '#ba34eb' }}>
                    <Toolbar>
                        <Typography variant='h4'>Film Verdict</Typography>
                        <Box style={{marginLeft: "auto", marginRight: 0}}> 
                            <Button onClick={() => history.push('/')} color="inherit">Landing</Button>
                            <Button onClick={() => history.push('/search')} color="inherit">Search</Button>
                            <Button onClick={() => history.push('/reviews')} color="inherit">Reviews</Button>
                            <Button onClick={() => history.push('/myPage')} color="inherit"><strong>Movie Cast</strong></Button>
                            
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            {/* Creates a column grid for the body of the page */}
            <Grid container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
            >
                
                {/* Page Title */}
                <Grid item>
                    <Typography variant="h3">
                        <b>Movie Cast</b>
                    </Typography> 
                </Grid>

                {/* Page Description */}
                <Grid item xs={4}>
                    <Typography variant="subtitle1">
                        This page lists the roles and the actor names for the movie chosen in the selection. The results will be displayed after the submit button has been pressed. 
                    </Typography> 
                </Grid>

                {/* Review Form */}
                <Grid container
                    alignContent="center"
                    spacing={2} 
                    direction="row"
                >   
                    {/* Row 1 */}
                        <Grid item xs={12}></Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Typography variant="h5">Select Movie:</Typography>
                        </Grid>
                        <Grid item xs={12-8}></Grid>
                    {/* Row 2 */}
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <MovieSelection hasError={hasErrorMovie} editMovie={handleSelectedMovie} movies={movies}/>
                        </Grid>
                        <Grid item xs={12-8}></Grid>
                    {/* Last Row */}
                        <Grid item xs={5}></Grid> 
                        <Grid item xs={2}>
                            <Button fullWidth 
                                variant="contained" 
                                color="primary" 
                                size="large" 
                                onClick={handleSubmit}
                                disableElevation>Submit</Button>
                        </Grid>
                </Grid>

                {/* Submission Message */}
                <Grid item>
                    {hasSubmitted &&
                        <Typography variant="body">Your movie has been selected successfully.</Typography>
                    } 
                </Grid>

                {/* Divider */}
                <Grid item>
                    <Typography variant="h4">
                        - - - - - - - - - - - - - - - - - - - -
                    </Typography> 
                </Grid>

                {/* SELECTED MOVIE */}
                <Grid item>
                    <Typography variant="h4">{hasSubmitted && selectedMovie}</Typography> 
                </Grid>

                {/* HEADERS */}
                {/* Review Form */}
                <Grid container
                    alignContent="center"
                    spacing={2} 
                    direction="row"
                >   
                    {/* Row 1 */}
                        <Grid item xs={12}></Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={2}>
                            <Typography variant="h5" align="center">{hasSubmitted && <strong>Role(s)</strong>}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h5" align="center">{hasSubmitted && <strong>Actor(s)</strong>}</Typography>
                        </Grid>
                        <Grid item xs={12-8}></Grid>
                </Grid>

                {/* User Results */}   
                {cast.map((item) => {
                    return (
                        <Grid container
                            alignContent="center"
                            spacing={2} 
                            direction="row"
                        >   
                            {/* SPACING */}
                            <Grid item xs={12}></Grid>

                            {/* TITLE */}
                            <Grid item xs={4}></Grid>
                            <Grid item xs={2}>
                                <Typography variant="body" align="center">{item.movie_id == selectedMovieID && item.role}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="body" align="center">{item.movie_id == selectedMovieID && item.first_name + " " + item.last_name}</Typography>
                            </Grid>
                            <Grid item xs={12-8}></Grid>

                            {/* SPACING */}
                            <Grid item xs={12}></Grid>
                        </Grid>
                    );
                })} 

            </Grid>
        </div>
    );
}

// Component for movie selection (Select)
function MovieSelection(props) {
    return(
        <div>
            <FormControl fullWidth>
                <FormLabel>Select Movie</FormLabel>
                <Select  
                    id="movie-select" 
                    variant="outlined"
                    onChange={props.editMovie}
                    error={props.hasError}
                >
                    {props.movies.map((item) => {
                    return (
                        <MenuItem value={item.name}>{item.name}</MenuItem>
                    );
                })} 
                </Select>
                <FormHelperText style={{color:"red"}}>{props.hasError && "Please select a movie"}</FormHelperText>
            </FormControl>
        </div>
    );
}

export default MyPage;