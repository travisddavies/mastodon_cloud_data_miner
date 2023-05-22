import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const correctFormat = (str) => {
  const states = str.split(' ');
  for (let i = 0; i < states.length; i++) {
    states[i] = states[i].charAt(0).toUpperCase() + states[i].slice(1);
  }
  return states.join(' ').trim();
};

const FirstView = () => {
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
        const response1 = await axios.get('http://127.0.0.1:5000/emoji_with_sentiment');

        const very_negative = response1.data.reduce((obj, item) => {
          if (item.key[2] === "very negative") {
            obj[item.key[1]] = item.value;
          }
          return obj;
        }, {});

        let total_very_negative = Object.values(very_negative).reduce((sum, value) => sum + value, 0);

        const negative = response1.data.reduce((obj, item) => {
          if (item.key[2] === "negative") {
            obj[item.key[1]] = item.value;
          }
          return obj;
        }, {});

        let total_negative = Object.values(negative).reduce((sum, value) => sum + value, 0);

        const neutral = response1.data.reduce((obj, item) => {
          if (item.key[2] === "neutral") {
            obj[item.key[1]] = item.value;
          }
          return obj;
        }, {});

        let total_neutral = Object.values(neutral).reduce((sum, value) => sum + value, 0);

        const positive = response1.data.reduce((obj, item) => {
          if (item.key[2] === "positive") {
            obj[item.key[1]] = item.value;
          }
          return obj;
        }, {});

        let total_positive = Object.values(positive).reduce((sum, value) => sum + value, 0);

        const very_positive = response1.data.reduce((obj, item) => {
          if (item.key[2] === "very positive") {
            obj[item.key[1]] = item.value;
          }
          return obj;
        }, {});

        let total_very_positive = Object.values(very_positive).reduce((sum, value) => sum + value, 0);

        counts({
          very_negative: total_very_negative,
          negative: total_negative,
          neutral: total_neutral,
          positive: total_positive,
          very_positive: total_very_positive,
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
      title: {
        text: 'Radar Chart for Emoji Usage'
      },
      radar: {
        indicator: [
          { name: 'very negative', max: 30000 },
          { name: 'negative', max: 30000 },
          { name: 'neutral', max: 30000 },
          { name: 'positive', max: 30000 },
          { name: 'very positive', max: 30000 }
        ]
      },
      series: [
        {
          type: 'radar',
          areaStyle: {},
          data: [
            {
              value: [type.very_negative, type.negative, type.neutral, type.positive, type.very_positive],
            }
          ]
        }
      ]
    };

    chartInstance.setOption(option);
  }, [type]);

  return (
    <div ref={chartRef1} style={{ width: '100%', height: '500px' }}></div>
  );
};

export default FirstView;
