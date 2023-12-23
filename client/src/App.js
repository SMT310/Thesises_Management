import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const clientId = "795154931381-npgldkbjojtham774jbh1193sji0d6fi.apps.googleusercontent.com"


function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      localStorage.setItem('googleUser', JSON.stringify(codeResponse));
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('googleUser'));

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(
    () => {
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data);
            console.log("Token:", user.access_token)

          })
          .catch((err) => console.log(err));
      }
    },
    [user]
  );

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    localStorage.removeItem('googleUser');
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <div id="my-signin2">
          <button onClick={() => login()}>Sign in with Google 🚀 </button>
        </div>
      )}
    </div>
  );
}
export default App;