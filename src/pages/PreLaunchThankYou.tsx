import * as React from 'react';
import { useRouter } from 'next/router';
// @mui
import { Box, Link, Button, Divider, Typography, Stack, DialogProps } from '@mui/material';
// components
import Image from '../components/image';
import Iconify from '../components/iconify';
import { DialogAnimate } from '../components/animate';

// ----------------------------------------------------------------------

export default function PreLaunchThankYou(open: any) {
  const router = useRouter();

  const handleClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Current Page Link',
        url: router.pathname,
      });
    } else {
      console.log("Sorry, your browser doesn't support web sharing.");
    }
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
          px: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h4">Thank you for signing up for our beta test!</Typography>

        <Stack alignItems="center" >
          <Image
            disabledEffect
            alt="rocket"
            src="/assets/images/home/thank_you.svg"
            sx={{ width: 240 }} />
        </Stack>

        <Typography>
          Your participation in the beta test will help us improve and make NativeSay the best it can be. We look forward to your involvement and can&apos;t wait for you to see all the great features we have in store.
          <br />
          <br />
          If you have any question, send us an email at <strong>support@nativesay.com</strong> and we will reply within 24 hours.
          <br /> <br />
          All the best!
        </Typography>

        <Stack
          spacing={2}
          justifyContent="space-between"
          direction={{ xs: 'column-reverse', sm: 'row' }}
        >
          <Button
            fullWidth
            size="large"
            variant="contained"
            startIcon={<Iconify icon="material-symbols:ios-share" />}
            onClick={handleClick}
          >
            Tell Others About NativeSay
          </Button>
        </Stack>
      </Stack>
    </DialogAnimate>
  );
}