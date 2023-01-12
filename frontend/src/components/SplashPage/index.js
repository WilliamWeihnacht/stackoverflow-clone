import React from 'react';
import { Link } from 'react-router-dom';
import "./SplashPage.css"

const SplashPage = () => {

    return (
        <>
            {/* <div id='blue-accent-div-1'></div> */}
            <div id='splash-black-box'>
                <div id='splash-link-flexbox'>
                    <div className='splash-link-container' id='left-splash-link-container'>
                        <div className='icon-div' id='mag-glass-div'></div>
                        <p>Find the best answer to your technical question, help others answer theirs</p>
                        <Link to="/signup"><button id='splash-sign-up-button'>Join the community</button></Link>
                    </div>
                    <div className='splash-link-container' id='right-splash-link-container'>
                        <div className='icon-div' id='computer-icon-div'></div>
                        <p>Help others hack the pentagon or whatever, we don't really care</p>
                        <Link to="/login"><button id='splash-login-button'>Jump back in</button></Link>
                    </div>
                </div>
                <div id='title-container'>
                    <h1 id='splash-title'>Every<br></br><div id='splash-title-em'>hacker<br></br></div> has a tab open to <br></br>Hack Overload</h1>
                </div>
                <span id='splash-stats'>
                    <div>
                        <h5>100+ million</h5>
                        <p>monthly visitors</p>
                    </div>
                    <div>
                        <h5>45.1+ billion</h5>
                        <p>times a hacker got help</p>
                    </div>
                    <div>
                        <h5>191% ROI</h5>
                        <p>from companies using Hack Overload for teams</p>
                    </div>
                    <div>
                        <h5>5,000+</h5>
                        <p>Hack Overload for Teams instances active every day</p>
                    </div>
                </span>
            </div>
        </>
    )
}

export default SplashPage;