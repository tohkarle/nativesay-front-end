import { m } from 'framer-motion';
// @mui
import { Container, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// utils
import { bgGradient } from '../../utils/cssStyles';
// routes
// components
import { MotionViewport, varFade } from '../../components/animate';
import Image from '../../components/image';
import PreLaunchEmailForm from './PreLaunchEmailForm';

// ----------------------------------------------------------------------

export default function PreLaunchCallToAction() {
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
          Speak like a local, <br />
          Anywhere you go
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
        <PreLaunchEmailForm />
      </Stack>
    </Container>
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
          src="/logo/undraw_reminder.svg"
          sx={{ maxWidth: { xs: 240, md: 390 } }}
        />
      </m.div>
    </Stack>
  );
}
