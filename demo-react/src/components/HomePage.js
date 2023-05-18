// import React from 'react';
//
// function home() {
//   return <div>Homepage</div>;
// }
//
// export default home;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ReactEcharts from 'echarts-for-react';
// import * as echarts from 'echarts/core';
//
// const MyMap = () => {
//   const [option, setOption] = useState({});
//
//   useEffect(() => {
//     axios.get('australia_state.geojson')
//       .then(res => {
//         const australiaMap = res.data;
//         echarts.registerMap('Australia', australiaMap);
//
//         return axios.get('state_tweet_count_demo.json');
//       })
//       .then(res => {
//         const tweetData = res.data.map(item => ({
//           name: item.key[0],
//           value: item.value,
//         }));
//
//         setOption({
//           title: {
//             text: 'Australia Population Estimates (2023)',
//             left: 'right'
//           },
//           tooltip: {
//             trigger: 'item',
//             showDelay: 0,
//             transitionDuration: 0.2
//           },
//           visualMap: {
//             left: 'right',
//             min: 0,
//             max: 1000, // Please set this according to your data
//             inRange: {
//               color: [
//                 '#313695',
//                 '#4575b4',
//                 '#74add1',
//                 '#abd9e9',
//                 '#e0f3f8',
//                 '#ffffbf',
//                 '#fee090',
//                 '#fdae61',
//                 '#f46d43',
//                 '#d73027',
//                 '#a50026'
//               ]
//             },
//             text: ['High', 'Low'],
//             calculable: true
//           },
//           toolbox: {
//             show: true,
//             left: 'left',
//             top: 'top',
//             feature: {
//               dataView: { readOnly: false },
//               restore: {},
//               saveAsImage: {}
//             }
//           },
//           series: [
//             {
//               name: 'Australia PopEstimates',
//               type: 'map',
//               roam: true,
//               map: 'Australia',
//               emphasis: {
//                 label: {
//                   show: true
//                 }
//               },
//               data: tweetData
//             }
//           ]
//         });
//       });
//   }, []);
//
//   return (
//     <ReactEcharts option={option} />
//   );
// }
//
// export default MyMap;
