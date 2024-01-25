import { useState } from 'react'
import axios from 'axios';

function LoginCard({onLogin}){
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [errorMessage, setErrorMessage]=useState("");
    function handleUsernameChange(e){
        setUsername(e.target.value);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
    async function handleLogin(){
        try{
            const response = await axios.post("http://localhost:3000/signin",{
                username, password
            });

            if (response.data.token){
                onLogin(true);
                localStorage.setItem("authToken",response.data.token);
                console.log("token : "+ response.data.token);
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
            <input type="text" id="password" placeholder='Password' onChange={handlePasswordChange} /><br /><br />
            <button onClick={handleLogin}> Login </button>
            {errorMessage && (
                <>
                    <p>{errorMessage}</p>
                    <button onClick={handleRetry}> Retry</button>
                </>
            )}
        </div>
    );
}
export default LoginCard;