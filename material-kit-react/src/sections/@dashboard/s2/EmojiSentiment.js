import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const correctFormat = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

const EmojiSentiment = () => {
  const [chartData1, setChartData1] = useState([]);
  const chartRef = useRef(null);
  const [chartData2, setChartData2] = useState([]);
  const [chartData3, setChartData3] = useState([]);
  const [chartData4, setChartData4] = useState([]);
  const [chartData5, setChartData5] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/emoji_with_sentiment');

        const veryNegative = response.data.reduce((obj, item) => {
          if (item.key[2] === "very negative") {
            const x = correctFormat(item.key[0])
            obj[x] = obj[x] ? obj[x] + item.value : item.value;
          }
          return obj;
        }, {});

        const data1 = Object.entries(veryNegative).map(([name, value]) => ({ name, value }));

        const negative = response.data.reduce((obj, item) => {
          if (item.key[2] === "negative") {
            const x1 = correctFormat(item.key[0])
            obj[x1] = obj[x1] ? obj[x1] + item.value : item.value;
          }
          return obj;
        }, {});

        const data2 = Object.entries(negative).map(([name, value]) => ({ name, value }));

        const neutral = response.data.reduce((obj, item) => {
          if (item.key[2] === "neutral") {
            const x2 = correctFormat(item.key[0])
            obj[x2] = obj[x2] ? obj[x2] + item.value : item.value;
          }
          return obj;
        }, {});

        const data3 = Object.entries(neutral).map(([name, value]) => ({ name, value }));

        const positive = response.data.reduce((obj, item) => {
          if (item.key[2] === "positive") {
            const x3 = correctFormat(item.key[0])
            obj[x3] = obj[x3] ? obj[x3] + item.value : item.value;
          }
          return obj;
        }, {});

        const data4 = Object.entries(positive).map(([name, value]) => ({ name, value }));

        const veryPositive = response.data.reduce((obj, item) => {
          if (item.key[2] === "very positive") {
            const x4 = correctFormat(item.key[0])
            obj[x4] = obj[x4] ? obj[x4] + item.value : item.value;
          }
          return obj;
        }, {});

        const data5 = Object.entries(veryPositive).map(([name, value]) => ({ name, value }));

        setChartData1(data1);
        setChartData2(data2);
        setChartData3(data3);
        setChartData4(data4);
        setChartData5(data5);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current && chartData1.length) {
      const chart = echarts.init(chartRef.current);
      const option = {
        legend: {
          data: ['Very Negative Tweets', 'Negative Tweets', 'Neutral Tweets', 'Positive Tweets', 'Very Positive Tweets'],
          top: 'bottom'
        },
        tooltip: {
          trigger: 'axis',
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
            magicType: { show: true, type: ['bar','stack'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: 'category',
            data: chartData1.map((item) => item.name),
            name: 'States/Territory',
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel:{
              interval: 0,
              rotate: 15,
              fontSize: 8
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Number of Emoji used'
          }
        ],
        series: [
          {
            name: 'Very Negative Tweets',
            type: 'bar',
            data: chartData1.map((item) => item.value),
            emphasis: {
              focus: 'series'
            },
          },
          {
            name: 'Negative Tweets',
            type: 'bar',
            data: chartData2.map((item) => item.value),
            emphasis: {
              focus: 'series'
            },
          },
          {
            name: 'Neutral Tweets',
            type: 'bar',
            data: chartData3.map((item) => item.value),
            emphasis: {
              focus: 'series'
            },
          },
          {
            name: 'Positive Tweets',
            type: 'bar',
            data: chartData4.map((item) => item.value),
            emphasis: {
              focus: 'series'
            },
          },
          {
            name: 'Very Positive Tweets',
            type: 'bar',
            data: chartData5.map((item) => item.value),
            emphasis: {
              focus: 'series'
            },
          },
        ],
      };

      chart.setOption(option);
    }
  }, [chartData1, chartData2, chartData3, chartData4, chartData5]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '500px' }}/>
  );
};

export default EmojiSentiment;
