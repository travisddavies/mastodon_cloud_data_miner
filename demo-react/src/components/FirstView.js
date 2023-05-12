import React, { useState } from 'react';
import axios from 'axios';

const FirstView = ({msg}) => {
  const [data, setData] = useState([]);

  const getData1 = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/sentiments');
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getData2 = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/sentiments');
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={getData1}>Get Data</button>
      <h1>This is 1st View</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={getData2}>Get Data</button>
    </div>
  );
};

export default FirstView;
