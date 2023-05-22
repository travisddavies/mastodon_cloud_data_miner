import React, { useEffect, useState, useRef } from 'react';
import * as echarts from 'echarts';
import { processData } from './dataProcessorClimate';

const ComparisonLineChartS1 = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const processedData = await processData();
      console.log(processedData)
      setData(processedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      // const stateNames = data.map(item =>
      //   item.name
      //     .split(' ')
      //     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      //     .join(' ')
      // );
      const stateNames = data.map(item => item.name);
      const tweetPercentages = data.map(item => (item.details.percentage * 10000).toFixed(2));
      const protectedAreaPercentages = data.map(item => (item.details.green * 100).toFixed(2));
      const solarPanelPercentages = data.map(item => item.details.solar.toFixed(2));
      console.log(stateNames)
      console.log(tweetPercentages)

      const option = {
        title: {
          text: 'Comparison'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Tweet Percentage(‰)', 'Protected Area Percentage(%)', 'Solar Panel Installation']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: stateNames,
          axisLabel: {
            interval: 0,
            rotate: 45
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Tweet Percentage(‰)',
            type: 'line',
            data: tweetPercentages
          },
          {
            name: 'Protected Area Percentage(%)',
            type: 'line',
            data: protectedAreaPercentages
          },
          {
            name: 'Solar Panel Installation',
            type: 'line',
            data: solarPanelPercentages
          }
        ]
      };

      const chartInstance = echarts.init(chartRef.current);
      chartInstance.setOption(option);
    }
  }, [data]);

  return <div ref={chartRef} style={{ height: '400px', width: '100%' }} />;
};

export default ComparisonLineChartS1;