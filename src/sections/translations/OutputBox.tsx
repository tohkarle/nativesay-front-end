import Iconify from "src/components/iconify/Iconify";
import { useMediaQuery } from "@material-ui/core";
import { ITranslateResponse } from "src/@types/translation";
import paginationHelper from "./utils/paginationHelper";
import {
  Paper,
  Typography,
  Autocomplete,
  Pagination,
  IconButton,
  TextField,
  Box,
  Card,
  Grid,
  Stack,
  AutocompleteInputChangeReason,
} from "@mui/material";
import { LANGUAGES } from "./utils";
import { useEffect, useState } from "react";
import React from "react";

type Props = {
  loading: boolean;
  data: ITranslateResponse[];
  targetLanguage: string;
  handleTargetLanguage: HandleTargetLanguage;
};

type OutputHeaderBoxProps = {
  targetLanguage: string;
  onInputChange: HandleTargetLanguage;
};

type OutputContainerBoxProps = {
  data: ITranslateResponse;
};

type OutputBoxFooterProps = {
  data: ITranslateResponse[];
};

type HandleTargetLanguage = (
  event: React.SyntheticEvent,
  value: string,
  reason: AutocompleteInputChangeReason
) => void;

export function OutputBox({
  loading,
  data,
  targetLanguage,
  handleTargetLanguage,
}: Props) {
  const [page, setPage] = useState(1);
  const helper = paginationHelper(data);

  const handleClick = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    helper.jump(page);
  };

  useEffect(() => {
    if (!loading) {
      setPage(1);
      helper.jump(1);
    }
  }, [loading]);

  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <OutputBoxHeader
            targetLanguage={targetLanguage}
            onInputChange={handleTargetLanguage}
          />

          <OutputBoxContainer data={helper.currentData()} />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack alignItems="center" direction="row">
              <IconButton>
                <Iconify icon="akar-icons:sound-on" width={24} />
              </IconButton>
              <IconButton>
                <Iconify
                  icon="material-symbols:content-copy-outline"
                  width={24}
                />
              </IconButton>
              <IconButton>
                <Iconify icon="ic:round-star-border" width={30} margin={0.1} />
              </IconButton>
            </Stack>
            <Pagination
              size="large"
              shape="rounded"
              count={data.length}
              siblingCount={0}
              boundaryCount={1}
              page={page}
              onChange={handleClick}
            />
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
}

function OutputBoxHeader({
  targetLanguage,
  onInputChange,
}: OutputHeaderBoxProps) {
  const isDesktop = useMediaQuery("(min-width: 900px)");

  return (
    <>
      {isDesktop && (
        <Autocomplete
          size="small"
          onInputChange={onInputChange}
          sx={{
            width: 150,
            backgroundColor: "rgba(145, 158, 171, 0.08)",
          }}
          options={LANGUAGES}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          defaultValue="English"
          renderInput={(params) => (
            <TextField {...params} placeholder="Select Target Language" />
          )}
        />
      )}
    </>
  );
}

function OutputBoxContainer({ data }: OutputContainerBoxProps) {
  const { text, romanization, context, meaning } = data;

  return (
    <Box
      borderRadius="8px"
      border="1px solid #D3D3D3"
      height={{ xs: "210px", md: "360px" }}
      overflow="auto"
    >
      <Stack spacing={3} sx={{ py: 3, px: 2 }}>
        <Typography
          sx={{
            fontWeight: 450,
            lineHeight: 1.5,
            fontSize: 20,
          }}
        >
          {text}
        </Typography>
        {romanization && (
          <Stack direction="column" spacing={1}>
            <Paper sx={{ display: "flex" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  backgroundColor: "#F4F6F8",
                  padding: 1,
                  borderRadius: 1,
                }}
              >
                Romanisation:
              </Typography>
            </Paper>
            <Typography variant="body1">{romanization}</Typography>
          </Stack>
        )}
        {context && (
          <Stack direction="column" spacing={1}>
            <Paper
              sx={{
                display: "flex",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  backgroundColor: "#F4F6F8",
                  padding: 1,
                  borderRadius: 1,
                }}
              >
                Context explanation:
              </Typography>
            </Paper>
            <Typography variant="body1">{context}</Typography>
          </Stack>
        )}
        {meaning && (
          <Stack direction="column" spacing={1}>
            <Paper
              sx={{
                display: "flex",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  backgroundColor: "#F4F6F8",
                  padding: 1,
                  borderRadius: 1,
                }}
              >
                Meaning:
              </Typography>
            </Paper>
            <Typography variant="body1">{meaning}</Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
