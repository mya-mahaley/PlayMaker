FAST_REFRESH=false
WATCHPACK_POLLING=true
REACT_APP_DATABASE_URL="https://playmaker-92a6c-default-rtdb.firebaseio.com/"
REACT_APP_APIKEY="AIzaSyDHylLmOJ_5yOGaiARQcITGfQJled6YHJs"
REACT_APP_AUTHDOMAIN="playmaker-92a6c.firebaseapp.com"
REACT_APP_PROJECTID="playmaker-92a6c"
REACT_APP_STORAGEBUCKET="playmaker-92a6c.appspot.com"
REACT_APP_MESSAGINGSENDERID="1019627003794"
REACT_APP_APPID="1:1019627003794:web:33ad807ad90dd49498ab4b"
REACT_APP_MEASUREMENTID="G-LXYMVQ8PBV"


import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID,
    
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; 



