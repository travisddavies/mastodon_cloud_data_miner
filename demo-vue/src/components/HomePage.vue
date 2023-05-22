<!--<template>-->
<!--      <div>-->
<!--        <h1>This is 1st View</h1>-->
<!--        <ul>-->
<!--            <li v-for="(item, index) in data" :key="index">{{ item }}</li>-->
<!--        </ul>-->
<!--    </div>-->

<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--    name: "HomePage",-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--h3 {-->
<!--    margin: 40px 0 0;-->
<!--}-->
<!--ul {-->
<!--    list-style-type: none;-->
<!--    padding: 0;-->
<!--}-->
<!--li {-->
<!--    display: inline-block;-->
<!--    margin: 0 10px;-->
<!--}-->
<!--a {-->
<!--    color: #42b983;-->
<!--}-->
<!--</style>-->



<template>
    <div>
        <div ref="chart" style="height: 400px;"></div>
    </div>
  </template>


  <script>

  import axios from 'axios';
  import * as echarts from 'echarts';

  export default {
    name: 'Topics_distribution_under_emotion_of_Negative',
    props: {
        msg: String,
        url: String
    },
    data() {
        return {
            string: 'nothing',
            chart: null,
            chartEmotion: [],
            chartTopic:[]

        };
    },
    methods: {
        async getData1() {
            try {

                const response = await axios.get('http://127.0.0.1:5000/emoji_total');
                console.log(response.data);



                const Emotion = response.data.map(item => ({
                        name: item.key,
                        value: item.value
                      }));

                const sortedEmotion = Emotion.sort((a, b) => b.value - a.value);
                const top7Emotion = sortedEmotion.slice(0, 7);

                console.log(top7Emotion);

                const topics = top7Emotion.map(item => item.name);

                console.log(topics);

                this.chartTopics = topics;
                this.chartEmotion = top7Emotion;

                this.updateChart();

            } catch (error) {
                console.log(error);
            }
        },
        updateChart() {
            this.chart.setOption({
                title:{
                    text: "Top 10 emoji popularity in Australia"
                },
                tooltip: {
                    trigger: 'item'
                  },
                  legend: {
                    top: '5%',
                    left: 'center',
                      orient:'vertical',
                      data: this.chartTopic


                  },
                  series: [
                    {
                      name: 'emoji',
                      type: 'pie',
                      radius: ['40%', '70%'],
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
                      data: this.chartEmotion
                    }
                  ]
          });
        },
    },
    mounted() {
        this.chart = echarts.init(this.$refs.chart);

        this.getData1();
        this.updateChart();
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