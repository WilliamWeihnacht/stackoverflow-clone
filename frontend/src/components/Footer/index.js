import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
    return (
        <footer id='footer'>
            <div id="footer-content-container">
                <div className="footer-div">
                    <div id="big-logo-div">
                        <p id='ltgt'>&lt;</p><p id='sl'>/</p><p id='ltgt'>&gt;</p>
                    </div>
                </div>
                <div className="footer-div">
                    <h4>Socials</h4>
                    <a href="https://github.com/WilliamWeihnacht">GitHub</a>
                    <a href='https://www.linkedin.com/in/william-weihnacht/'>LinkedIn</a>
                    <a href="https://angel.co/u/will-weihnacht">WellFound</a>
                </div>
                <div className="footer-div" id="center-footer-div">
                    <h4>Projects</h4>
                    <a href="https://williamweihnacht.github.io/Autobattler-js-project/">Autobattler</a>
                    <a href="https://foodjunkies.onrender.com/">Food Junkies</a>
                    <a href="https://stackoverflowclone-pk3b.onrender.com/">Hack Overload</a>
                </div>
                <div className="footer-div">
                    <h4>Links</h4>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/signup'}>Sign Up</Link>
                    <Link to={'/questions'}>Questions</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;