// next
import dynamic from 'next/dynamic';
// @mui
import { Stack, Container } from '@mui/material';
// hooks
import useOffSetTop from '../hooks/useOffSetTop';
// config
import { HEADER } from '../config-global';
//
const Header = dynamic(() => import('../layouts/compact/Header'), { ssr: false });

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function PreLaunchLayout({ children }: Props) {
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <>
      <Header isOffset={isOffset} />

      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: 'auto',
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Stack>
      </Container>
    </>
  );
}
