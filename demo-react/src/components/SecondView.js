import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const SecondView = ({msg}) => {
  const [string, setString] = useState('nothing');
  const [chartData, setChartData] = useState([5, 20, 36, 10, 10, 20]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    chartInstance.current = echarts.init(chartRef.current);
    updateChart();
  }, []);

  const getData1 = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/sentiments');
      console.log(response.data);
      setChartData(response.data);
      updateChart();
    } catch (error) {
      console.log(error);
    }
  };

  const getData2 = async () => {
    try {
      setString(string + 'sth');
    } catch (error) {
      console.log(error);
    }
  };

  const updateChart = () => {
    chartInstance.current.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: chartData,
          type: 'line',
        },
      ],
    });
  };

  return (
    <div>
      <div ref={chartRef} style={{height: '300px'}}></div>
      <button onClick={getData1}>Update Chart</button>
      <h1>This is 2nd View</h1>
      <ul>{string}</ul>
      <button onClick={getData2}>Change Data</button>
    </div>
  );
};

export default SecondView;
