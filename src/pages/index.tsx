import { m, useScroll, useSpring } from 'framer-motion';
import React, { useRef } from 'react';
// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';
// layouts
import useScrollTo from 'src/hooks/useScrollTo';
import MainLayout from '../layouts/main';
// sections
import PreLaunchCallToAction from '../sections/prelaunch/PreLaunchCallToAction';
import PreLaunchHero from '../sections/prelaunch/PreLaunchHero';
import PreLaunchBenefits from '../sections/prelaunch/PreLaunchBenefits';

// ----------------------------------------------------------------------

PreLaunchPage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function PreLaunchPage() {
  const theme = useTheme();
  const { scrollYProgress } = useScroll();

  const scrollToBottomRef = useRef<HTMLInputElement>(null);
  const seeBenefitsRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useScrollTo(scrollToBottomRef);
  const scrollToBenefits = useScrollTo(seeBenefitsRef);

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
    scrollToBottom();
  };

  const handleClickSeeBenefits = () => {
    scrollToBenefits();
  };

  return (
    <>
      <Head>
        <title> NativeSay | Speak like a local, anywhere you go</title>
      </Head>

      {progress}

      <PreLaunchHero handleClick={handleClick} handleClickSeeBenefits={handleClickSeeBenefits} />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <Stack ref={seeBenefitsRef}>
          <PreLaunchBenefits handleClick={handleClick} />
        </Stack>

        <Stack ref={scrollToBottomRef}>
          <PreLaunchCallToAction />
        </Stack>
      </Box>
    </>
  );
}
