import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const SentimentVictoria = () => {
  const [chartEmoji1, setChartEmoji1] = useState([]);
  const [chartTopic1, setChartTopic1] = useState([]);
  const [chartEmoji2, setChartEmoji2] = useState([]);
  const [chartTopic2, setChartTopic2] = useState([]);
  const [chartEmoji3, setChartEmoji3] = useState([]);
  const [chartTopic3, setChartTopic3] = useState([]);
  const [chartEmoji4, setChartEmoji4] = useState([]);
  const [chartTopic4, setChartTopic4] = useState([]);
  const [chartEmoji5, setChartEmoji5] = useState([]);
  const [chartTopic5, setChartTopic5] = useState([]);

  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const chartRef4 = useRef(null);
  const chartRef5 = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/emoji_with_sentiment');

        const vicVeryNegative = response.data.filter(item => item.key[0] === "victoria" && item.key[2] === "very negative").map(item => ({ name: item.key[1], value: item.value }));

        const sortedEmoji1 = vicVeryNegative.sort((a, b) => b.value - a.value);
        const top10Emoji1 = sortedEmoji1.slice(0, 10);
        const topics1 = top10Emoji1.map((item) => item.name);

        const vicNegative = response.data.filter(item => item.key[0] === "victoria" && item.key[2] === "negative").map(item => ({ name: item.key[1], value: item.value }));

        const sortedEmoji2 = vicNegative.sort((a, b) => b.value - a.value);
        const top10Emoji2 = sortedEmoji2.slice(0, 10);
        const topics2 = top10Emoji2.map((item) => item.name);

        const vicNeutral = response.data.filter(item => item.key[0] === "victoria" && item.key[2] === "neutral").map(item => ({ name: item.key[1], value: item.value }));

        const sortedEmoji3 = vicNeutral.sort((a, b) => b.value - a.value);
        const top10Emoji3 = sortedEmoji3.slice(0, 10);
        const topics3 = top10Emoji3.map((item) => item.name);

        const vicPositive = response.data.filter(item => item.key[0] === "victoria" && item.key[2] === "positive").map(item => ({ name: item.key[1], value: item.value }));

        const sortedEmoji4 = vicPositive.sort((a, b) => b.value - a.value);
        const top10Emoji4 = sortedEmoji4.slice(0, 10);
        const topics4 = top10Emoji4.map((item) => item.name);

        const vicVeryPositive = response.data.filter(item => item.key[0] === "victoria" && item.key[2] === "very positive").map(item => ({ name: item.key[1], value: item.value }));

        const sortedEmoji5 = vicVeryPositive.sort((a, b) => b.value - a.value);
        const top10Emoji5 = sortedEmoji5.slice(0, 10);
        const topics5 = top10Emoji5.map((item) => item.name);

        setChartEmoji1(top10Emoji1);
        setChartTopic1(topics1);
        setChartEmoji2(top10Emoji2);
        setChartTopic2(topics2);
        setChartEmoji3(top10Emoji3);
        setChartTopic3(topics3);
        setChartEmoji4(top10Emoji4);
        setChartTopic4(topics4);
        setChartEmoji5(top10Emoji5);
        setChartTopic5(topics5);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const chart1 = echarts.init(chartRef1.current);
    chart1.setOption({
      title: {
            text: 'Very negative tweets',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}'
        },
        legend: {
            top: '70%',
            left: 'center',
            type: 'scroll',
            width: '80%',
            orient: 'horizontal',
            data: chartTopic1
        },
        series: [
            {
                name: 'Emoji',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '40%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: chartEmoji1
            }
        ]
    });
    const chart2 = echarts.init(chartRef2.current);
    chart2.setOption({
      title: {
            text: 'Negative tweets',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}'
        },
        legend: {
            top: '70%',
            left: 'center',
            type: 'scroll',
            width: '80%',
            orient: 'horizontal',
            data: chartTopic2
        },
        series: [
            {
                name: 'Emoji',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '40%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: chartEmoji2
            }
        ]
    });
    const chart3 = echarts.init(chartRef3.current);
    chart3.setOption({
      title: {
            text: 'Neutral tweets',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}'
        },
        legend: {
            top: '70%',
            left: 'center',
            type: 'scroll',
            width: '80%',
            orient: 'horizontal',
            data: chartTopic3
        },
        series: [
            {
                name: 'Emoji',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '40%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: chartEmoji3
            }
        ]
    });
    const chart4 = echarts.init(chartRef4.current);
    chart4.setOption({
      title: {
            text: 'Positive tweets',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}'
        },
        legend: {
            top: '70%',
            left: 'center',
            type: 'scroll',
            width: '80%',
            orient: 'horizontal',
            data: chartTopic4
        },
        series: [
            {
                name: 'Emoji',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '40%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: chartEmoji4
            }
        ]
    });
    const chart5 = echarts.init(chartRef5.current);
    chart5.setOption({
      title: {
            text: 'Very positive tweets',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}'
        },
        legend: {
            top: '70%',
            left: 'center',
            type: 'scroll',
            width: '80%',
            orient: 'horizontal',
            data: chartTopic5
        },
        series: [
            {
                name: 'Emoji',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '40%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: chartEmoji5
            }
        ]
    });
  }, [chartEmoji1, chartTopic1, chartEmoji2, chartTopic2, chartEmoji3, chartTopic3, chartEmoji4, chartTopic4, chartEmoji5, chartTopic5]);

  return (
    <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-evenly' }}>
      <div ref={chartRef1} style={{width: '20%', height: '400px', overflow: 'auto'}}/>
      <div ref={chartRef2} style={{width: '20%', height: '400px', overflow: 'auto'}}/>
      <div ref={chartRef3} style={{width: '20%', height: '400px', overflow: 'auto'}}/>
      <div ref={chartRef4} style={{width: '20%', height: '400px', overflow: 'auto'}}/>
      <div ref={chartRef5} style={{width: '20%', height: '400px', overflow: 'auto'}}/>
    </div>
  );
};

export default SentimentVictoria;
