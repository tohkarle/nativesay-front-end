import { m, useScroll, useSpring } from 'framer-motion';
import React, { useRef, FormEvent } from 'react';
// next
import Head from 'next/head';
// @mui
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Container, Box, Stack, Button, Typography, IconButton, InputAdornment } from '@mui/material';
// layouts
import PreLaunchLayout from 'src/pages/PreLaunchLayout';
// hooks
import useCountdown from '../hooks/useCountdown';
// _mock
import { _socials } from '../_mock/arrays';
// utils
import { textGradient, bgGradient } from '../utils/cssStyles';
// theme
import { secondaryFont } from '../theme/typography';
// components
import Iconify from '../components/iconify';
import { CustomTextField } from '../components/custom-input';
import { MotionContainer, varFade } from '../components/animate';
// assets
import { ComingSoonIllustration } from '../assets/illustrations';
// sections
import PreLaunchComponent from './PreLaunchComponent';
import PreLaunchCallToAction from './PreLaunchCallToAction';

// ----------------------------------------------------------------------

PreLaunchPage.getLayout = (page: React.ReactElement) => <PreLaunchLayout>{page}</PreLaunchLayout>;

// ----------------------------------------------------------------------

export default function PreLaunchPage() {
  const { days, hours, minutes, seconds } = useCountdown(new Date('01/22/2023 21:30'));
  const customTextFieldRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (customTextFieldRef.current)
      customTextFieldRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (customTextFieldRef.current) {
      const email = customTextFieldRef.current.value;
      // fetch('/api/save-email', {
      //   method: 'POST',
      //   body: JSON.stringify({ email }),
      // });
    }
  };

  return (
    <>
      <Head>
        <title> NativeSay | How a native would say it</title>
      </Head>

      <Stack
        spacing={4}
        sx={{
          alignItems: 'center',
          pt: { xs: 0, md: 3 },
          px:[ 3,9,18]
          }}
        >
        <Typography variant="h2" paragraph textAlign="center">
          The World&apos;s First True Contextual Translator
        </Typography>

        <Typography textAlign="center" sx={{ color: 'text.secondary' }}>
          NativeSay is a translation app that helps users understand the context in which translations should be used, and provides culturally and contextually aware translations.
          <br/><br/>
          By signing up, you will have the opportunity to be one of the first to try out the app as a beta tester. Not only will you get early access to the app, but you will also be able to use it for free during the beta testing phase.
        </Typography>

        <Button
          onClick={() => handleClick()}
          variant="contained"
          size="large"
          sx={{ width: '200px' }}
        >
          Sign Up For Beta
        </Button>
      </Stack>
    
      <PreLaunchComponent handleClick={handleClick} />

      <PreLaunchCallToAction handleClick={handleClick} />

      <Stack alignItems="center" sx={{ px:[6,9,18] }}>
        <ComingSoonIllustration sx={{ my: 10, height: 240 }} />

        <Typography
          textAlign="center"
          sx={{
            mb: 1,
            color: 'text.secondary',
            width: '300px'
          }}
        >
            Beta sign up ends in:
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
          sx={{ typography: 'h2' }}
        >
          <TimeBlock label="Days" value={days} />
          <TimeBlock label="Hours" value={hours} />
          <TimeBlock label="Minutes" value={minutes} />
          <TimeBlock label="Seconds" value={seconds} />
        </Stack>

        <Typography
          textAlign="center"
          sx={{
            mt: 6,
            color: 'text.secondary',
            width: '300px'
          }}
        >
            Sign up now to be the first to know when the app is launched and to secure your spot as a beta tester.
        </Typography>

        <form onSubmit={handleSubmit}>
          <CustomTextField
            ref={customTextFieldRef}
            placeholder="Enter your email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                  >
                    Sign Up
                  </Button>
                </InputAdornment>
              ),
              sx: { pr: 0.5 },
            }}
            sx={{ mt: 3, width: '300px' }}
          />
        </form>
      </Stack>
    </>
  );
}

// ----------------------------------------------------------------------

type TimeBlockProps = {
  label: string;
  value: string;
};

function TimeBlock({ label, value }: TimeBlockProps) {
  return (
    <div>
      <Box> {value} </Box>
      <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
    </div>
  );
}
