import { useState, useEffect } from 'react';
import axios from "axios";

function App() {
  const [rooms, setRooms] = useState([]);

  // Using useEffect for data fetching
  useEffect(() => {
    axios.get('http://localhost:8080/all-rooms')
      .then(response => {
        setRooms(response.data); // Update the state with the fetched data
      })
      .catch(error => {
        console.log(error); // Log errors (optional)
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const getColor = (status) => {
    if(status === 'AVAILABLE'){
      return 'green';
    }else if(status === 'UNDER_MAINTENANCE'){
      return 'red';
    }else{
      return 'yellow';
    }
  }
  return (
      <div>
        <center><h3>Rooms</h3></center>
        <div style={{display: 'flex', flexWrap: 'wrap' /* center the div */ ,justifyContent: 'center'}}>
          {rooms.map(room => (
            <div key = {room.id} style={{height:'100px',width:'300px',border: `2px solid ${getColor(room.roomStatus.status)}`, margin: '10px',padding:'5px'}}>
              <h3>Room Number: {room.roomNo}</h3>
              <p>Price: {room.roomType.price}</p>  
            </div>
          ))}
        </div>
        </div>
  );
}

export default App;
