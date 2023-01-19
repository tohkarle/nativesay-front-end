import { m, useScroll, useSpring } from 'framer-motion';
import React, { useRef } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Container, Box, Stack, Button, Typography, IconButton, InputAdornment } from '@mui/material';
// layouts
import PreLaunchLayout from 'src/pages/PreLaunchLayout';
// _mock
import { _socials } from '../_mock/arrays';
// sections
import PreLaunchCallToAction from './PreLaunchCallToAction';
import PreLaunchHero from './PreLaunchHero';
import PreLaunchBenefits from './PreLaunchBenefits';

// ----------------------------------------------------------------------

PreLaunchPage.getLayout = (page: React.ReactElement) => <PreLaunchLayout>{page}</PreLaunchLayout>;

// ----------------------------------------------------------------------

export default function PreLaunchPage() {
  const { replace } = useRouter();
  const theme = useTheme();
  const { scrollYProgress } = useScroll();
  const scrollToBottomRef = useRef<HTMLInputElement>(null);
  const seeAllFeaturesRef = useRef<HTMLInputElement>(null);
  // const { days, hours, minutes, seconds } = useCountdown(new Date('01/22/2023 21:30'));

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progress = (
    <m.div
      style={{
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1999,
        position: 'fixed',
        transformOrigin: '0%',
        backgroundColor: theme.palette.primary.main,
        scaleX,
      }}
    />
  );

  const handleClick = () => {
    if (scrollToBottomRef.current)
      scrollToBottomRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const seeAllFeatures = () => {
    if (seeAllFeaturesRef.current)
      seeAllFeaturesRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Head>
        <title> NativeSay | How a native would say it</title>
      </Head>

      {progress}

      <PreLaunchHero handleClick={handleClick} seeAllFeatures={seeAllFeatures} />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
          pb: 9
        }}
      >
      
      <Stack ref={seeAllFeaturesRef} >
        <PreLaunchBenefits handleClick={handleClick} />
      </Stack>

      <Stack ref={scrollToBottomRef} >
        <PreLaunchCallToAction handleClick={handleClick} />
      </Stack>

      </Box>
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
