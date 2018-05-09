import React from 'react';
import classes from './Home.css';

const home = (props) => {
    return (
        <div className={classes.Home+' container'}>
            <div className={classes.Jumbotron+" jumbotron"}>
                <img className="img-fluid" 
                    src={process.env.PUBLIC_URL + '/assets/images/child.jpg'}
                    alt='leaves picture' />
                <h3>Having Chores Regularly Can Build Character In A Child</h3>
            </div>
            <div className='row'>
                <div className="col-md-8 col-offset-md-2 col-sm-8 col-offset-sm-2">
                    
                </div>
            
            </div>            
        </div>
    )
}

export default home;