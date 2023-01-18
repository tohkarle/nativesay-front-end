import { m, useScroll, useSpring } from 'framer-motion';
import React, { useRef } from 'react';
// next
import Head from 'next/head';
// @mui
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Container, Box, Stack, Button, Typography, IconButton, InputAdornment } from '@mui/material';
// hooks
import useCountdown from '../hooks/useCountdown';
// layouts
import PreLaunchLayout from 'src/pages/PreLaunchLayout';
import MainLayout from '../layouts/main';
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

ComingSoonPage.getLayout = (page: React.ReactElement) => <PreLaunchLayout>{page}</PreLaunchLayout>;

// ----------------------------------------------------------------------

export default function ComingSoonPage() {
  const { days, hours, minutes, seconds } = useCountdown(new Date('01/22/2023 21:30'));
  const customTextFieldRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (customTextFieldRef.current)
      customTextFieldRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title> NativeSay | How a native would say it</title>
      </Head>

      <Stack spacing={4} sx={{ alignItems:'center', pt:6, px:[6,9,18] }}>
        <Typography variant="h2" paragraph textAlign="center">
          The World's First True Contextual Translator
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

      {/* Many people are excited about the launch of NativeSay, as it promises to revolutionize the way we learn languages as well as communicate with others in different languages and cultural contexts. */}
    
      <PreLaunchComponent handleClick={handleClick} />

      <PreLaunchCallToAction handleClick={handleClick} />

      <Stack alignItems="center" sx={{ px:[6,9,18] }}>
        <ComingSoonIllustration sx={{ my: 10, height: 240 }} />

        <Typography textAlign="center" sx={{ mb: 1, color: 'text.secondary', width: '450px' }}>
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

        <Typography textAlign="center" sx={{ mt: 6, color: 'text.secondary', width: '450px' }}>
            Sign up now to be the first to know when the app is launched and to secure your spot as a beta tester.
        </Typography>

        <CustomTextField
          ref={customTextFieldRef}
          placeholder="Enter your email"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" size="large">
                  Sign Up For Beta
                </Button>
              </InputAdornment>
            ),
            sx: { pr: 0.5 },
          }}
          sx={{ mt: 3, width: '450px' }}
        />
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
