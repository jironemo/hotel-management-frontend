import { useState, useEffect } from 'react';
import axios from "axios";

function App() {
  const [rooms, setRooms] = useState([]);

  // Using useEffect for data fetching
  useEffect(() => {
    axios.get('http://localhost:8080/room/')
      .then(response => {
        setRooms(response.data); // Update the state with the fetched data
      })
      .catch(error => {
        console.log(error); // Log errors (optional)
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const getColor = (status) => {
    if (status === 'AVAILABLE') {
      return 'lightgreen';
    } else if (status === 'MAINTENANCE') {
      return 'red';
    } else {
      return 'yellow';
    }
  }

  const getBackground = (roomType) => {
    if (roomType === 'DELUXE') {
      return '#ffcc77';
    } else if (roomType === 'SUPER DELUXE') {
      return '#336633';
    } else {
      return 'violet';
    }
  }
  return (
    <div>
      <center><h3>Rooms</h3></center>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {rooms.map(room => (
          <div key={room.id} style={{ height: 'auto', width: '300px', border: `5px solid ${getColor(room.roomStatus.status)}`, backgroundColor: `${getBackground(room.roomType.typeName)}`, margin: '10px', padding: '5px' }}>
            <h3>Room Number: {room.room_no}</h3>
            <p>Price: {room.roomType.price}</p>
            <p>Room Type: {room.roomType.typeName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
