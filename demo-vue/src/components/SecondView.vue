<template>
    <div>
        <div ref="chart" style="height: 500px;"></div>
        <button @click="getData1">Update Chart</button>
        <h1>This is 2nd View</h1>
        <ul>{{string}}</ul>
        <button @click="getData2">Change Data</button>
    </div>
</template>

<script>
import axios from 'axios';
import * as echarts from 'echarts';

export default {
    name: 'SecondView',
    props: {
        msg: String,
    },
    data() {
        return {
            string: 'nothing',
            chart: null,
            chartState:["australian capital territory",
                "new south wales", "northern territory",
                "queensland", "south australia", "tasmania",
                "victoria", "western australia"],
            chartTop5ACT_Emoji:[],
            chartTop5NSW_Emoji:[],
            chartTop5NT_Emoji:[],
            chartTop5QSL_Emoji:[],
            chartTop5SA_Emoji:[],
            chartTop5TAS_Emoji:[],
            chartTop5VIC_Emoji:[],
            chartTop5WA_Emoji:[]
    },
    methods: {
        async getData1() {
            try {

                const response = await axios.get('http://127.0.0.1:5000/emoji_no_sentiment');
                console.log(response.data);

                const ACT = response.data.filter(item => item.key[0]==="australian capital territory");
                const  act = ACT.map(item => ({name: item.key[1], value:item.value}));
                const ACT_Emoji = act.sort((a,b)=>b.value-a.value);
                const Top5ACT_Emoji = ACT_Emoji.slice(0,5);

                const NSW = response.data.filter(item => item.key[0]==="new south wales");
                const  nsw = NSW.map(item => ({name: item.key[1], value:item.value}));
                const NSW_Emoji = nsw.sort((a,b)=>b.value-a.value);
                const Top5NSW_Emoji = NSW_Emoji.slice(0,5);


                //"northern territory",
                //"queensland", "south australia", "tasmania",
                //"victoria", "western australia"


                console.log(topics);

                this.chartTopics = topics;
                this.chartTop5ACT_Emoji = Top5ACT_Emoji;
                this.chartTop5NSW_Emoji = Top5NSW_Emoji;

                this.updateChart();
            } catch (error) {
                console.log(error);
            }
        },
        async getData2() {
            try {
                this.string = this.string + 'sth'
            } catch (error) {
                console.log(error);
            }
        },
        updateChart() {
            this.chart.setOption({
                title:{
                    text: "Top 10 emoji popularity in Australia",
                    left: "center"
                },
                tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: this.chartTopics
  },
  series: [
    {
      //name: 'Direct',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      name: 'Mail Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Affiliate Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      name: 'Search Engine',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
  ]
            });
        },
    },
    mounted() {
        this.chart = echarts.init(this.$refs.chart);
        this.getData1();
        //this.updateChart();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
