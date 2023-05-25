import {Helmet} from "react-helmet-async";
import React from 'react';
// @mui
import {Box, Card, CardHeader, Grid, Container, Stack, Typography, Divider } from '@mui/material';
// sections
import VictoriaCoffeeWithIncome from "../sections/@dashboard/s3/VictoriaCoffeeWithIncome";
import VictoriaCoffeeWithAge from "../sections/@dashboard/s3/VictortiaCoffeeWithAge";

export default function S3() {
  return (
    <>
      <Helmet>
        <title> Scenario 3 </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Scenario 3
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={12}>
            <Card>
              <CardHeader title="Comparison between % of Coffee Related Tweets and Victorian’s Median Weekly Income" />
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mx: 3 }}>
                <VictoriaCoffeeWithIncome />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <Card>
              <CardHeader title="Comparison between % of Coffee Related Tweets and Victorian’s Median Age" />
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mx: 3 }}>
                <VictoriaCoffeeWithAge />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

