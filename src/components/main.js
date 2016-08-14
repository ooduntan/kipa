import React, {PropTypes} from "react";

const Home = ({children}) => {
  return (
    <div>
      {children}
    </div>
  );
};

Home.propTypes = {
  children: PropTypes.object.isRequired
};

export default Home;
