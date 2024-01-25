import { useState } from 'react'
import axios from 'axios';

function SignupCard({onSignup}){

    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [email, setEmail]= useState("");
    const [errorMessage, setErrorMessage]=useState("");

    function handleUsernameChange(e){
        setUsername(e.target.value);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
    function handleEmailChange(e){
        setEmail(e.target.value);
    }
    async function handleSignup(){
        try{
            const response = await axios.post("http://localhost:3000/signup",{
                username, email ,password
            });
            
            console.log(response);
            if (response.data.token){
                onSignup(true); //this is the setIsloggedin function passed from the parent function
                
                console.log("token : "+ response.data.token)
            }
            else {
                setErrorMessage("user not found");
                console.error("user not found");
            }
        } catch (error){
            console.error(error);
            setErrorMessage("server issue, pls retry");
        }
    }

    function handleRetry(){
        setErrorMessage("");
    }

    return(
        <div className='loginCard'>
            <input type="text" id="username" placeholder='Username' onChange={handleUsernameChange} /> <br />
            <input type="text" id="email" placeholder='Email' onChange={handleEmailChange} /> <br />
            <input type="text" id="password" placeholder='Password' onChange={handlePasswordChange} /><br /><br />
            <button onClick={handleSignup}> Signup </button>
            {errorMessage && (
                <>
                    <p>{errorMessage}</p>
                    <button onClick={handleRetry}> Retry</button>
                </>
            )}
        </div>
    );
}
export default SignupCard;

