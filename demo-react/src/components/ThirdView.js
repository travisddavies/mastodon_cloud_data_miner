// mapbox
// import React, { useRef, useState, useEffect } from "react";
// import axios from "axios";
// import mapboxgl from "mapbox-gl";
//
// // function ThirdView() {
// //   const [data, setData] = useState([]);
// //   // const [setMap] = useState(null);
// //   // const [center] = useState([144.9695, -37.8227]);
// //
// //   useEffect(() => {
// //     mapboxgl.accessToken = "pk.eyJ1IjoibGlhbmd5dWVzIiwiYSI6ImNsaDIwbXRxajE4eXQzZnMyc210NDhjaHYifQ.SaeQkPTRGqcLrmBfQe_lhw";
// //     const map = new mapboxgl.Map({
// //       container: "map",
// //       // container: mapContainerRef.current,
// //       style: "mapbox://styles/liangyues/clhhgk9zp00hl01pwevs69b76",
// //       // center: center, // Melbourne
// //       center: [144.9695, -37.8227], // Melbourne
// //       zoom: 10,
// //     });
// //     // setMap(mapboxMap);
// //   }, []);
// //
// //   const getData1 = async () => {
// //     try {
// //       const response = await axios.get("http://127.0.0.1:5000/sentiments");
// //       setData(response.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };
// //
// //   const getData2 = async () => {
// //     try {
// //       const response = await axios.post("http://127.0.0.1:8080/api_1");
// //       setData(response.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };
// //
// //   return (
// //     <div>
// //       <div id="map" style={{ height: "500px" }}></div>
// //       <button onClick={getData1}>Update Map</button>
// //       <h1>This is 3rd View</h1>
// //       <ul>{data}</ul>
// //       <button onClick={getData2}>Change Data</button>
// //     </div>
// //   );
// // };
// //
// // export default ThirdView;
//
//
// mapboxgl.accessToken = "pk.eyJ1IjoibGlhbmd5dWVzIiwiYSI6ImNsaDIwbXRxajE4eXQzZnMyc210NDhjaHYifQ.SaeQkPTRGqcLrmBfQe_lhw";
//
// export default function ThirdView() {
//   // var mapContainer = useRef(null);
//   var map = useRef(null);
//   const [lng] = useState(145.3607);
//   const [lat] = useState(-37.8636);
//   const [zoom] = useState(10);
//   const [data, setData] = useState([]);
//
//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       // container: mapContainer.current,
//       container: 'map',
//       style: "mapbox://styles/liangyues/clhhgk9zp00hl01pwevs69b76",
//       center: [lng, lat],
//       zoom: zoom
//     });
//   });
//
//   const getData1 = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:5000/sentiments");
//       setData(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//
//   const getData2 = async () => {
//     try {
//       const response = await axios.post("http://127.0.0.1:8080/api_1");
//       setData(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//
//   return (
//     <div>
//       <div id="map" style={{ height: "500px" }}></div>
//       <button onClick={getData1}>Update Map</button>
//       <h1>This is 3rd View</h1>
//       <ul>{data}</ul>
//       <button onClick={getData2}>Change Data</button>
//     </div>
//   );
//
// }

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

// https://flexiple.com/javascript/javascript-capitalize-first-letter/
const correctFormat = (str) => {
  const states = str.split(' ');
  for (let i = 0; i < states.length; i++) {
    states[i] = states[i].charAt(0).toUpperCase() + states[i].slice(1);
  }
  return states.join(' ').trim();
};
const BarchartS3 = () => {
  const [chartData1, setChartData1] = useState([]);
  const chartRef1 = useRef(null);
  const [chartData2, setChartData2] = useState([]);
  const chartRef2 = useRef(null);
  const [coffeeTweets, setCoffeeTweets] = useState({});
  const [vicTweets, setVicTweets] = useState({});

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response1 = await axios.get('http://127.0.0.1:5000/topic_coffee');
        const response2 = await axios.get('http://127.0.0.1:5000/victoria_tweet_count');
        const response3 = await axios.get('http://127.0.0.1:5000/local_median_age_and_weekly_income_sudo');

        const coffee_tweets = response1.data.reduce((obj, item) => {
          obj[item.key] = item.value;
          return obj;
        }, {});

        const vic_tweets = response2.data.reduce((obj, item) => {
          obj[item.key] = item.value;
          return obj;
        }, {});

        setCoffeeTweets(coffee_tweets);
        setVicTweets(vic_tweets);

        const median_income = response3.data.reduce((obj, item) => {
          obj[item.key[0]] = item.value[1];
          return obj;
        }, {});

        const data1 = Object.keys(coffee_tweets).map((key) => {
          if (median_income[key]) {
            return {
              name: correctFormat(key),
              value: ((coffee_tweets[key] / vic_tweets[key]) * 100).toFixed(2),
            };
          } else {
            return null;
          }
        }).filter((item) => item !== null);

        const top10 = data1.sort((a, b) => b.value - a.value).slice(0, 10);

        const data2 = top10.map((item) => {
          return {
            name: item.name,
            value: median_income[item.name.toLowerCase()],
          };
        });

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
          formatter: function (params) {
            let param = params[0];
            let coffee_tweets_num = coffeeTweets[param.name.toLowerCase()];
            let vic_tweets_num = vicTweets[param.name.toLowerCase()];
            return `${param.name}<br>Coffee tweets percentage: ${param.value}%<br>Coffee tweets count: ${coffee_tweets_num}<br>City tweets count: ${vic_tweets_num}`;
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
              formatter: '${c}',
            },
          },
        ],
      };

      chart.setOption(option);
    }
  }, [chartData1, chartData2, chartRef1, chartRef2, coffeeTweets, vicTweets]);

  return (
    <div ref={chartRef1} style={{ width: '100%', height: '500px' }}></div>
  );
};

export default BarchartS3;
