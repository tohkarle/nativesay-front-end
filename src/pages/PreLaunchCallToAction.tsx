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

export default function PreLaunchCallToAction({handleClick}: Props) {
  const theme = useTheme();

  return (
    <Container component={MotionViewport}>
      <Stack
        spacing={{ xs: 6, md: 9 }}
        alignItems="center"
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          ...bgGradient({
            direction: '135deg',
            startColor: theme.palette.primary.main,
            endColor: theme.palette.primary.dark,
          }),
          borderRadius: 2,
          py: { xs: 6, md: 9 },
          px: { xs: 4, md: 9 },
          // pb: { xs: 6, md: 9 },
          // pt: { xs: 6, md: 9 },
          // pl: { xs: 0, md: 9 },
        }}
      >
        <Content />
        <Description handleClick={handleClick}/>
      </Stack>
    </Container>
  );
}

// ----------------------------------------------------------------------

function Description({handleClick}: Props) {
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
          maxWidth: { xs:300, md: 600 }
          // width: { xs:300, md: 540 }
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
          maxWidth: { xs:300, md: 390 }
          // width: { xs:300, md: 390 }
        }}
      >
        Don&apos;t miss out on this opportunity to experience
        the power of effective language learning and
        communication with NativeSay.
      </Box>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={{ xs: 'center', md: 'flex-start' }}
        spacing={2}
      >
        <m.div variants={varFade().inRight}>
          <Button
            onClick={handleClick}
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
          sx={{ maxWidth: { xs: 240, md: 330} }}
        />
      </m.div>
    </Stack>
  );
}
