import { m } from 'framer-motion';
// @mui
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// utils
import { bgGradient } from '../../utils/cssStyles';
// routes
// components
import { MotionViewport, varFade } from '../../components/animate';
import Image from '../../components/image';
import PreLaunchEmailForm from './PreLaunchEmailForm';

// ----------------------------------------------------------------------

interface Props {
  handleClick: () => void;
}

export default function PreLaunchCallToAction({handleClick}: Props) {
  const theme = useTheme();

  return (
    <Container component={MotionViewport}>
      <Stack
        spacing={3}
        sx={{
          textAlign: 'center',
          mt: { xs: 6, md: 6 },
        }}
      >
        <Typography variant="h2">
          Break through <br />
          language barriers
        </Typography>
      </Stack>
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
          mt: { xs: 6, md: 6 },
          py: { xs: 6, md: 9 },
          px: { xs: 4, md: 15 },
        }}
      >
        <Content />
        {/* <Description handleClick={handleClick}/> */}
        <PreLaunchEmailForm />
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
        Break through <br />
        language barriers
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
        Unlock the potential of effective language learning and seamless communication with NativeSay. Don&apos;t miss your chance to be among the first to access this revolutionary app.
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
            Join Beta Test
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
          sx={{ maxWidth: { xs: 240, md: 390} }}
        />
      </m.div>
    </Stack>
  );
}
