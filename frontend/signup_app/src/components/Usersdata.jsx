import { useEffect, useState } from 'react';
import axios from 'axios';

function Usersdata(){
    const authToken= localStorage.getItem('authToken');
    const [data, setData]= useState(null);
    useEffect(()=>{
        async function fetchData(){
            try{
                if (authToken){
                    const response = await axios.get("http://localhost:3000/users",{
                        headers :{
                            Authorization : `Bearer ${authToken}`
                        }
                    })
                    setData(response.data);
                    console.log(response.data);
                }

            }catch(error){
                console.error(error);
            }
        }
        fetchData();
    },[])
    return (<>
        <h1>Other users : </h1> 
        <ul>
            {data && data.map((user,index)=>(
                <li key={index}>
                    <p>Username : {user.username}</p>
                    <p>Email : {user.email}</p>
                </li>
            ))}
        </ul>
    </>)
}
export default Usersdata;


