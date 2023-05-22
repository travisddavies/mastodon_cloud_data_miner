// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import * as echarts from 'echarts';
//
// const MyChart = () => {
//     const [data, setData] = useState({});
//     const [states, setStates] = useState([]);
//     const chartRef = useRef(null);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             // const result = await axios.get(process.env.PUBLIC_URL + '/emoji_no_sentiment_twitter.json');
//             const result = await axios.get('http://127.0.0.1:5000/emoji_no_sentiment');
//
//             let rawData = result.data;
//             let processedData = {};
//             let stateSet = new Set();
//
//             rawData.forEach(item => {
//                 let [state, emoji] = item.key;
//                 let count = item.value;
//
//                 stateSet.add(state);
//
//                 if (!processedData[state]) {
//                     processedData[state] = {};
//                 }
//
//                 processedData[state][emoji] = count;
//             });
//
//             // Find the top 5 emojis for each state
//             for (let state in processedData) {
//                 let stateData = processedData[state];
//                 let emojis = Object.keys(stateData);
//                 emojis.sort((a, b) => stateData[b] - stateData[a]);
//                 let top5Emojis = emojis.slice(0, 5);
//                 let top5Data = {};
//                 top5Emojis.forEach(emoji => top5Data[emoji] = stateData[emoji]);
//                 processedData[state] = top5Data;
//             }
//
//             setData(processedData);
//             setStates(Array.from(stateSet));
//         };
//
//         fetchData();
//     }, []);
//
//     useEffect(() => {
//         const chartInstance = echarts.init(chartRef.current);
//         const getOption = () => {
//             let series = [];
//             for (let state in data) {
//                 let stateData = data[state];
//                 for (let emoji in stateData) {
//                     let seriesItem = series.find(item => item.name === emoji);
//                     if (!seriesItem) {
//                         seriesItem = {
//                             name: emoji,
//                             type: 'bar',
//                             stack: 'total',
//                             label: {
//                                 show: true
//                             },
//                             emphasis: {
//                                 focus: 'series'
//                             },
//                             data: new Array(states.length).fill(0)
//                         };
//                         series.push(seriesItem);
//                     }
//                     let index = states.indexOf(state);
//                     seriesItem.data[index] = stateData[emoji];
//                 }
//             }
//
//             return {
//                 tooltip: {
//                     trigger: 'axis',
//                     axisPointer: {
//                         type: 'shadow'
//                     }
//                 },
//                 legend: {
//                     data: series.map(item => item.name)
//                 },
//                 xAxis: [
//                     {
//                         type: 'value'
//                     }
//                 ],
//                 yAxis: [
//                     {
//                         type: 'category',
//                         axisTick: {show: false},
//                         data: states
//                     }
//                 ],
//                 series: series
//             };
//         }
//
//         chartInstance.setOption(getOption());
//
//         return () => {
//             chartInstance.dispose();
//         }
//     }, [data, states]);
//
//     return (
//         <div ref={chartRef} style={{ height: '500px', width: '100%' }}></div>
//     );
// }
//
// export default MyChart;

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import * as echarts from 'echarts';
//
// const EmojiNoSentiment = () => {
//     const [data, setData] = useState({});
//     const [states] = useState(["australian capital territory",
//         "new south wales", "northern territory",
//         "queensland", "south australia", "tasmania",
//         "victoria", "western australia"]);
//     const chartRef = useRef(null);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             const result = await axios.get(process.env.PUBLIC_URL + '/emoji_no_sentiment_twitter.json');
//
//             let rawData = result.data;
//             let processedData = {};
//
//             rawData.forEach(item => {
//                 let [state, emoji] = item.key;
//                 let count = item.value;
//
//                 // Only process data for the specified states
//                 if (states.includes(state)) {
//                     if (!processedData[state]) {
//                         processedData[state] = {};
//                     }
//
//                     processedData[state][emoji] = count;
//                 }
//             });
//
//             // Find the top 5 emojis for each state
//             for (let state in processedData) {
//                 let stateData = processedData[state];
//                 let emojis = Object.keys(stateData);
//                 emojis.sort((a, b) => stateData[b] - stateData[a]);
//                 let top5Emojis = emojis.slice(0, 5);
//                 let top5Data = {};
//                 top5Emojis.forEach(emoji => top5Data[emoji] = stateData[emoji]);
//                 processedData[state] = top5Data;
//             }
//
//             setData(processedData);
//         };
//
//         fetchData();
//     }, [states]);
//
//     useEffect(() => {
//         const chartInstance = echarts.init(chartRef.current);
//         const getOption = () => {
//             let series = [];
//             for (let state in data) {
//                 let stateData = data[state];
//                 for (let emoji in stateData) {
//                     let seriesItem = series.find(item => item.name === emoji);
//                     if (!seriesItem) {
//                         seriesItem = {
//                             name: emoji,
//                             type: 'bar',
//                             stack: 'total',
//                             label: {
//                                 show: true
//                             },
//                             emphasis: {
//                                 focus: 'series'
//                             },
//                             // barMaxWidth: '20%',
//                             data: new Array(states.length).fill(0)
//                         };
//                         series.push(seriesItem);
//                         // series.push({
//                         //     seriesItem,
//                         //     barMaxWidth: '20%',
//                         // });
//                     }
//                     let index = states.indexOf(state);
//                     seriesItem.data[index] = stateData[emoji];
//                 }
//             }
//
//             return {
//                 tooltip: {
//                     trigger: 'axis',
//                     axisPointer: {
//                         type: 'shadow'
//                     }
//                 },
//                 legend: {
//                     data: series.map(item => item.name)
//                 },
//                 xAxis: [
//                     {
//                         type: 'value'
//                     }
//                 ],
//                 yAxis: [
//                     {
//                         type: 'category',
//                         axisTick: {show: false},
//                         data: states
//                     }
//                 ],
//                 series: series
//             };
//         }
//
//         chartInstance.setOption(getOption());
//
//         return () => {
//             chartInstance.dispose();
//         }
//     }, [data, states]);
//
//     return (
//         <div ref={chartRef} style={{ height: '500px', width: '100%' }}></div>
//     );
// }
//
// export default EmojiNoSentiment;

// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import * as echarts from 'echarts';
//
// // https://flexiple.com/javascript/javascript-capitalize-first-letter/
// const correctFormat = (str) => {
//   const states = str.split(' ');
//   for (let i = 0; i < states.length; i++) {
//     states[i] = states[i].charAt(0).toUpperCase() + states[i].slice(1);
//   }
//   return states.join(' ').trim();
// };
// const FirstView = () => {
//   const [chartData1, setChartData1] = useState([]);
//   const chartRef = useRef(null);
//   const [chartData2, setChartData2] = useState([]);
//   const [chartData3, setChartData3] = useState([]);
//   const [chartData4, setChartData4] = useState([]);
//   const [chartData5, setChartData5] = useState([]);
//
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/emoji_with_sentiment');
//
//         const very_negative = response.data.reduce((obj, item) => {
//           if (item.key[2] === "very negative") {
//             name = correctFormat(item.key[0])
//             obj[name] = obj[name] ? obj[name] + item.value : item.value;
//           }
//           return obj;
//         }, {});
//
//         let data1 = Object.entries(very_negative).map(([name, value]) => ({ name, value }));
//
//         const negative = response.data.reduce((obj, item) => {
//           if (item.key[2] === "negative") {
//             name = correctFormat(item.key[0])
//             obj[name] = obj[name] ? obj[name] + item.value : item.value;
//           }
//           return obj;
//         }, {});
//
//         let data2 = Object.entries(negative).map(([name, value]) => ({ name, value }));
//
//         const neutral = response.data.reduce((obj, item) => {
//           if (item.key[2] === "neutral") {
//             name = correctFormat(item.key[0])
//             obj[name] = obj[name] ? obj[name] + item.value : item.value;
//           }
//           return obj;
//         }, {});
//
//         let data3 = Object.entries(neutral).map(([name, value]) => ({ name, value }));
//
//         const positive = response.data.reduce((obj, item) => {
//           if (item.key[2] === "positive") {
//             name = correctFormat(item.key[0])
//             obj[name] = obj[name] ? obj[name] + item.value : item.value;
//           }
//           return obj;
//         }, {});
//
//         let data4 = Object.entries(positive).map(([name, value]) => ({ name, value }));
//
//         const very_positive = response.data.reduce((obj, item) => {
//           if (item.key[2] === "very positive") {
//             name = correctFormat(item.key[0])
//             obj[name] = obj[name] ? obj[name] + item.value : item.value;
//           }
//           return obj;
//         }, {});
//
//         let data5 = Object.entries(very_positive).map(([name, value]) => ({ name, value }));
//
//         setChartData1(data1);
//         setChartData2(data2);
//         setChartData3(data3);
//         setChartData4(data4);
//         setChartData5(data5);
//
//       } catch (error) {
//         console.log(error);
//       }
//     };
//
//     fetchData();
//   }, []);
//
//   useEffect(() => {
//     if (chartRef.current && chartData1.length) {
//       const chart = echarts.init(chartRef.current);
//       const option = {
//         title: {
//           text: 'Number of Emoji Used Across Tweets of Different Sentiment Levels',
//           left: 'center'
//         },
//         legend: {
//           data: ['Very Negative Tweets', 'Negative Tweets', 'Neutral Tweets', 'Positive Tweets', 'Very Positive Tweets'],
//           top: 'bottom'
//         },
//         tooltip: {
//           trigger: 'axis',
//           axisPointer: {
//             type: 'shadow',
//           },
//         },
//         toolbox: {
//           show: true,
//           orient: 'vertical',
//           left: 'right',
//           top: 'center',
//           feature: {
//             mark: { show: true },
//             magicType: { show: true, type: ['bar','line','stack'] },
//             restore: { show: true },
//             saveAsImage: { show: true },
//           },
//         },
//         xAxis: [
//           {
//             type: 'category',
//             data: chartData1.map((item) => item.name),
//             name: 'States/Territory',
//             axisTick: {
//               alignWithLabel: true,
//             },
//             axisLabel:{
//               interval: 0,
//               rotate: 0,
//               fontSize: 10
//             }
//           }
//         ],
//         yAxis: [
//           {
//             type: 'value',
//             name: 'Number of Emoji used'
//           }
//         ],
//         series: [
//           {
//             name: 'Very Negative Tweets',
//             type: 'bar',
//             data: chartData1.map((item) => item.value),
//             emphasis: {
//               focus: 'series'
//             },
//           },
//           {
//             name: 'Negative Tweets',
//             type: 'bar',
//             data: chartData2.map((item) => item.value),
//             emphasis: {
//               focus: 'series'
//             },
//           },
//           {
//             name: 'Neutral Tweets',
//             type: 'bar',
//             data: chartData3.map((item) => item.value),
//             emphasis: {
//               focus: 'series'
//             },
//           },
//           {
//             name: 'Positive Tweets',
//             type: 'bar',
//             data: chartData4.map((item) => item.value),
//             emphasis: {
//               focus: 'series'
//             },
//           },
//           {
//             name: 'Very Positive Tweets',
//             type: 'bar',
//             data: chartData5.map((item) => item.value),
//             emphasis: {
//               focus: 'series'
//             },
//           },
//         ],
//       };
//
//       chart.setOption(option);
//     }
//   }, [chartData1, chartData2, chartData3, chartData4, chartData5]);
//
//   return (
//     <div ref={chartRef} style={{ width: '100%', height: '500px' }}></div>
//   );
// };
//
// export default FirstView;

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

