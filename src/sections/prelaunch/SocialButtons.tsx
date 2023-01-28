import { IconButton } from '@mui/material';
import { Stack, alpha } from '@mui/system';
import Iconify from 'src/components/iconify';
import { socialOptions } from './options';

export default function SocialButtons() {
  return (
    <Stack spacing={1} alignItems="center" justifyContent="center" direction="row">
      {socialOptions.map((social) => (
        <IconButton
          key={social.name}
          href={social.path}
          target="_blank"
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
    </Stack>
  );
}
