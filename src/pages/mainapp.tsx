import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { m, useScroll, useSpring } from 'framer-motion';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from '../redux/store';
import { getProducts } from '../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import { useSettingsContext } from '../components/settings';
import CustomBreadcrumbs from '../components/custom-breadcrumbs';
// sections
import ProductNewEditForm from '../sections/@dashboard/e-commerce/ProductNewEditForm';
// layouts
import MainLayout from '../layouts/main';

// ----------------------------------------------------------------------

MainApp.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------


export default function MainApp() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const {
    query: { name },
  } = useRouter();

  const currentProduct = useSelector((state) =>
    state.product.products.find((product) => paramCase(product.name) === name)
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title> NativeSay |How a native would say</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <ProductNewEditForm isEdit currentProduct={currentProduct} />
      </Container>
    </>
  );
}