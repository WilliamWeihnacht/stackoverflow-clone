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
                    <h1 id='splash-title'>Every<br/><div id='splash-title-em'>hacker<br/></div> has a tab open to <br/>Hack Overload</h1>
                </div>
                <span id='splash-stats'>
                    <div>
                        <h5>2 weeks</h5>
                        <p>of development time accumulated</p>
                    </div>
                    <div>
                        <h5>at least 1</h5>
                        <p># hackers who have been helped</p>
                    </div>
                    <div>
                        <h5>0% ROI</h5>
                        <p>from A/A students using Hack Overload Pro</p>
                    </div>
                    <div>
                        <h5>100+</h5>
                        <p>Questions seeded every day</p>
                    </div>
                </span>
                <div id='speach-bubbles-container'>
                    <h2 id='speach-bubbles-header'>Chat with likeminded individuals</h2>
                    <div className='left-bubble-container'>
                        <div className='left-bubble-content'>
                            <div className='left-bubble'>
                                <p>How do I bypass a firewall? Asking for non-malicous reasons ;&#41;</p>
                            </div>
                            <div className='left-bubble-triangle'></div>
                        </div>
                    </div>
                    <div className='right-bubble-container'>
                        <div className='right-bubble-content'>
                            <div className='right-bubble'>
                                <p>I've marked this as a duplicate. Please refer to this question: "How can I bypass this firewall".</p>
                            </div>
                            <div className='right-bubble-triangle'></div>
                        </div>
                    </div>
                    <div className='left-bubble-container'>
                        <div className='left-bubble-content'>
                            <div className='left-bubble'>
                                <p>Oh okay, I'm sorry. I didn't realize my question had already been answered.</p>
                            </div>
                            <div className='left-bubble-triangle'></div>
                        </div>
                    </div>
                    <div className='right-bubble-container'>
                        <div className='right-bubble-content'>
                            <div className='right-bubble'>
                                <p>It's no problem. If you want to thank the poster, be sure to give their post a vote.</p>
                            </div>
                            <div className='right-bubble-triangle'></div>
                        </div>
                    </div>
                    <div className='left-bubble-container'>
                        <div className='left-bubble-content'>
                            <div className='left-bubble'>
                                <p>I'm in! Thanks for pointing me in the right direction.</p>
                            </div>
                            <div className='left-bubble-triangle'></div>
                        </div>
                    </div>
                    <div className='right-bubble-container'>
                        <div className='right-bubble-content'>
                            <div className='right-bubble'>
                                <p>Of course. Happy hacking!</p>
                            </div>
                            <div className='right-bubble-triangle'></div>
                        </div>
                    </div>
                    <Link to={'/signup'}><button id='post-bubbles-button'>Let me in!</button></Link>
                </div>
            </div>
        </>
    )
}

export default SplashPage;