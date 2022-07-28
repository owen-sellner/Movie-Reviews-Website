// Import React
import React, { Component } from 'react';
// Import MUI Elements
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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
function Search() {

    // Movies List State 
    const [movies, setMovies] = React.useState([]);

    // Reviews List State 
    const [reviews, setReviews] = React.useState([]);

    // userID State 
    const [userID, setUserID] = React.useState(1);

    // Submission Check State
    const [hasSubmitted, setHasSubmitted] = React.useState(false);

    // Error Check States
    const [hasError, setHasError] = React.useState(false);

    // Form Value States
    const [enteredMovie, setEnteredMovie] = React.useState('');
    const [enteredActor, setEnteredActor] = React.useState('');
    const [enteredDirector, setEnteredDirector] = React.useState('');

    // Review Listing State & Handle
    const [selectedMovie, setSelectedMovie] = React.useState('');

    const handleSelectedMovie = (event) => {
        setSelectedMovie(event.target.value)
    }


    // Functions to handle the search values
    const handleEnteredMovie = (event) => {
        setEnteredMovie(event.target.value)
    }
    
    const handleEnteredActor = (event) => {
        setEnteredActor(event.target.value)
    }
    const handleEnteredDirector = (event) => {
        setEnteredDirector(event.target.value)
    }

    // Function to handle submit 
    const handleSubmit = () => {
        if (!(enteredMovie || enteredActor || enteredDirector)) {
            setHasError(true);
            setHasSubmitted(false);
        } else {
            setHasError(false);
            setHasSubmitted(true);

            getSearch();
        }
        
    }

    // Resets hasSubmitted when a change occurs
    React.useEffect(() => {
        setHasSubmitted(false);
    }, [enteredMovie, enteredActor, enteredDirector]);

    // Calls getReviews API
    React.useEffect(() => {
        getReviews();
    }, []);
    
    // API Code
    const getSearch = () => {
        callApiGetSearch()
            .then(res => {
            console.log("callApiGetSearch returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("callApiGetSearch parsed: ", parsed);
            setMovies(parsed);
            });
    }
    
    const callApiGetSearch = async () => {
    const url = serverURL + "/api/getSearch";
    console.log(url);

    const response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            enteredMovie: enteredMovie,
            enteredActor: enteredActor,
            enteredDirector: enteredDirector
        })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Movies: ", body);
    return body;
    }

    const getReviews = () => {
        callApiGetReviews()
            .then(res => {
            console.log("callApiGetReviews returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("callApiGetReviews parsed: ", parsed);
            setReviews(parsed);
            });
    }
    
    const callApiGetReviews = async () => {
    const url = serverURL + "/api/getReviews";
    console.log(url);

    const response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Reviews: ", body);
    return body;
    }

    return(
        <div style={{margin: 15}}>
            
            <Box sx={{ display: 'flex', pb:10}}>
                <AppBar style={{ background: '#ba34eb' }}>
                    <Toolbar>
                        <Typography variant='h4'>Film Verdict</Typography>
                        <Box style={{marginLeft: "auto", marginRight: 0}}> 
                            <Button onClick={() => history.push('/')} color="inherit">Landing</Button>
                            <Button onClick={() => history.push('/search')} color="inherit"><strong>Search</strong></Button>
                            <Button onClick={() => history.push('/reviews')} color="inherit">Reviews</Button>
                            <Button onClick={() => history.push('/myPage')} color="inherit">Movie Cast</Button>
                            
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
                        <b>Movie Search</b>
                    </Typography> 
                </Grid>

                {/* Review Form */}
                <Grid container
                    alignContent="center"
                    spacing={2} 
                    direction="row"
                >   
                    {/* Row 1A */}
                        <Grid item xs={12}></Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6">Enter Movie Title:</Typography>
                        </Grid>
                        <Grid item xs={12-8}></Grid>
                    {/* Row 2A */}
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <MovieTitle hasError={hasError} editValue={handleEnteredMovie}/>
                        </Grid>
                        <Grid item xs={12-8}></Grid>
                    {/* Row 1B */}
                    <Grid item xs={12}></Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6">Enter Actor Name:</Typography>
                        </Grid>
                        <Grid item xs={12-8}></Grid>
                    {/* Row 1B */}
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <ActorName hasError={hasError} editValue={handleEnteredActor}/>
                        </Grid>
                        <Grid item xs={12-8}></Grid>
                    {/* Row 1C */}
                    <Grid item xs={12}></Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6">Enter Director Name:</Typography>
                        </Grid>
                        <Grid item xs={12-8}></Grid>
                    {/* Row 2C */}
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <DirectorName hasError={hasError} editValue={handleEnteredDirector}/>
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
                        <Typography variant="body">Your search has been inputted successfully.</Typography>
                    } 
                </Grid>

                {/* Error Message */}
                <Grid item>
                    {hasError &&
                        <Typography variant="body">Must enter at least one search term.</Typography>
                    } 
                </Grid>

                {/* Divider */}
                <Grid item>
                    <Typography variant="h4">
                        - - - - - - - - - - - - - - - - - - - -
                    </Typography> 
                </Grid>
                

                {/* Search Results */}   
                {movies.map((movie) => {
                    if (movie.averageScore) {
                        return (
                            <Grid container
                                alignContent="center"
                                spacing={2} 
                                direction="row"
                            >   
                                {/* SPACING */}
                                <Grid item xs={12}></Grid>

                                {/* MOVIE TITLE */}
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h5"><strong>{hasSubmitted && movie.name != '' && movie.name}</strong></Typography>
                                </Grid>
                                <Grid item xs={12-8}></Grid>

                                {/* DIRECTOR NAME */}
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h6">{hasSubmitted && movie.director_name != '' && "Director: " + movie.director_name}</Typography>
                                </Grid>
                                <Grid item xs={12-8}></Grid>

                                {/* AVERAGE RATING */}
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h6">{hasSubmitted && "Average Rating: " + movie.averageScore}</Typography>
                                </Grid>
                                <Grid item xs={12-8}></Grid>

                                {/* REVIEWS */}
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h6"><u>{hasSubmitted && "Reviews:"}</u></Typography>
                                </Grid>
                                <Grid item xs={12-8}></Grid>

                                <Grid item xs={12}>
                                    <ListReviews reviews={reviews} hasSubmitted={hasSubmitted} movieName={movie.name} />
                                </Grid>

                                {/* SPACING */}
                                <Grid item xs={12}></Grid>
                            </Grid>

                        );
                    } else {
                            return (
                                <Grid container
                                    alignContent="center"
                                    spacing={2} 
                                    direction="row"
                                >   
                                    {/* SPACING */}
                                    <Grid item xs={12}></Grid>
    
                                    {/* MOVIE TITLE */}
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="h5"><strong>{hasSubmitted && movie.name != '' && movie.name}</strong></Typography>
                                    </Grid>
                                    <Grid item xs={12-8}></Grid>
    
                                    {/* DIRECTOR NAME */}
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="h6">{hasSubmitted && movie.director_name != '' && "Director: " + movie.director_name}</Typography>
                                    </Grid>
                                    <Grid item xs={12-8}></Grid>
    
                                    {/* SPACING */}
                                    <Grid item xs={12}></Grid>
                                </Grid>
    
                            );
                    }

                })}

            </Grid>

        </div>
    );
}


