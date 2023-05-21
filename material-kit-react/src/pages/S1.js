import {Helmet} from "react-helmet-async";
import React from 'react';
// @mui
import {Box, Card, CardHeader, Grid, Container, Stack, Typography, Divider } from '@mui/material';
// sections
import TweetClimateMap from "../sections/@dashboard/s1/TweetClimateMap";
import ComparisonWithClimate from "../sections/@dashboard/s1/ComparisonWithClimate";

export default function S1() {
  return (
    <>
      <Helmet>
        <title> Scenario 1 </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Scenario 1
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={12}>
            <Card>
              <CardHeader title="Climate Related Tweets in Australia" />
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mx: 3 }}>
                <TweetClimateMap />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <Card>
              <CardHeader title="Comparison between % Climate Related Tweets and Protected Area in Australia" />
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mx: 3 }}>
                <ComparisonWithClimate />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

