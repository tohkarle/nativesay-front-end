import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Button, Box, Card, Container, Typography, Stack } from '@mui/material';
// components
import Image from '../components/image';
import { MotionViewport, varFade } from '../components/animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: ' /assets/icons/home/opinion.png',
    title: 'Speak Your Mind',
    description: 'NativeSay allows users to input context or select from pre-defined contexts to provide more accurate and relevant translations.',
  },
  {
    icon: ' /assets/icons/home/conversation.png',
    title: 'Understand The Context',
    description:
      'NativeSay provides multiple translations with context explanations. This helps users understand the appropriate usage of each translation.',
  },
  {
    icon: ' /assets/icons/home/rocket.png',
    title: 'Speed Up Your Learning',
    description: 'See an unfamiliar word? Simply click on the pre-highlighted word and a popup with the definition appears. This is best for language learners to speed up their learnings.',
  },
];

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  textAlign: 'center',
  padding: theme.spacing(10, 5),
  [theme.breakpoints.up('md')]: {
    boxShadow: 'none',
  },
}));

// ----------------------------------------------------------------------

interface Props {
  handleClick: () => void;
}

export default function PreLaunchComponent({handleClick}: Props) {
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Stack
          spacing={3}
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 10 },
          }}
        >
          <Typography variant="h2">
            What NativeSay <br /> helps you?
          </Typography>
        </Stack>
        <Box
          gap={{ xs: 3, lg: 10 }}
          display="grid"
          alignItems="center"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {CARDS.map((card, index) => (
            <m.div variants={varFade().inUp} key={card.title}>
              <StyledCard
                sx={{
                  ...(index === 1 && {
                    boxShadow: (theme) => ({
                      md: `-40px 40px 80px ${
                        theme.palette.mode === 'light'
                          ? alpha(theme.palette.grey[500], 0.16)
                          : alpha(theme.palette.common.black, 0.4)
                      }`,
                    }),
                  }),
                }}
              >
                <Image
                  src={card.icon}
                  alt={card.title}
                  sx={{ mx: 'auto', width: 52, height: 52 }}
                />

                <Typography variant="h5" sx={{ mt: 8, mb: 2 }}>
                  {card.title}
                </Typography>

                <Typography sx={{ color: 'text.secondary' }}>{card.description}</Typography>
              </StyledCard>
            </m.div>
          ))}
        </Box>
        <Stack
          component={m.div}
          variants={varFade().inUp}
          spacing={2}
          sx={{
            alignItems: 'center',
            mt: { xs: 5, md: 6 },
          }}
        >
          <Typography textAlign="center" sx={{ color: 'text.secondary' }}>
            And many more features to come...
          </Typography>
          <Button
            onClick={handleClick}
            variant="contained"
            size="large"
            sx={{ width: '200px' }}
          >
            Sign Up For Beta
          </Button>
        </Stack>
      </Container>
    </StyledRoot>
  );
}
