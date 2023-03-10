import { m, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Button, Box, Container, Typography, Stack, Grid } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { textGradient, bgGradient } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config-global';
// theme
import { secondaryFont } from '../../theme/typography';
// components
import { MotionContainer, varFade } from '../../components/animate';
import SocialButtons from './SocialButtons';

// ----------------------------------------------------------------------

type StyleRootProps = {
  hide?: boolean;
};

const StyledRoot = styled('div')<StyleRootProps>(({ theme, hide }) => ({
  visibility: hide ? 'hidden' : 'visible',
  position: 'relative',
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    position: 'fixed',
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(15, 0),
  height: '100%',
}));

const StyledGradientText = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 25%, ${theme.palette.primary.dark} 50%, ${theme.palette.primary.main} 75%, ${theme.palette.primary.dark} 100%`
  ),
  backgroundSize: '400%',
  fontFamily: secondaryFont.style.fontFamily,
  fontSize: `${64 / 16}rem`,
  textAlign: 'center',
  lineHeight: 1,
  padding: 9,
  marginTop: 3,
  marginBottom: 15,
  letterSpacing: 3,
  [theme.breakpoints.up('md')]: {
    fontSize: `${96 / 16}rem`,
  },
}));

// ----------------------------------------------------------------------

type Props = {
  handleClick: () => void;
  handleClickSeeBenefits: () => void;
};

export default function PreLaunchHero({ handleClick, handleClickSeeBenefits }: Props) {
  const isDesktop = useResponsive('up', 'md');

  const { scrollYProgress } = useScroll();

  const [hide, setHide] = useState(false);

  useEffect(
    () =>
      scrollYProgress.onChange((scrollHeight) => {
        if (scrollHeight > 0.8) {
          setHide(true);
        } else {
          setHide(false);
        }
      }),
    [scrollYProgress]
  );

  return (
    <>
      <StyledRoot hide={hide}>
        <Container component={MotionContainer} sx={{ height: 1 }}>
          <Grid container spacing={10} sx={{ height: 1 }}>
            <Grid item xs={12} md={6} sx={{ height: 1 }}>
              <Description
                handleClick={handleClick}
                handleClickSeeBenefits={handleClickSeeBenefits}
              />
            </Grid>

            {isDesktop && (
              <Grid item xs={12} md={6}>
                <Content />
              </Grid>
            )}
          </Grid>
        </Container>
      </StyledRoot>

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

// ----------------------------------------------------------------------

function Description({ handleClick, handleClickSeeBenefits }: Props) {
  return (
    <StyledDescription>
      <m.div variants={varFade().in}>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Unlock the Power of <br />
          Contextual Translation
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <StyledGradientText
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
        >
          NativeSay
        </StyledGradientText>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Introducing NativeSay - the revolutionary translation app that takes into account the
          context and cultural nuances of your translations. Say goodbye to awkward or misinformed
          translations and hello to accurate, contextually aware communication.
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Stack spacing={1.5} direction={{ xs: 'column-reverse', sm: 'row' }} sx={{ my: 5 }}>
          <Stack alignItems="center" spacing={2}>
            <Button
              onClick={handleClick}
              size="large"
              variant="contained"
              startIcon={<Iconify icon="eva:flash-fill" width={24} />}
            >
              Join Beta Test
            </Button>
          </Stack>

          <Button
            onClick={handleClickSeeBenefits}
            color="inherit"
            size="large"
            variant="outlined"
            startIcon={<Iconify icon="eva:external-link-fill" width={24} />}
            sx={{ borderColor: 'text.primary' }}
          >
            See Benefits
          </Button>
        </Stack>
        <SocialButtons />
      </m.div>
    </StyledDescription>
  );
}

// ----------------------------------------------------------------------

function Content() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const transition = {
    repeatType: 'loop',
    ease: 'linear',
    duration: 60 * 4,
    repeat: Infinity,
  } as const;

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      sx={{
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        mt: `${HEADER.H_MAIN_DESKTOP}px`,
      }}
    >
      <Stack
        component={m.div}
        variants={varFade().in}
        sx={{ width: 801, position: 'relative', ml: 0 }}
      >
        <Box
          component={m.img}
          animate={{ y: ['0%', '-100%'] }}
          transition={transition}
          alt={`hero_${isLight ? 'light' : 'dark'}_2`}
          src="/assets/images/home/nativesay_hero.png"
          sx={{ position: 'absolute' }}
        />
      </Stack>
    </Stack>
  );
}
