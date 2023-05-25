import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import * as echarts from 'echarts'

const correctFormat = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

const EmojiSentiment = () => {
  const [chartVeryNegative, setChartVeryNegative] = useState([])
  const chartRef = useRef(null)
  const [chartNegative, setChartNegative] = useState([])
  const [chartNeutral, setChartNeutral] = useState([])
  const [chartPositive, setChartPositive] = useState([])
  const [chartVeryPositive, setChartVeryPositive] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://172.26.135.191/api/emoji_with_sentiment')

        const veryNegative = response.data.reduce((obj, item) => {
          if (item.key[2] === "very negative") {
            const x = correctFormat(item.key[0])
            if (obj[x]) {
              obj[x] += item.value
            } else {
              obj[x] = item.value
            }
          }
          return obj
        }, {})

        const a1 = Object.entries(veryNegative).map(([name, value]) => ({ name, value }))

        const negative = response.data.reduce((obj, item) => {
          if (item.key[2] === "negative") {
            const x1 = correctFormat(item.key[0])
            if (obj[x1]) {
                obj[x1] += item.value
              } else {
                obj[x1] = item.value
              }
          }
          return obj
        }, {})

        const a2 = Object.entries(negative).map(([name, value]) => ({ name, value }))

        const neutral = response.data.reduce((obj, item) => {
          if (item.key[2] === "neutral") {
            const x2 = correctFormat(item.key[0])
            if (obj[x2]) {
              obj[x2] += item.value
            } else {
              obj[x2] = item.value
            }
          }
          return obj
        }, {})

        const a3 = Object.entries(neutral).map(([name, value]) => ({ name, value }))

        const positive = response.data.reduce((obj, item) => {
          if (item.key[2] === "positive") {
            const x3 = correctFormat(item.key[0])
            if (obj[x3]) {
              obj[x3] += item.value
            } else {
              obj[x3] = item.value
            }
          }
          return obj
        }, {})

        const a4 = Object.entries(positive).map(([name, value]) => ({ name, value }))

        const veryPositive = response.data.reduce((obj, item) => {
          if (item.key[2] === "very positive") {
            const x4 = correctFormat(item.key[0])
            if (obj[x4]) {
              obj[x4] += item.value
            } else {
              obj[x4] = item.value
            }
          }
          return obj
        }, {})

        const a5 = Object.entries(veryPositive).map(([name, value]) => ({ name, value }))

        setChartVeryNegative(a1)
        setChartNegative(a2)
        setChartNeutral(a3)
        setChartPositive(a4)
        setChartVeryPositive(a5)

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (chartRef.current && chartVeryNegative.length) {
      const chart = echarts.init(chartRef.current)
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
            magicType: { show: true, type: ['bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: 'category',
            data: chartVeryNegative.map((item) => item.name),
            name: 'States/Territory',
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
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
            data: chartVeryNegative.map((item) => item.value),
            emphasis: {
              focus: 'series'
            },
          },
          {
            name: 'Negative Tweets',
            type: 'bar',
            data: chartNegative.map((item) => item.value),
            emphasis: {
              focus: 'series'
            },
          },
          {
            name: 'Neutral Tweets',
            type: 'bar',
            data: chartNeutral.map((item) => item.value),
            emphasis: {
              focus: 'series'
            },
          },
          {
            name: 'Positive Tweets',
            type: 'bar',
            data: chartPositive.map((item) => item.value),
            emphasis: {
              focus: 'series'
            },
          },
          {
            name: 'Very Positive Tweets',
            type: 'bar',
            data: chartVeryPositive.map((item) => item.value),
            emphasis: {
              focus: 'series'
            },
          },
        ],
      }

      chart.setOption(option)
    }
  }, [chartVeryNegative, chartNegative, chartNeutral, chartPositive, chartVeryPositive])

  return (
    <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
  )
}

export default EmojiSentiment

