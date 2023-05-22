// import { Helmet } from "react-helmet-async";
// import React from 'react';
// // @mui
// import { Box, Card, Container, Divider, Grid, Stack, Typography } from '@mui/material';
// // sections
// import QuizList from "../sections/@dashboard/quiz/QuizList";
//
// export default function Quiz() {
//   return (
//     <>
//       <Helmet>
//         <title> Quiz </title>
//       </Helmet>
//
//       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//         <Typography variant="h4" gutterBottom>
//           Quiz
//         </Typography>
//       </Stack>
//
//       <Container className="quiz-container">
//         <Grid item xs={12} sm={6} md={12}>
//           <Card>
//             <Divider sx={{ my: 2 }} />
//             <Box sx={{ mx: 3 }}>
//               <QuizList />
//             </Box>
//           </Card>
//         </Grid>
//       </Container>
//     </>
//   );
// }

import { Helmet } from "react-helmet-async";
import React from 'react';
// @mui
import { Box, Card, Container, Divider, Grid, Stack, Typography } from '@mui/material';
// sections
import QuizList from "../sections/@dashboard/quiz/QuizList";

export default function Quiz() {
  return (
    <>
      <Helmet>
        <title> Quiz </title>
      </Helmet>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Quiz
        </Typography>
      </Stack>

      <Container className="quiz-container">
        <Grid item xs={12} sm={6} md={12}>
          <Card>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mx: 3 }}>
              <QuizList />
            </Box>
          </Card>
        </Grid>
      </Container>
    </>
  );
}

