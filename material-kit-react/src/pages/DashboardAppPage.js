import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import { SummaryCount, PopulationChart, TweetsChart } from "../sections/@dashboard/app";


export default function DashboardAppPage() {
  const theme = useTheme();

  const [tweetCount, setTweetCount] = useState(null);
  const [climateTweetCount, setClimateTweetCount] = useState(null);
  const [emojiUsage, setEmojiUsage] = useState(null);
  const [coffeeTweetCount, setCoffeeTweetCount] = useState(null);
  const [tweetChartData, setTweetChartData] = useState([]);
  const [populationData, setPopulationData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tweet_number')
      .then(response => {
        const tweetCountValue = response.data[0].value;
        setTweetCount(tweetCountValue);
      })
      .catch(error => {
        console.error('Error fetching tweet count:', error);
      });

    axios.get('http://localhost:5000/topic_climate_number')
      .then(response => {
        const climateTweetCountValue = response.data[0].value;
        setClimateTweetCount(climateTweetCountValue);
      })
      .catch(error => {
        console.error('Error fetching climate tweet count:', error);
      });

    axios.get('http://localhost:5000/emoji_usage')
      .then(response => {
        const emojiUsageValue = response.data[0].value;
        setEmojiUsage(emojiUsageValue);
      })
      .catch(error => {
        console.error('Error fetching emoji usage:', error);
      });

    axios.get('http://localhost:5000/topic_coffee_number')
      .then(response => {
        const coffeeTweetCountValue = response.data[0].value;
        setCoffeeTweetCount(coffeeTweetCountValue);
      })
      .catch(error => {
        console.error('Error fetching coffee tweet count:', error);
      });
  }, []);

  useEffect(() => {
      axios.get('http://localhost:5000/state_tweet_count')
        .then(response => {
          const tweetData = response.data;

          setTweetChartData(tweetData);
        })
        .catch(error => {
          console.error('Error fetching state tweet count:', error);
        });
    }, []);

  useEffect(() => {
      fetch('/state_population.json')
        .then(response => response.json())
        .then(data => {
          setPopulationData(data);
        })
        .catch(error => {
          console.error('Error fetching population data:', error);
        });
    }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome !
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCount title="Tweets" total={tweetCount} icon={'ri:twitter-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SummaryCount title="Climate Related Tweets" total={climateTweetCount} color="info" icon={'cib:code-climate'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SummaryCount title="Emoji Usage" total={emojiUsage} color="warning" icon={'mdi:emoji'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCount title="Victoria Coffee Related Tweets" total={coffeeTweetCount} color="error" icon={'ph:coffee-fill'} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <PopulationChart
              title="Population"
              subheader="Released on 28/06/2022"
              chartData={populationData}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TweetsChart
              title="Tweets in Australia"
              chartData={tweetChartData}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
