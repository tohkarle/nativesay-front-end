import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography, Grid, Stack } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Image from '../components/image';
import Iconify from '../components/iconify';
import { MotionViewport, varFade } from '../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

interface Props {
  handleClick: () => void;
}

export default function PreLaunchBenefits({handleClick}: Props) {
  const isDesktop = useResponsive('up', 'md');

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Stack
          spacing={3}
          sx={{
            textAlign: 'center',
            mb: { xs: 12, md: 15 },
          }}
        >
          <Typography variant="h2">
            How can NativeSay <br /> 
            benefit you?
          </Typography>
        </Stack>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 5, md: 0 }}
          paddingBottom={{ xs: 12, md: 15 }}
        >

          <Grid item xs={12} md={7}>
            <Benefit1 />
          </Grid>

          <Grid item xs={12} md={4}>
            <Description1 handleClick={handleClick} />
          </Grid>

          {!isDesktop && (
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <JoinTheBetaTestButton handleClick={handleClick} />
            </Grid>
          )}
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 5, md: 0 }}
          direction={{ xs: 'column', md: 'row-reverse' }}
          paddingBottom={{ xs: 12, md: 15 }}
        >

          <Grid item xs={12} md={7}>
            <Benefit2 />
          </Grid>

          <Grid item xs={12} md={4}>
            <Description2 handleClick={handleClick} />
          </Grid>

          {!isDesktop && (
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <JoinTheBetaTestButton handleClick={handleClick} />
            </Grid>
          )}
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 5, md: 0 }}
        >

          <Grid item xs={12} md={7}>
            <Benefit3 />
          </Grid>

          <Grid item xs={12} md={4}>
            <Description3 handleClick={handleClick} />
          </Grid>

          {!isDesktop && (
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <JoinTheBetaTestButton handleClick={handleClick} />
            </Grid>
          )}
        </Grid>
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description1({handleClick}: Props) {
  const isDesktop = useResponsive('up', 'md');

  return (
    <Stack
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
      }}
    >

      <m.div variants={varFade().inDown}>
        <Typography
          variant="h2"
        >
          Accurate & Relevant Translations
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography
          variant="body1"
          component="div"
          sx={{
            color: 'text.disabled',
            mt: 3,
            mb: { md: 5 },
          }}
        >
          NativeSay gives you the power to input context or choose from pre-defined options, ensuring your translations are accurate and tailored to your specific needs.
        </Typography>
      </m.div>

      {isDesktop && <m.div variants={varFade().inDown}> <JoinTheBetaTestButton handleClick={handleClick} /> </m.div>}
    </Stack>
  );
}

function Description2({handleClick}: Props) {
  const isDesktop = useResponsive('up', 'md');

  return (
    <Stack
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
      }}
    >

      <m.div variants={varFade().inDown}>
        <Typography
          variant="h2"
        >
          Cultural & Contextual Awareness
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography
          variant="body1"
          component="div"
          sx={{
            color: 'text.disabled',
            mt: 3,
            mb: { md: 5 },
          }}
        >
          Gain a deeper understanding of the context and cultural nuances of your translations with NativeSay&apos;s multiple translations and context explanations.
        </Typography>
      </m.div>

      {isDesktop && <m.div variants={varFade().inDown}> <JoinTheBetaTestButton handleClick={handleClick} /> </m.div>}
    </Stack>
  );
}

function Description3({handleClick}: Props) {
  const isDesktop = useResponsive('up', 'md');

  return (
    <Stack
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
      }}
    >

      <m.div variants={varFade().inDown}>
        <Typography
          variant="h2"
        >
          Accelerate Your Language Learning
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography
          variant="body1"
          component="div"
          sx={{
            color: 'text.disabled',
            mt: 3,
            mb: { md: 5 },
          }}
        >
          Easily look up unfamiliar words and phrases with NativeSay&apos;s built-in dictionary feature. This tool is a game-changer for language learners looking to speed up their learning process.
        </Typography>
      </m.div>

      {isDesktop && <m.div variants={varFade().inDown}> <JoinTheBetaTestButton handleClick={handleClick} /> </m.div>}
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Benefit1() {
  return (
    
    <Box component={m.div} variants={varFade().inUp}>
      <Image disabledEffect alt="rocket" src="/assets/images/home/benefit_1.png" />
    </Box>
  );
}

function Benefit2() {
  return (
    <Box
      component={m.div}
      variants={varFade().inUp}
      sx={{
        ml: {
          md: -6
        }
      }}
    >
      <Image disabledEffect alt="rocket" src="/assets/images/home/benefit_2.png" />
    </Box>
  );
}

function Benefit3() {
  return (
    <Box component={m.div} variants={varFade().inUp}>
      <Image disabledEffect alt="rocket" src="/assets/images/home/benefit_3.png" />
    </Box>
  );
}

// ----------------------------------------------------------------------

function JoinTheBetaTestButton({handleClick}: Props) {
  return (
    <Button
      onClick={handleClick}
      size="large"
      variant="contained"
      endIcon={<Iconify icon="ic:round-arrow-right-alt" />}
    >
      Join The Beta Test
    </Button>
  );
}
