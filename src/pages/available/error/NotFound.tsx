import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="not-found">
            <div className="not-found__container">
                <div className="not-found__content">
                    <div className="not-found__animation">
                        <div className="not-found__circle not-found__circle--1"></div>
                        <div className="not-found__circle not-found__circle--2"></div>
                        <div className="not-found__circle not-found__circle--3"></div>
                        <h1 className="not-found__code">404</h1>
                    </div>
                    
                    <h2 className="not-found__title">Page Not Found</h2>
                    <p className="not-found__description">
                        Oops! The page you're looking for seems to have wandered off into the digital void.
                    </p>
                    
                    <div className="not-found__actions">
                        <Link to="/" className="not-found__button not-found__button--primary">
                            <span className="not-found__button-icon">🏠</span>
                            Go Home
                        </Link>
                        <button 
                            onClick={() => window.history.back()} 
                            className="not-found__button not-found__button--secondary"
                        >
                            <span className="not-found__button-icon">←</span>
                            Go Back
                        </button>
                    </div>
                </div>
                
                <div className="not-found__illustration">
                    <div className="not-found__planet"></div>
                    <div className="not-found__astronaut">🚀</div>
                    <div className="not-found__stars">
                        <span className="not-found__star"></span>
                        <span className="not-found__star"></span>
                        <span className="not-found__star"></span>
                        <span className="not-found__star"></span>
                        <span className="not-found__star"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
