import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Axios from 'axios'

function App() {
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  Axios.defaults.withCredentials = true;

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  )
}
export default App;