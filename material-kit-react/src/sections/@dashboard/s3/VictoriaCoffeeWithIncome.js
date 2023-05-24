import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const correctFormat = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
const VictoriaCoffeeWithIncome = () => {
  const [chartData1, setChartData1] = useState([]);
  const chartRef1 = useRef(null);
  const [chartData2, setChartData2] = useState([]);
  const chartRef2 = useRef(null);
  const [coffeeTweets, setCoffeeTweets] = useState({});
  const [vicTweets, setVicTweets] = useState({});

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response1 = await axios.get('http://localhost:5000/topic_coffee');
        const response2 = await axios.get('http://localhost:5000/victoria_tweet_count');
        const response3 = await axios.get('http://localhost:5000/local_median_age_and_weekly_income_sudo');

        const coffeeTweets = response1.data.reduce((obj, item) => {
          obj[item.key] = item.value;
          return obj;
        }, {});

        const vicTweets = response2.data.reduce((obj, item) => {
          obj[item.key] = item.value;
          return obj;
        }, {});

        setCoffeeTweets(coffeeTweets);
        setVicTweets(vicTweets);

        const medianIncome = response3.data.reduce((obj, item) => {
          obj[item.key[0]] = item.value[1];
          return obj;
        }, {});

        const data1 = Object.keys(coffeeTweets)
          .filter((key) => medianIncome[key])
          .map((key) => ({
            name: correctFormat(key),
            value: ((coffeeTweets[key] / vicTweets[key]) * 100).toFixed(2),
          }));


        const top10 = data1.sort((a, b) => b.value - a.value).slice(0, 10);

        const data2 = top10.map((item) => ({
          name: item.name,
          value: medianIncome[item.name.toLowerCase()],
        }));
        setChartData1(top10);
        setChartData2(data2);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData1();
  }, []);

  // https://echarts.apache.org/examples/en/editor.html?c=bar-label-rotation
  useEffect(() => {
    if (chartRef1.current && chartData1.length) {
      const chart = echarts.init(chartRef1.current);

      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            const param = params[0];
            const coffeeTweetsNum = coffeeTweets[param.name.toLowerCase()];
            const vicTweetsNum = vicTweets[param.name.toLowerCase()];
            return `${param.name}<br>Coffee tweets percentage: ${param.value}%<br>Coffee tweets count: ${coffeeTweetsNum}<br>City tweets count: ${vicTweetsNum}`;
          },
          axisPointer: {
            type: 'shadow',
          },
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            magicType: { show: true, type: ['line', 'bar'] },
            saveAsImage: { show: true },
          },
        },
        xAxis: {
          type: 'category',
          data: chartData1.map((item) => item.name),
          axisTick: {
            show: false,
          },
          axisLabel:{
            interval: 0,
            rotate: 0,
            fontSize: 10
          }
        },
        yAxis: [
          {
            type: 'value',
            name: 'Tweets about Coffee (%)',
            splitNumber: 10,
            max: 5,
          },
          {
            type: 'value',
            name: 'Median Weekly Income ($)',
            position: 'right',
            splitNumber: 10,
            max: 1000,
          },
        ],
        series: [
          {
            name: 'Tweets about Coffee',
            type: 'bar',
            yAxisIndex: 0,
            data: chartData1.map((item) => item.value),
            barGap: 0,
            label: {
              show: true,
              position: 'top',
              formatter: '{c}%',
            },
          },
          {
            name: 'Median Weekly Income',
            type: 'bar',
            yAxisIndex: 1,
            data: chartData2.map((item) => item.value),
            label: {
              show: true,
              position: 'top',
              formatter: `{c}`,
            },
          },
        ],
      };

      chart.setOption(option);
    }
  }, [chartData1, chartData2, chartRef1, chartRef2, coffeeTweets, vicTweets]);

  return (
    <div ref={chartRef1} style={{ width: '100%', height: '500px' }}/>
  );
};

export default VictoriaCoffeeWithIncome;
