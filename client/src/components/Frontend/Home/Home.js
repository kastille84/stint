import React from 'react';
import classes from './Home.css';
import {Link} from 'react-router-dom';

const home = (props) => {
    return (
        <div className={classes.Home+' container'}>
            <div className={classes.Jumbotron+" jumbotron"}>
                <img className="img-fluid" 
                    src="https://s3.amazonaws.com/stint-react/child.jpg"
                    alt='child' />
                <h3>Having Chores Regularly Can Build Character In A Child</h3>
            </div>
            <div className={classes.Title +' row'}>
                <div className="col-12">
                    <h3>What is Stint?</h3>
                </div>            
            </div>  
            <div className={classes.Explain+' row d-flex'}>
                <div className="col-sm-6 col-md-6 col-12">
                    <img 
                        src="https://s3.amazonaws.com/stint-react/motherAndSon.jpg" 
                        alt='parent and child' 
                        className='img-fluid'/>
                </div>
                <div className=" col-sm-6 col-md-6 col-12 align-self-center">
                    <h5>Stint is an Online Chore Tracker Application</h5>
                    <br/>
                    <h5>Stint is aimed at bringing Parents and Children together through structure in the household.</h5>
                </div>
            </div>   
            <div className={classes.Title +' row'}>
                <div className="col-12 col-12">
                    <h3>What are the Benefits?</h3>
                </div>            
            </div> 
            <div className={classes.Benefit+' row'}>
                <div className='card col-sm-6 col-md-6 col-12'>
                    <div className='card-body'>
                        <div className='card-title'><h5>Parent</h5></div>
                            <p>As parents, we constantly worry about what kind of person our child will grow up to be. By giving your kids chores around the house, you can be assured that your kids gain responsibility, character, and problem solving skills. Did we forget to mention that your house will be clean aswell?</p>
                    </div>
                </div>
                <div className='card col-sm-6 col-md-6 col-12'>
                    <div className='card-body'>
                        <div className='card-title'><h5>Child</h5></div>
                        <div className='card-text'>
                            <p>More than merely teaching them life skills they'll need as they get older — such as how to work a washing machine or cook basic meals — a consistent system of chores teaches responsibility and organization that can help them at home and school and later, within their jobs and even relationships.</p>
                        </div>
                    </div>
                </div>
            </div>   
            <div className={classes.Register +' row'}>
                <div className="col-12">
                    <h3>Register Now</h3>
                    <Link to='/register' className='btn btn-lg btn-success'>REGISTER</Link>
                </div>            
            </div>  
        </div>
    )
}

export default home;