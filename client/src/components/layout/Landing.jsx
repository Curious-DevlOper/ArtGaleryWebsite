import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Art Works</h1>
              <p className="lead">
                {' '}
                Get NFT for your favourite piece of art
              </p>
              <hr />
              <Link  className="btn btn-lg btn-info me-2" to="/register">
                Sign Up
              </Link>
              <Link className="btn btn-lg btn-light" to="/login">
                Login
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
