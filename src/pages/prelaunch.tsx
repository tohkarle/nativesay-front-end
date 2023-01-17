// next
import Head from 'next/head';
// @mui
import { alpha } from '@mui/material/styles';
import { Container, Box, Stack, Button, Typography, IconButton, InputAdornment } from '@mui/material';
// hooks
import useCountdown from '../hooks/useCountdown';
// layouts
import CompactLayout from '../layouts/compact';
import PreLaunchLayout from '../layouts/main';
// _mock
import { _socials } from '../_mock/arrays';
// components
import Iconify from '../components/iconify';
import { CustomTextField } from '../components/custom-input';
// assets
import { ComingSoonIllustration } from '../assets/illustrations';

// ----------------------------------------------------------------------

ComingSoonPage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function ComingSoonPage() {
  const { days, hours, minutes, seconds } = useCountdown(new Date('07/07/2024 21:30'));

  return (
    <>
      <Head>
        <title> NativeSay | How a native would say it</title>
      </Head>

      <Typography variant="h2" paragraph textAlign="center">
        The World's First True Contextual Translator
      </Typography>

      <Typography textAlign="center" sx={{ paddingTop: 1, color: 'text.secondary' }}>
        NativeSay is a translation app that helps users understand the context in which translations should be used, and provides culturally and contextually aware translations.
        <br/><br/>
        Many people are excited about the launch of NativeSay, as it promises to revolutionize the way we learn languages as well as communicate with others in different languages and cultural contexts.
        <br/><br/>
        By joining our waitlist, you will have the opportunity to be one of the first to try out the app as a beta tester. Not only will you get early access to the product, but you will also be able to use it for free during the beta testing phase.
        <br/><br/>
        <strong>Don't miss out on this opportunity to experience the power of effective communication with NativeSay!</strong>
        <br/><br/>
        Sign up now to be the first to know when the app is launched and to secure your spot as a beta tester.
      </Typography>

      <ComingSoonIllustration sx={{ my: 10, height: 240 }} />

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

      <CustomTextField
        fullWidth
        placeholder="Enter your email"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" size="large">
                Join the waitlist
              </Button>
            </InputAdornment>
          ),
          sx: { pr: 0.5 },
        }}
        sx={{ mt: 5 }}
      />

      {/* <Stack spacing={1} alignItems="center" justifyContent="center" direction="row">
        {_socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              '&:hover': {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack> */}


      
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
