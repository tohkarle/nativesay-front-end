// next
import Head from "next/head";
// @mui
import { Box, Container } from "@mui/material";
// redux
// layouts
import MainLayout from "src/layouts/main/MainLayout";
// components
import { useSettingsContext } from "../components/settings";
// sections
import MainApp from "src/sections/translations/MainApp";

// ----------------------------------------------------------------------

ContextTranslationPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function ContextTranslationPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> NativeSay | Speak like a local, anywhere you go</title>
      </Head>

      <Box
        sx={{
          px: { xs: 3, md: 12 },
          pt: 3,
          pb: 9,
        }}
      >
        <MainApp />
      </Box>
    </>
  );
}
