import React, { useEffect, useState, useRef } from 'react';
import * as echarts from 'echarts';
import axios from "axios";
import { processData } from './dataProcessorClimate';


const ComparisonWithTesla = () => {
  const chartRef1 = useRef(null);
  const [chartTesla, setChartTesla] = useState([]);
  const [data, setData] = useState([]);
  const [chartProcessedData, setProcessedData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const processedData = await processData();
      setData(processedData);
    };
    fetchData();
  }, []);

  useEffect(() => {
        const fetchData1 = async () => {
            try {
                const response1 = await axios.get('http://127.0.0.1:5000/topic_tesla_related_climate');
                const responseTotal = await axios.get('http://127.0.0.1:5000/state_tweet_count');

                const Tesla = response1.data.map((item) => ({
                    name: item.key,
                    value: item.value
                }));

                const totalData = responseTotal.data.map(item => ({
                      name: item.key,
                      value: item.value,
                }));

                const processedData1 = Tesla.map(item => {
                const totalItem = totalData.find(data => data.name === item.name);
                    return {
                      name: item.name,
                      value: totalItem ? item.value / totalItem.value : 0
                    };
                });

                setChartTesla(Tesla);
                setProcessedData(processedData1);

            } catch (error) {
                console.log(error);
            }
        };
            fetchData1();
        }, []);

  useEffect(() => {
    const chart = echarts.init(chartRef1.current)
    if (data.length > 0) {
      const stateNames = data.map(item =>
        item.name
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ')
      );
      const tweetPercentages = data.map(item => (item.details.percentage * 100).toFixed(2));
      const teslaPercentage = chartProcessedData.map(item => (item.value * 100).toFixed(2));

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Climate Tweet Percentage (%)', 'Tesla Tweet Percentage (%)']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            splitNumber: 10,
            max: 0.7,
          },
          {
            type: 'value',
            splitNumber: 10,
            max: 0.7,
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            data: stateNames
          }
        ],
        series: [
          {
            name: 'Climate Tweet Percentage (%)',
            type: 'bar',
            xAxisIndex: 1,
            label: {
              show: true,
              position: 'inside'
            },
            emphasis: {
              focus: 'series'
            },
            data: tweetPercentages
          },
          {
            name: 'Tesla Tweet Percentage (%)',
            type: 'bar',
            stack: 'Total',
            xAxisIndex: 0,
            label: {
              show: true,
              position: 'inside'
            },
            emphasis: {
              focus: 'series'
            },
            data: teslaPercentage
          }
        ]
      }
      chart.setOption(option);
    }
  }, [chartRef1,data,chartTesla, chartProcessedData]);

  useEffect(() => {
    const fetchData = async () => {
      const processedData = await processData();
      setData(processedData);
    };
    fetchData();
  }, []);

  return (
      <div style={{ display: 'display: flex; flex-direction: row;'}}>
        <div ref={chartRef1} style={{ height: '400px', width: '100%' }}/>
      </div>
  );
};

export default ComparisonWithTesla;