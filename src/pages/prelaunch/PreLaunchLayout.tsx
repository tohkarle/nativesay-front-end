// next
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// @mui
import { Box } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
// config
import { HEADER } from '../../config-global';
//
const Header = dynamic(() => import('../../layouts/compact/Header'), { ssr: false });

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { pathname } = useRouter();
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header isOffset={isOffset} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