const MapS1 = () => {
  const [data, setData] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainer = useRef(null);

  useEffect(() => {
    axios.get('/australia_state.geojson')
      .then(response => {
        const australiaMap = response.data;
        australiaMap.features = australiaMap.features.map(feature =>
          ({...feature, properties: {...feature.properties, name: feature.properties.STATE_NAME}})
        );
        echarts.registerMap('Australia', australiaMap);
        setMapLoaded(true);
      });
  }, []);

  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //           const responseClimate = await axios.get('http://127.0.0.1:5000/topic_climate');
  //           const responseTotal = await axios.get('http://127.0.0.1:5000/state_tweet_count');
  //           const responseEnv = await axios.get('http://127.0.0.1:5000/environment_sudo');
  //
  //           const totalData = responseTotal.data.map(item => ({
  //             name: item.key,
  //             value: item.value,
  //           }));
  //
  //           const climateData = responseClimate.data.map(item => ({
  //             name: item.key,
  //             value: item.value,
  //           }));
  //
  //           const environmentalData = responseEnv.data.map(item => ({
  //             name: item.key[0],
  //             greenCount: item.value[0],
  //             greenPercent: item.value[0] / item.value[1],
  //             solarCount: item.value[2],
  //             solarPercent: item.value[2] / item.value[3],
  //           }));
  //
  //           const processedData = climateData.map(item => {
  //             const totalItem = totalData.find(data => data.name === item.name);
  //             const environmentalItem = environmentalData.find(data => data.name === item.name);
  //             return {
  //               name: toTitleCase(item.name),
  //               value: item.value || 0,
  //               details: {
  //                 count: item.value || 0,
  //                 percentage: totalItem ? item.value / totalItem.value : 0,
  //                 greenCount: environmentalItem ? environmentalItem.greenCount : 0,
  //                 green: environmentalItem ? environmentalItem.greenPercent : 0,
  //                 solarCount: environmentalItem ? environmentalItem.solarCount : 0,
  //                 solar: environmentalItem ? environmentalItem.solarPercent : 0,
  //               }
  //             };
  //           });
  //
  //           setData(processedData);
  //
  //         } catch (error) {
  //           console.error(error);
  //           return [];
  //         }
  //       };
  //         fetchData();
  // }, []);

useEffect(() => {
  const fetchData = async () => {
      try {
        const responseEmoji = await axios.get('http://127.0.0.1:5000/emoji_no_sentiment');

        // Group the data by state and find the most used emojis for each state
        const stateEmojiData = responseEmoji.data.reduce((acc, item) => {
          const state = item.key[0];
          const emoji = item.key[1];
          const count = item.value;

          if (!acc[state]) {
            acc[state] = [];
          }
          acc[state].push({ emoji, count });

          return acc;
        }, {});

        // Keep only top 5 emojis for each state
        Object.keys(stateEmojiData).forEach(state => {
          stateEmojiData[state].sort((a, b) => b.count - a.count);
          stateEmojiData[state] = stateEmojiData[state].slice(0, 5);
        });

        const processedData = Object.entries(stateEmojiData).map(([state, emojis]) => {
          const emojisStr = emojis.map(({ emoji, count }) => `${emoji}  ${count}`).join('<br/>');

          return {
            name: toTitleCase(state),
            value: emojis[0].count,
            details: {
              emojis: emojisStr,
              count: emojis[0].count,
            },
          };
        });

        setData(processedData);

      } catch (error) {
        console.error(error);
        return [];
      }
  };
  fetchData();
}, []);


  useEffect(() => {
    if (mapLoaded && data.length > 0 && mapContainer.current) {
      const chart = echarts.init(mapContainer.current);
      chart.setOption({
        // tooltip: {
        //   trigger: 'item',
        //   formatter: ({name, data: {details}}) => `
        //       ${name}<br/>
        //       Tweet for Climate: ${details.count} (${(details.percentage * 100).toFixed(2)}%)<br/>
        //       Protected areas: ${details.greenCount} Ha (${(details.green * 100).toFixed(2)}%)
        //   `,
        //   showDelay: 0,
        //   transitionDuration: 0.2
        // },
        tooltip: {
          trigger: 'item',
          formatter: ({name, data: {details}}) => `
              ${name}<br/>
              Top 5 emojis:<br/>
              ${details.emojis}
          `,
          showDelay: 0,
          transitionDuration: 0.2
        },
        visualMap: {
          left: 'right',
          min: 0,
          max: 20000,
          inRange: {
            color: [
              '#313695',
              '#4575b4',
              '#74add1',
              '#abd9e9',
              '#e0f3f8',
              '#ffffbf',
              '#fee090',
              '#fdae61',
              '#f46d43',
              '#d73027',
              '#a50026'
            ]
          },
          text: ['High', 'Low'],
          calculable: true
        },
        toolbox: {
          show: true,
          left: 'left',
          top: 'top',
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: 'Emoji Usage',
            type: 'map',
            roam: true,
            map: 'Australia',
            emphasis: {
              label: {
                show: true
              }
            },
            data
          }
        ]
      });

      chart.resize();
    }
  }, [mapLoaded, data]);

  return (
      <div ref={mapContainer} style={{width: '100%', height: '80vh'}}/>
  );
}
export default MapS1;

// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import * as echarts from 'echarts';
//
// const FirstView = () => {
//   const [chartEmoji1, setChartEmoji1] = useState([]);
//   const [chartTopic1, setChartTopic1] = useState([]);
//   const [chartEmoji2, setChartEmoji2] = useState([]);
//   const [chartTopic2, setChartTopic2] = useState([]);
//   const [chartEmoji3, setChartEmoji3] = useState([]);
//   const [chartTopic3, setChartTopic3] = useState([]);
//   const [chartEmoji4, setChartEmoji4] = useState([]);
//   const [chartTopic4, setChartTopic4] = useState([]);
//   const [chartEmoji5, setChartEmoji5] = useState([]);
//   const [chartTopic5, setChartTopic5] = useState([]);
//
//   const chartRef1 = useRef(null);
//   const chartRef2 = useRef(null);
//   const chartRef3 = useRef(null);
//   const chartRef4 = useRef(null);
//   const chartRef5 = useRef(null);
//
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/emoji_with_sentiment');
//
//         const vicVeryNegative = response.data.filter(item => item.key[0] === "victoria" && item.key[2] === "very negative").map(item => ({ name: item.key[1], value: item.value }));
//
//         const sortedEmoji1 = vicVeryNegative.sort((a, b) => b.value - a.value);
//         const top10Emoji1 = sortedEmoji1.slice(0, 10);
//         const topics1 = top10Emoji1.map((item) => item.name);
//
//         const vicNegative = response.data.filter(item => item.key[0] === "victoria" && item.key[2] === "negative").map(item => ({ name: item.key[1], value: item.value }));
//
//         const sortedEmoji2 = vicNegative.sort((a, b) => b.value - a.value);
//         const top10Emoji2 = sortedEmoji2.slice(0, 10);
//         const topics2 = top10Emoji2.map((item) => item.name);
//
//         const vicNeutral = response.data.filter(item => item.key[0] === "victoria" && item.key[2] === "neutral").map(item => ({ name: item.key[1], value: item.value }));
//
//         const sortedEmoji3 = vicNeutral.sort((a, b) => b.value - a.value);
//         const top10Emoji3 = sortedEmoji3.slice(0, 10);
//         const topics3 = top10Emoji3.map((item) => item.name);
//
//         const vicPositive = response.data.filter(item => item.key[0] === "victoria" && item.key[2] === "positive").map(item => ({ name: item.key[1], value: item.value }));
//
//         const sortedEmoji4 = vicPositive.sort((a, b) => b.value - a.value);
//         const top10Emoji4 = sortedEmoji4.slice(0, 10);
//         const topics4 = top10Emoji4.map((item) => item.name);
//
//         const vicVeryPositive = response.data.filter(item => item.key[0] === "victoria" && item.key[2] === "very positive").map(item => ({ name: item.key[1], value: item.value }));
//
//         const sortedEmoji5 = vicVeryPositive.sort((a, b) => b.value - a.value);
//         const top10Emoji5 = sortedEmoji5.slice(0, 10);
//         const topics5 = top10Emoji5.map((item) => item.name);
//
//         setChartEmoji1(top10Emoji1);
//         setChartTopic1(topics1);
//         setChartEmoji2(top10Emoji2);
//         setChartTopic2(topics2);
//         setChartEmoji3(top10Emoji3);
//         setChartTopic3(topics3);
//         setChartEmoji4(top10Emoji4);
//         setChartTopic4(topics4);
//         setChartEmoji5(top10Emoji5);
//         setChartTopic5(topics5);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);
//
//   useEffect(() => {
//     const chart1 = echarts.init(chartRef1.current);
//     chart1.setOption({
//       title: {
//             text: 'Very negative tweets',
//             top: '5%',
//             left: 'center'
//         },
//         tooltip: {
//             trigger: 'item',
//             formatter: '{a} <br/>{b}: {c}'
//         },
//         legend: {
//             top: 'bottom',
//             left: 'center',
//             type: 'scroll',
//             width: '80%',
//             orient: 'horizontal',
//             data: chartTopic1
//         },
//         series: [
//             {
//                 name: 'Emoji',
//                 type: 'pie',
//                 radius: ['40%', '70%'],
//                 avoidLabelOverlap: false,
//                 itemStyle: {
//                     borderRadius: 10,
//                     borderColor: '#fff',
//                     borderWidth: 2
//                 },
//                 label: {
//                     show: false,
//                     position: 'center'
//                 },
//                 emphasis: {
//                     label: {
//                         show: true,
//                         fontSize: 40,
//                         fontWeight: 'bold'
//                     }
//                 },
//                 labelLine: {
//                     show: false
//                 },
//                 data: chartEmoji1
//             }
//         ]
//     });
//     const chart2 = echarts.init(chartRef2.current);
//     chart2.setOption({
//       title: {
//             text: 'Negative tweets',
//             top: '5%',
//             left: 'center'
//         },
//         tooltip: {
//             trigger: 'item',
//             formatter: '{a} <br/>{b}: {c}'
//         },
//         legend: {
//             top: 'bottom',
//             left: 'center',
//             type: 'scroll',
//             width: '80%',
//             orient: 'horizontal',
//             data: chartTopic2
//         },
//         series: [
//             {
//                 name: 'Emoji',
//                 type: 'pie',
//                 radius: ['40%', '70%'],
//                 avoidLabelOverlap: false,
//                 itemStyle: {
//                     borderRadius: 10,
//                     borderColor: '#fff',
//                     borderWidth: 2
//                 },
//                 label: {
//                     show: false,
//                     position: 'center'
//                 },
//                 emphasis: {
//                     label: {
//                         show: true,
//                         fontSize: 40,
//                         fontWeight: 'bold'
//                     }
//                 },
//                 labelLine: {
//                     show: false
//                 },
//                 data: chartEmoji2
//             }
//         ]
//     });
//     const chart3 = echarts.init(chartRef3.current);
//     chart3.setOption({
//       title: {
//             text: 'Neutral tweets',
//             top: '5%',
//             left: 'center'
//         },
//         tooltip: {
//             trigger: 'item',
//             formatter: '{a} <br/>{b}: {c}'
//         },
//         legend: {
//             top: 'bottom',
//             left: 'center',
//             type: 'scroll',
//             width: '80%',
//             orient: 'horizontal',
//             data: chartTopic3
//         },
//         series: [
//             {
//                 name: 'Emoji',
//                 type: 'pie',
//                 radius: ['40%', '70%'],
//                 avoidLabelOverlap: false,
//                 itemStyle: {
//                     borderRadius: 10,
//                     borderColor: '#fff',
//                     borderWidth: 2
//                 },
//                 label: {
//                     show: false,
//                     position: 'center'
//                 },
//                 emphasis: {
//                     label: {
//                         show: true,
//                         fontSize: 40,
//                         fontWeight: 'bold'
//                     }
//                 },
//                 labelLine: {
//                     show: false
//                 },
//                 data: chartEmoji3
//             }
//         ]
//     });
//     const chart4 = echarts.init(chartRef4.current);
//     chart4.setOption({
//       title: {
//             text: 'Positive tweets',
//             top: '5%',
//             left: 'center'
//         },
//         tooltip: {
//             trigger: 'item',
//             formatter: '{a} <br/>{b}: {c}'
//         },
//         legend: {
//             top: 'bottom',
//             left: 'center',
//             type: 'scroll',
//             width: '80%',
//             orient: 'horizontal',
//             data: chartTopic4
//         },
//         series: [
//             {
//                 name: 'Emoji',
//                 type: 'pie',
//                 radius: ['40%', '70%'],
//                 avoidLabelOverlap: false,
//                 itemStyle: {
//                     borderRadius: 10,
//                     borderColor: '#fff',
//                     borderWidth: 2
//                 },
//                 label: {
//                     show: false,
//                     position: 'center'
//                 },
//                 emphasis: {
//                     label: {
//                         show: true,
//                         fontSize: 40,
//                         fontWeight: 'bold'
//                     }
//                 },
//                 labelLine: {
//                     show: false
//                 },
//                 data: chartEmoji4
//             }
//         ]
//     });
//     const chart5 = echarts.init(chartRef5.current);
//     chart5.setOption({
//       title: {
//             text: 'Very positive tweets',
//             top: '5%',
//             left: 'center'
//         },
//         tooltip: {
//             trigger: 'item',
//             formatter: '{a} <br/>{b}: {c}'
//         },
//         legend: {
//             top: 'bottom',
//             left: 'center',
//             type: 'scroll',
//             width: '80%',
//             orient: 'horizontal',
//             data: chartTopic5
//         },
//         series: [
//             {
//                 name: 'Emoji',
//                 type: 'pie',
//                 radius: ['40%', '70%'],
//                 avoidLabelOverlap: false,
//                 itemStyle: {
//                     borderRadius: 10,
//                     borderColor: '#fff',
//                     borderWidth: 2
//                 },
//                 label: {
//                     show: false,
//                     position: 'center'
//                 },
//                 emphasis: {
//                     label: {
//                         show: true,
//                         fontSize: 40,
//                         fontWeight: 'bold'
//                     }
//                 },
//                 labelLine: {
//                     show: false
//                 },
//                 data: chartEmoji5
//             }
//         ]
//     });
//   }, [chartEmoji1, chartTopic1, chartEmoji2, chartTopic2, chartEmoji3, chartTopic3, chartEmoji4, chartTopic4, chartEmoji5, chartTopic5]);
//
//   return (
//     <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-evenly' }}>
//       <div ref={chartRef1} style={{width: '20%', height: '500px', overflow: 'auto'}}></div>
//       <div ref={chartRef2} style={{width: '20%', height: '500px', overflow: 'auto'}}></div>
//       <div ref={chartRef3} style={{width: '20%', height: '500px', overflow: 'auto'}}></div>
//       <div ref={chartRef4} style={{width: '20%', height: '500px', overflow: 'auto'}}></div>
//       <div ref={chartRef5} style={{width: '20%', height: '500px', overflow: 'auto'}}></div>
//     </div>
//   );
// };
//
// export default FirstView;
