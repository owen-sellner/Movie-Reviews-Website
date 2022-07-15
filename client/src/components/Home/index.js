// Import React
import React, { Component } from 'react';
// Import MUI Elements
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

// SERVER MODE
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
// const serverURL = ""; 


// Parent Component
function Review() {

    // Activates the 
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

    const addReview = () => {
        callApiAddReview()
            .then(res => {
            console.log("callApiAddReview returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("callApiAddReview parsed: ", parsed);
            });
    }
    
    const callApiAddReview = async () => {
    const url = serverURL + "/api/addReview";
    console.log(url);

    const response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userID: userID,
            reviewTitle: "enteredTitle",
            reviewContent: enteredReview,
            reviewScore: selectedRating,
            moviesID: selectedMovieID
        })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Review: ", body);
    return body;
    }

    function findMovieID(arr, movie) {
        return arr.find((item) => {
          return item.name === movie;
        }).id
    }
      

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    // Template Object Array
    const initialReviews = [{
        movie: '',
        title: '',
        description: '',
        rating: '',
    }]

    // Review List State
    const [reviews, setReviews] = React.useState(initialReviews);

    // Movies List State 
    const [movies, setMovies] = React.useState([]);

    // userID State 
    const [userID, setUserID] = React.useState(1);

    // selectedMovieID 
    const [selectedMovieID, setSelectedMovieID] = React.useState('');

    // Submission Check State
    const [hasSubmitted, setHasSubmitted] = React.useState(false);

    // Error Check States
    const [hasErrorMovie, setHasErrorMovie] = React.useState(false);
    const [hasErrorTitle, setHasErrorTitle] = React.useState(false);
    const [hasErrorReview, setHasErrorReview] = React.useState(false);
    const [hasErrorRating, setHasErrorRating] = React.useState(false);

    // Form Value States
    const [selectedMovie, setSelectedMovie] = React.useState('');
    const [enteredTitle, setEnteredTitle] = React.useState('');
    const [enteredReview, setEnteredReview] = React.useState('');
    const [selectedRating, setSelectedRating] = React.useState('');

    const handleSubmit = () => {
        // Checks if each input has a value
        if(selectedMovie) {
            setHasErrorMovie(false)
        } else {
            setHasErrorMovie(true)
        }

        if(enteredTitle) {
            setHasErrorTitle(false)
        } else {
            setHasErrorTitle(true)
        }

        if(enteredReview) {
            setHasErrorReview(false)
        } else {
            setHasErrorReview(true)
        }

        if(selectedRating) {
            setHasErrorRating(false)
        } else {
            setHasErrorRating(true)
        }

        setHasSubmitted(selectedMovie && enteredTitle && enteredReview && selectedRating)

        if(selectedMovie && enteredTitle && enteredReview && selectedRating) {
            handleAddReview()
            addReview();
        }

        

    }

    // Functions to handle the form values
    const handleSelectedMovie = (event) => {
        setSelectedMovie(event.target.value)
        setSelectedMovieID(findMovieID(movies, event.target.value))
    }
    
    const handleEnteredTitle = (event) => {
        setEnteredTitle(event.target.value)
    }
    const handleEnteredReview = (event) => {
        setEnteredReview(event.target.value)
    }
    const handleSelectedRating = (event) => {
        setSelectedRating(event.target.value)
    }

    // Function to handle a new review being added
    const handleAddReview = () => {
        if (reviews[0].title == '') {
            setReviews([{movie: selectedMovie, title: enteredTitle, description: enteredReview, rating: selectedRating}])
        } else {
            const newReviews = reviews.concat({movie: selectedMovie, title: enteredTitle, description: enteredReview, rating: selectedRating})
            setReviews(newReviews)
        }
    }

    return(
        <div style={{margin: 15}}>
            {/* Creates a column grid for the body of the page */}
            <Grid container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {/* Page Title */}
                <Grid item>
                    <Typography variant="h3">
                        <b>Movie Reviews</b>
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
                            <Typography variant="h4">
                                New Review
                            </Typography> 
                        </Grid>
                        <Grid item xs={12-8}></Grid>
                    {/* Row 2 */}
                        <Grid item xs={4}></Grid>
                        <Grid item xs={1}>
                            <Typography variant="h6">Select Movie:</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <MovieSelection hasError={hasErrorMovie} editMovie={handleSelectedMovie} movies={movies}/>
                        </Grid>
                        <Grid item xs={12-8}></Grid>
                    {/* Row 3 */}
                        <Grid item xs={4}></Grid>
                        <Grid item xs={1}>
                            <Typography variant="h6">Enter Title:</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <ReviewTitle hasError={hasErrorTitle} editTitle={handleEnteredTitle} />
                        </Grid>
                        <Grid item xs={12-8}></Grid>
                    {/* Row 4 */}
                        <Grid item xs={4}></Grid>
                        <Grid item xs={1}>
                            <Typography variant="h6">Enter Review:</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <ReviewBody hasError={hasErrorReview} editBody={handleEnteredReview} />
                        </Grid>
                        <Grid item xs={12-8}></Grid>
                    {/* Row 5 */}
                        <Grid item xs={4}></Grid>
                        <Grid item xs={1}>
                            <Typography variant="h6">Select Rating:</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <ReviewRating hasError={hasErrorRating} editRating={handleSelectedRating}/>
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
                        <Typography variant="body">Your review has been submitted.</Typography>
                    } 
                </Grid>

                {/* Divider */}
                <Grid item>
                    <Typography variant="h4">
                        - - - - - - - - - - - - - - - - - - - -
                    </Typography> 
                </Grid>
                
                {/* User Results */}   
                {reviews.map((item) => {
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
                            <Grid item xs={4}>
                                <Typography variant="h5">{item.title != '' && item.title}</Typography>
                            </Grid>
                            <Grid item xs={12-8}></Grid>

                            {/* MOVIE */}
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">{item.movie != '' && "Movie: " + item.movie}</Typography>
                            </Grid>
                            <Grid item xs={12-8}></Grid>

                            {/* BODY */}
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">{item.description != '' && "Description: " + item.description}</Typography>
                            </Grid>
                            <Grid item xs={12-8}></Grid>

                            {/* RATING */}
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">{item.rating != '' && "Rating: " + item.rating}</Typography>
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

// Component for review title (Single-line Textbox)
function ReviewTitle(props) {
    return(
        <div>
            <TextField 
                fullWidth id="review-title" 
                label="Review Title" 
                variant="outlined" 
                onChange={props.editTitle}
                error={props.hasError}
                helperText={props.hasError && "Please enter your review title"}
            />
        </div>
    );
}

// Component for review text (Multi-line Textbox)
function ReviewBody(props) {
    return(
        <div>
            <TextField 
                multiline 
                fullWidth 
                rows={5} 
                id="review-body" 
                label="Review Body" 
                variant="outlined" 
                onChange={props.editBody}
                error={props.hasError}
                helperText={props.hasError && "Please enter your review"}
                />
        </div>
    );
}

// Component for User Score (Radio Group)
function ReviewRating(props) {
    return(
        <div>
            <FormControl error={props.hasError}>
                <FormLabel>Rating</FormLabel>
                <RadioGroup row={true} onChange={props.editRating}>
                    <FormControlLabel value="1" control={<Radio />} label="1"/>
                    <FormControlLabel value="2" control={<Radio />} label="2"/>
                    <FormControlLabel value="3" control={<Radio />} label="3"/>
                    <FormControlLabel value="4" control={<Radio />} label="4"/>
                    <FormControlLabel value="5" control={<Radio />} label="5"/>
                </RadioGroup>
                <FormHelperText style={{color:"red"}}>{props.hasError && "Please select the rating"}</FormHelperText>
            </FormControl>
            
        </div>
    );
}

export default Review;