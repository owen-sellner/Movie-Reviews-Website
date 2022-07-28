// Import React
import React, { Component } from 'react';
// Import MUI Elements
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// Import Toolbar Elements
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import history from '../Navigation/history';
// Import Images
import SearchPageImage from './images/searchPage.PNG';
import ReviewsPageImage from './images/reviewsPage.PNG';
import MyPageImage from './images/myPage.PNG';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = ""; 


// Parent Component
function Landing() {

    return(
        <div style={{margin: 15}}>
            
            <Box sx={{ display: 'flex', pb:10}}>
                <AppBar style={{ background: '#ba34eb' }}>
                    <Toolbar>
                        <Typography variant='h4'>Film Verdict</Typography>
                        <Box style={{marginLeft: "auto", marginRight: 0}}> 
                            <Button onClick={() => history.push('/')} color="inherit"><strong>Landing</strong></Button>
                            <Button onClick={() => history.push('/search')} color="inherit">Search</Button>
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
                        <b>Landing Page</b>
                    </Typography> 
                </Grid>

                {/* Subheading */}
                <Grid item xs={4}>
                    <Typography variant="h5">
                    Welcome to my site!
                    </Typography> 
                </Grid>

                {/* Review Form */}
                <Grid container
                    alignContent="center"
                    spacing={2} 
                    direction="row"
                >   
                    {/* Overview Title */}
                        <Grid item xs={12}></Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={2}>
                            <Typography variant="h4">
                                Site Overview:
                            </Typography> 
                        </Grid>
                        <Grid item xs={12-5}></Grid>
                    {/* Search Page */}
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Typography variant="h5"><b>Search Page</b></Typography>
                        </Grid>
                        <Grid item xs={12-8}></Grid>

                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2">
                                This page allows the user to search for movies by the title, name of the actor, and name of the director. 
                                The user must select at least one term to search by and the page will display the movies that meet all the 
                                criteria they set. If there are reviews for a given movie the page will also display the average rating 
                                score and list the content of each review.
                            </Typography>
                        </Grid>
                        <Grid item xs={12-8}></Grid>

                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <img src={SearchPageImage} alt="Screenshot of Search Page" style={{width: '100%', height: '100%'}}/>
                        </Grid>
                        <Grid item xs={12-8}></Grid>
                    {/* Reviews Page */}
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Typography variant="h5"><b>Reviews Page</b></Typography>
                        </Grid>
                        <Grid item xs={12-8}></Grid>

                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2">
                                This page allows the user to select a movie from the list of movies and then write a review. The user must 
                                input a review title, description, and rating for each review they submit. The review is sent to the database 
                                when the submit button is pressed after which the review and any other submitted reviews are displayed as a 
                                list on the page below the form. 
                            </Typography>
                        </Grid>
                        <Grid item xs={12-8}></Grid>

                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <img src={ReviewsPageImage} alt="Screenshot of Reviews Page" style={{width: '100%', height: '100%'}}/>
                        </Grid>
                        <Grid item xs={12-8}></Grid>
                    {/* My Page */}
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Typography variant="h5"><b>Movie Cast (My Page)</b></Typography>
                        </Grid>
                        <Grid item xs={12-8}></Grid>

                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2">
                                This page allows the user to retrieve the cast information for any movie in the database. The user must select 
                                a movie from the dropdown and hit submit after which the characters in the movie and the name of the actor that 
                                played them will be listed on the page below the form.
                            </Typography>
                        </Grid>
                        <Grid item xs={12-8}></Grid>

                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <img src={MyPageImage} alt="Screenshot of My Page" style={{width: '100%', height: '100%'}}/>
                        </Grid>
                        <Grid item xs={12-8}></Grid>

                </Grid>
            </Grid>

        </div>
    );
}

export default Landing;