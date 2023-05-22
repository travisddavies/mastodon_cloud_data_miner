import React, { useEffect, useState, useRef } from 'react';
import * as echarts from 'echarts';
import { processData } from './dataProcessorClimate';

const ComparisonLineChartS1 = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const processedData = await processData();
      setData(processedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const stateNames = data.map(item =>
        item.name
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ')
      );
      const tweetPercentages = data.map(item => (item.details.percentage * 100).toFixed(2));

      const option1 = {
        title: {
          text: 'Tweet Percentage(%)'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Tweet Percentage(%)']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            magicType:{show: true, type:['line','bar']}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: stateNames,
          axisLabel: {
            interval: 0,
            rotate: 0,
            fontSize: 9
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Tweet Percentage(%)',
            type: 'line',
            data: tweetPercentages,
            itemStyle: {
            color: '#92B0C5' // Set the color for the first chart
            }
          },
        ]
      };

      const chartInstance = echarts.init(chartRef1.current);
      chartInstance.setOption(option1);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const processedData = await processData();
      setData(processedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const stateNames = data.map(item =>
        item.name
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ')
      );
      const protectedAreaPercentages = data.map(item => (item.details.green * 100).toFixed(2));

      const option2 = {
        title: {
          text: 'Protected Area Percentage(%)'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Protected Area Percentage(%)']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            magicType:{show: true, type:['line','bar']}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: stateNames,
          axisLabel: {
            interval: 0,
            rotate: 0,
            fontSize: 9
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Protected Area Percentage(%)',
            type: 'line',
            data: protectedAreaPercentages,
            itemStyle: {
            color: '#E8D954' // Set the color for the first chart
            }
          },
        ]
      };

      const chartInstance = echarts.init(chartRef2.current);
      chartInstance.setOption(option2);
    }
  }, [data]);

  return (
      <div style={{ display: 'display: flex; flex-direction: row;'}}>
        <div ref={chartRef1} style={{ height: '400px', width: '100%' }}/>
        <div ref={chartRef2} style={{ height: '400px', width: '100%' }}/>

      </div>
  );
};
export default ComparisonLineChartS1;
