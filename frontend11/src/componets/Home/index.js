import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import axios from 'axios';  
import './index.css';  

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sqldata'); 
        const data = response.data;
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClickDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/auth/delete/${id}`);  
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  return (
    <div className="container">
      <div> 
        <h1 className='heading'>Welcome to our application</h1>
        <ul className='ulelements'>
          {users.map(user => (
            <li className='licontuaner' key={user.id}>
              <div className='containerofdiv'> 
                <p style={{color:"navy"}}><strong style={{color:"#ca2c92"}}>FirstName:</strong> {user.firstName}</p>
                <button className='btn btn-danger buttonstyles' onClick={() => handleClickDelete(user.id)}><MdDelete className="icon-values"/></button>
              </div>
              <p style={{color:"#7cfc00"}}><strong style={{color:"#ca2c92"}}>LastName:</strong> {user.lastName}</p>
              <p style={{color:"#7cfc00"}}><strong style={{color:"#ca2c92"}}>MobileNumber:</strong> {user.mobileNUmber}</p>
              <p style={{color:"#002147"}}><strong style={{color:"red"}}>Email:</strong> {user.email}</p>
              <p style={{color:"#7cfc00"}}><strong style={{color:"#ca2c92"}}>Password:</strong> {user.password}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="moving-image-container">
        <img src="https://i.ibb.co/Y2qwnHT/robot.png" alt="Moving" className="moving-image" />
      </div>
    </div>
  );
}

export default Home;
