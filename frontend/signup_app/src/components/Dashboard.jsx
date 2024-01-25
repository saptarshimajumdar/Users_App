import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const authToken = localStorage.getItem('authToken');
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                if (authToken) {
                    const response = await axios.get("http://localhost:3000/about", {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    });
                    setData(response.data);
                    console.log(response.data);
                }

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [authToken]);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            {data ? (
                <>
                    <p>Username: {data.username}</p>
                    <p>Email: {data.email}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Dashboard;
