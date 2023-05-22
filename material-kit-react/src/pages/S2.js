import {Helmet} from "react-helmet-async";
import React from 'react';
// @mui
import {Box, Card, CardHeader, Grid, Container, Stack, Typography, Divider } from '@mui/material';
// sections
import EmojiTweetVsMastodon from '../sections/@dashboard/s2/EmojiTweetVsMastodon';
import EmojiStateMap from "../sections/@dashboard/s2/EmojiStateMap";
import EmojiSentiment from '../sections/@dashboard/s2/EmojiSentiment';
import SentimentLevel from "../sections/@dashboard/s2/SentimentLevel";
import SentimentVictoria from "../sections/@dashboard/s2/SentimentVictoria";

export default function S2() {
  return (
    <>
      <Helmet>
        <title> Scenario 2 </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Scenario 2
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={12}>
            <Card>
              <CardHeader title="Comparing Top 10 Emoji popularity for Australians on Twitter and Mastodon" />
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mx: 3 }}>
                <EmojiTweetVsMastodon />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <Card>
              <CardHeader title="Top 5 Emoji used on Twitter in Australia" />
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mx: 3 }}>
                <EmojiStateMap />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Card>
              <CardHeader title="Number of Emoji Used Across Tweets of Different Sentiment Levels" />
              <Box sx={{ mx: 3 }}>
                <EmojiSentiment />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader title="Australia’s Emoji Usage for tweets of different sentiment " />
              <Box sx={{ mx: 3 }}>
                <SentimentLevel />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <Card>
              <CardHeader title="Top 10 emoji across Victorian's tweets of different sentiment levels" />
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mx: 3 }}>
                <SentimentVictoria />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
