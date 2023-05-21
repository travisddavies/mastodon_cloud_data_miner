import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import { SummaryCount, PopulationChart, TweetsChart } from "../sections/@dashboard/app";

export default function DashboardAppPage() {
  const theme = useTheme();

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
            <SummaryCount title="Tweets" total={2428918} icon={'ri:twitter-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SummaryCount title="Climate Related Tweets" total={12676} color="info" icon={'cib:code-climate'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SummaryCount title="Emoji Usage" total={576198} color="warning" icon={'mdi:emoji'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryCount title="Victoria Coffee Related Tweets" total={2678} color="error" icon={'ph:coffee-fill'} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <PopulationChart
              title="Population"
              subheader="Released on 28/06/2022"
              chartData={[
                { label: 'New South Wales', value: 8072163 },
                { label: 'Victoria', value: 6503491 },
                { label: 'Queensland', value: 5156138 },
                { label: 'Western Australia', value: 2660026 },
                { label: 'South Australia', value: 1781516 },
                { label: 'Tasmania', value: 557571 },
                { label: 'Australian Capital Territory', value: 454499 },
                { label: 'Northern Territory', value: 232605 },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TweetsChart
              title="Tweets in Australia"
              chartData={[
                { label: 'Australian Capital Territory', value: 55758 },
                { label: 'New South Wales', value: 746137 },
                { label: 'Northern Territory', value: 26573 },
                { label: 'Queensland', value: 436214 },
                { label: 'South Australia', value: 161969 },
                { label: 'Tasmania', value: 57877 },
                { label: 'Victoria', value: 743279 },
                { label: 'Western Australia', value: 201111 },
              ]}
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
