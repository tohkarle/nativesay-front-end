import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
// @mui
import { Button, Typography, Stack, Divider } from '@mui/material';
// components
import { useSnackbar } from 'notistack';
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import { DialogAnimate } from '../../components/animate';
import SocialButtons from './SocialButtons';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function PreLaunchThankYou({ open, setOpen }: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Current Page Link',
        url: router.pathname,
      });
    } else {
      console.error("Sorry, your browser doesn't support web sharing.");
      enqueueSnackbar("Sorry, your browser doesn't support web sharing.", { variant: 'error' });
    }
  };

  const handleClickGoBack = () => {
    setOpen(false);
  };

  return (
    <DialogAnimate
      fullScreen
      open={open}
      PaperProps={{
        sx: {
          maxWidth: { md: 'calc(100% - 48px)' },
          maxHeight: { md: 'calc(100% - 48px)' },
        },
      }}
    >
      <Stack
        spacing={5}
        sx={{
          m: 'auto',
          maxWidth: 480,
          textAlign: 'center',
          px: { xs: 4, sm: 0 },
        }}
      >
        <Typography variant="h4">Thank you for signing up!</Typography>

        <Stack alignItems="center">
          <Image
            disabledEffect
            alt="rocket"
            src="/assets/images/home/thank_you.svg"
            sx={{ width: 240 }}
          />
        </Stack>

        <Typography>
          The beta test for NativeSay is set to officially launch on January 29th, 2023 We look
          forward to your involvement and can&apos;t wait for you to see all the great features we
          have in store.
          <br />
          <br />
          If you have any question, send us an email at <strong>support@nativesay.com</strong> and
          we will reply within 24 hours.
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack spacing={2}>
          <SocialButtons />
          <Stack
            spacing={2}
            justifyContent="space-between"
            direction={{ xs: 'column-reverse', sm: 'row' }}
          >
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={handleClickGoBack}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              Go Back
            </Button>

            <Button
              fullWidth
              size="large"
              variant="contained"
              startIcon={<Iconify icon="material-symbols:ios-share" />}
              onClick={handleClick}
            >
              Spread the Word
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </DialogAnimate>
  );
}
