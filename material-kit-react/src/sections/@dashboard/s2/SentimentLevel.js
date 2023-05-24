import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const SentimentRadar = () => {
  const [type, counts] = useState({
    very_negative: 0,
    negative: 0,
    neutral: 0,
    positive: 0,
    very_positive: 0,
  });
  const chartRef1 = useRef(null);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response1 = await axios.get('http://localhost:5000/emoji_with_sentiment');

        const veryNegative = response1.data.reduce((obj, item) => {
          if (item.key[2] === "very negative") {
            obj[item.key[1]] = item.value;
          }
          return obj;
        }, {});

        const totalVeryNegative = Object.values(veryNegative).reduce((sum, value) => sum + value, 0);

        const negative = response1.data.reduce((obj, item) => {
          if (item.key[2] === "negative") {
            obj[item.key[1]] = item.value;
          }
          return obj;
        }, {});

        const totalNegative = Object.values(negative).reduce((sum, value) => sum + value, 0);

        const neutral = response1.data.reduce((obj, item) => {
          if (item.key[2] === "neutral") {
            obj[item.key[1]] = item.value;
          }
          return obj;
        }, {});

        const totalNeutral = Object.values(neutral).reduce((sum, value) => sum + value, 0);

        const positive = response1.data.reduce((obj, item) => {
          if (item.key[2] === "positive") {
            obj[item.key[1]] = item.value;
          }
          return obj;
        }, {});

        const totalPositive = Object.values(positive).reduce((sum, value) => sum + value, 0);

        const veryPositive = response1.data.reduce((obj, item) => {
          if (item.key[2] === "very positive") {
            obj[item.key[1]] = item.value;
          }
          return obj;
        }, {});

        const totalVeryPositive = Object.values(veryPositive).reduce((sum, value) => sum + value, 0);

        counts({
          very_negative: totalVeryNegative,
          negative: totalNegative,
          neutral: totalNeutral,
          positive: totalPositive,
          very_positive: totalVeryPositive,
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchData1();
  }, []);

  useEffect(() => {
    if (!chartRef1.current) return;
    const chartInstance = echarts.init(chartRef1.current);

    const option = {
      radar: {
        indicator: [
          { name: 'neutral', max: 30000, nameTextStyle: {fontSize: 10, color: 'black'} },
          { name: 'positive', max: 30000, nameTextStyle: {fontSize: 10, color: 'black'} },
          { name: 'very positive', max: 30000, nameTextStyle: {fontSize: 10, color: 'black'} },
          { name: 'very negative', max: 30000, nameTextStyle: {fontSize: 10, color: 'black'} },
          { name: 'negative', max: 30000, nameTextStyle: {fontSize: 10, color: 'black'} }
        ],
        center: ['50%', '50%'],
        radius: '70%'
      },
      series: [
        {
          type: 'radar',
          areaStyle: {},
          data: [
            {
              value: [type.neutral, type.positive, type.very_positive, type.very_negative, type.negative],
            }
          ]
        }
      ]
    };

    chartInstance.setOption(option);

  }, [type]);

  return (
    <div ref={chartRef1} style={{ width: '100%', height: '450px' }}/>
  );
};

export default SentimentRadar;