// Component for movie title (Single-line Textbox)
function MovieTitle(props) {
    return(
        <div>
            <TextField 
                fullWidth 
                id="movie-title" 
                label="Movie Title" 
                variant="outlined" 
                onChange={props.editValue}
                error={props.hasError}
                helperText={props.hasError && "Please enter a movie title"}
            />
        </div>
    );
}

// Component for actor name (Single-line Textbox)
function ActorName(props) {
    return(
        <div>
            <TextField 
                fullWidth 
                id="actor-name" 
                label="Actor Name" 
                variant="outlined" 
                onChange={props.editValue}
                error={props.hasError}
                helperText={props.hasError && "Please enter an actor's name"}
            />
        </div>
    );
}

// Component for director name (Single-line Textbox)
function DirectorName(props) {
    return(
        <div>
            <TextField 
                fullWidth 
                id="director-name" 
                label="Director Name" 
                variant="outlined" 
                onChange={props.editValue}
                error={props.hasError}
                helperText={props.hasError && "Please enter an director's name"}
            />
        </div>
    );
}

// Component for listing reviews
function ListReviews(props) {
    return(
        <div>
            {props.reviews.map((review) => {
                if (review.name == props.movieName) {
                    return (
                        <Grid container
                            alignContent="center"
                            spacing={2} 
                            direction="row"
                        >   
                            {/* REVIEW TITLE */}
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle1"><strong>{props.hasSubmitted && review.reviewTitle != '' && review.reviewTitle}</strong></Typography>
                            </Grid>
                            <Grid item xs={12-8}></Grid>

                            {/* REVIEW CONTENT */}
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle1">{props.hasSubmitted && review.reviewContent != '' && "Description: " + review.reviewContent}</Typography>
                            </Grid>
                            <Grid item xs={12-8}></Grid>

                            {/* REVIEW RATING */}
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle1">{props.hasSubmitted && review.reviewScore && "Rating: " + review.reviewScore}</Typography>
                            </Grid>
                            <Grid item xs={12-8}></Grid>

                        </Grid>
                    );}

                })}
        </div>
    );
}

export default Search;