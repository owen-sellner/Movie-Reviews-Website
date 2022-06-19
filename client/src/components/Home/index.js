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
import FormLabel from '@material-ui/core/FormLabel'
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const colSize = 1;

const serverURL = "http://ov-research-4.uwaterloo.ca:3103";

// Parent Component
function Review() {

    // Review List State
    const [reviews, setReviews] = React.useState([]);

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

        console.log(selectedMovie)
        console.log(enteredTitle)
        console.log(enteredReview)
        console.log(selectedRating)

        setHasSubmitted(selectedMovie && enteredTitle && enteredReview && selectedRating)

        if(selectedMovie && enteredTitle && enteredReview && selectedRating) {
            handleAddReview()
        }
    }

    // Functions to handle the form values
    const handleSelectedMovie = (event) => {
        setSelectedMovie(event.target.value)
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
        const newReviews = reviews.concat({movie: {selectedMovie}, title: {enteredReview}, description: {enteredReview}, rating: {selectedRating}})
        setReviews(newReviews)
        console.log(reviews)
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
                        <Grid item xs={4*colSize}></Grid>
                        <Grid item xs={4*colSize}>
                            <Typography variant="h4">
                                New Review
                            </Typography> 
                        </Grid>
                        <Grid item xs={12-8*colSize}></Grid>
                    {/* Row 2 */}
                        <Grid item xs={4*colSize}></Grid>
                        <Grid item xs={colSize}>
                            <Typography variant="h6">Select Movie:</Typography>
                        </Grid>
                        <Grid item xs={3*colSize}>
                            <MovieSelection hasError={hasErrorMovie} editMovie={handleSelectedMovie}/>
                        </Grid>
                        <Grid item xs={12-8*colSize}></Grid>
                    {/* Row 3 */}
                        <Grid item xs={4*colSize}></Grid>
                        <Grid item xs={colSize}>
                            <Typography variant="h6">Enter Title:</Typography>
                        </Grid>
                        <Grid item xs={3*colSize}>
                            <ReviewTitle hasError={hasErrorTitle} editTitle={handleEnteredTitle} />
                        </Grid>
                        <Grid item xs={12-8*colSize}></Grid>
                    {/* Row 4 */}
                        <Grid item xs={4*colSize}></Grid>
                        <Grid item xs={colSize}>
                            <Typography variant="h6">Enter Review:</Typography>
                        </Grid>
                        <Grid item xs={3*colSize}>
                            <ReviewBody hasError={hasErrorReview} editBody={handleEnteredReview} />
                        </Grid>
                        <Grid item xs={12-8*colSize}></Grid>
                    {/* Row 5 */}
                        <Grid item xs={4*colSize}></Grid>
                        <Grid item xs={colSize}>
                            <Typography variant="h6">Select Rating:</Typography>
                        </Grid>
                        <Grid item xs={3*colSize}>
                            <ReviewRating hasError={hasErrorRating} editRating={handleSelectedRating}/>
                        </Grid>
                        <Grid item xs={12-8*colSize}></Grid>
                    {/* Last Row */}
                        <Grid item xs={5*colSize}></Grid> 
                        <Grid item xs={2*colSize}>
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
                <Grid container
                    alignContent="center"
                    spacing={2} 
                    direction="row"
                >   
                    {/* Row 1 */}
                        <Grid item xs={4*colSize}></Grid>
                        <Grid item xs={4*colSize}>
                            <Typography variant="h4">
                                New Review
                            </Typography> 
                        </Grid>
                        <Grid item xs={12-8*colSize}></Grid>
                    
                </Grid>

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
                    <MenuItem value="Morbius">Morbius</MenuItem>
                    <MenuItem value="Morbius 2">Morbius 2</MenuItem>
                    <MenuItem value="Morbius 3">Morbius 3</MenuItem>
                    <MenuItem value="Morbius 4">Morbius 4</MenuItem>
                    <MenuItem value="Morbius 5">Morbius 5</MenuItem>
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