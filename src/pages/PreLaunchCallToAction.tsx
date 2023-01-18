import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import { Button, Box, Container, Stack } from '@mui/material';
// utils
import { bgGradient } from '../utils/cssStyles';
// routes
import { PATH_FREE_VERSION, PATH_MINIMAL_ON_STORE } from '../routes/paths';
// components
import Iconify from '../components/iconify';
import Image from '../components/image';
import { MotionViewport, varFade } from '../components/animate';

// ----------------------------------------------------------------------

interface Props {
  handleClick: () => void;
}

export default function PreLaunchCallToAction(props: Props) {
  const theme = useTheme();

  return (
    <Container component={MotionViewport}>
      <Stack
        spacing={6}
        alignItems="center"
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          ...bgGradient({
            direction: '135deg',
            startColor: theme.palette.primary.main,
            endColor: theme.palette.primary.dark,
          }),
          borderRadius: 2,
          pb: { xs: 6, md: 9 },
          pt: { xs: 6, md: 9 },
          pl: { xs: 0, md: 9 },
        }}
      >
        <Content />
        <Description handleClick={props.handleClick}/>
      </Stack>
    </Container>
  );
}

// ----------------------------------------------------------------------

function Description(props: Props) {
  return (
    <Box
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
      }}
    >
      <Box
        component={m.div}
        variants={varFade().inDown}
        sx={{
          color: 'common.white',
          mb: 5,
          typography: 'h2',
          width: { xs: 390, md: 540 }
        }}
      >
        Communicate and learn with no boundaries
      </Box>

      <Box
        component={m.div}
        variants={varFade().inDown}
        sx={{
          color: 'common.white',
          mb: 5,
          typography: 'body1',
        }}
      >
        Don't miss out on this opportunity to experience
        <br /> 
        the power of effective language learning and
        <br /> 
        communication with NativeSay.
      </Box>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={{ xs: 'center', md: 'flex-start' }}
        spacing={2}
      >
        <m.div variants={varFade().inRight}>
          <Button
            onClick={props.handleClick}
            color="inherit"
            size="large"
            variant="contained"
            sx={{
              color: 'grey.800',
              bgcolor: 'common.white',
            }}
          >
            Sign Up For Beta
          </Button>
        </m.div>

      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Content() {
  return (
    <Stack component={m.div} variants={varFade().inUp} alignItems="center">
      <m.div
        animate={{
          y: [-12, 0, -12],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Image
          visibleByDefault
          disabledEffect
          alt="NativeSay Logo"
          src="/logo/logo_v2.png"
          sx={{ maxWidth: 330 }}
        />
      </m.div>
    </Stack>
  );
}
