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
import Button from '@material-ui/core/Button';

const colSize = 1;

// Parent Component
function Review() {
    return(
        <div style={{margin: 15}}>
            {/* Creates a column grid for the body of the page */}
            <Grid container
                direction="column"
                alignItems='center'
            >
                {/* Page Title */}
                <Grid item>
                    <Typography variant="h3">
                        Movie Reviews
                    </Typography> 
                </Grid>

                {/* Review Form */}
                <Grid container
                    direction="row"
                >   
                    {/* Row 1 */}
                        <Grid item xs={2*colSize}>
                            <Typography variant="h4">
                                New Review
                            </Typography> 
                        </Grid>
                        <Grid item xs={12-2*colSize}></Grid>
                    {/* Row 2 */}
                        <Grid item xs={colSize}>
                            <Typography variant="h6">Select Movie:</Typography>
                        </Grid>
                        <Grid item xs={2*colSize}>
                            <MovieSelection />
                        </Grid>
                        <Grid item xs={12-3*colSize}></Grid>
                    {/* Row 3 */}
                        <Grid item xs={colSize}>
                            <Typography variant="h6">Enter Title:</Typography>
                        </Grid>
                        <Grid item xs={2*colSize}>
                            <ReviewTitle />
                        </Grid>
                        <Grid item xs={12-3*colSize}></Grid>
                    {/* Row 4 */}
                        <Grid item xs={colSize}>
                            <Typography variant="h6">Enter Review:</Typography>
                        </Grid>
                        <Grid item xs={2*colSize}>
                            <ReviewBody />
                        </Grid>
                        <Grid item xs={12-3*colSize}></Grid>
                    {/* Row 5 */}
                        <Grid item xs={colSize}>
                            <Typography variant="h6">Select Rating:</Typography>
                        </Grid>
                        <Grid item xs={2*colSize}>
                            <ReviewRating />
                        </Grid>
                        <Grid item xs={12-3*colSize}></Grid>
                    {/* Last Row */}
                        <Grid item xs={colSize}></Grid> 
                        <Grid item xs={3*colSize}>
                            <Button variant="contained" color="primary" size="large" disableElevation>Submit</Button>
                        </Grid>
                </Grid>

                {/* User Results */}
                <Grid item>
                    <Typography variant="h4">
                        ...
                    </Typography> 
                </Grid>

            </Grid>
        </div>
    );
}

// Component for movie selection (Select)
function MovieSelection() {
    return(
        <div>
            {/* BROKEN CODE
            <FormControl>
                <FormLabel>Select Movie</FormLabel>
                <Select id="movie-select">
                    <MenuItem value="Morbius">Morbius</MenuItem>
                    <MenuItem value="Morbius 2">Morbius 2</MenuItem>
                    <MenuItem value="Morbius 3">Morbius 3</MenuItem>
                    <MenuItem value="Morbius 4">Morbius 4</MenuItem>
                    <MenuItem value="Morbius 5">Morbius 5</MenuItem>
                </Select>
            </FormControl> */}
        </div>
    );
}

// Component for review title (Single-line Textbox)
function ReviewTitle() {
    return(
        <div>
            <TextField id="review-title" label="Review Title" variant="outlined"/>
        </div>
    );
}

// Component for review text (Multi-line Textbox)
function ReviewBody() {
    return(
        <div>
            <TextField multiline rows={4} id="review-body" label="Review Body" variant="outlined"/>
        </div>
    );
}

// Component for User Score (Radio Group)
function ReviewRating() {
    return(
        <div>
            <FormControl>
            <FormLabel>Rating</FormLabel>
            <RadioGroup row={true}>
                <FormControlLabel value="1" control={<Radio />} label="1"/>
                <FormControlLabel value="2" control={<Radio />} label="2"/>
                <FormControlLabel value="3" control={<Radio />} label="3"/>
                <FormControlLabel value="4" control={<Radio />} label="4"/>
                <FormControlLabel value="5" control={<Radio />} label="5"/>
            </RadioGroup>
            </FormControl>
            
        </div>
    );
}

export default Review;