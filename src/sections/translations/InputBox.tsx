import Iconify from "src/components/iconify/Iconify";
import React from "react";
import { useMediaQuery } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { LANGUAGES } from "./utils";
import { MouseEventHandler, useEffect, useMemo, useState } from "react";
import History from "src/utils/storage/History";
import HistoryDisplay from "./History";
import {
  IconButton,
  useTheme,
  Grid,
  Stack,
  Card,
  Autocomplete,
  TextField,
  Box,
  Button,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteValue,
  AutocompleteInputChangeReason,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
  loading: boolean;
  values: string[];
  text: string;
  targetLanguage: string;
  handleLanguageChange: HandleLanguageChange;
  handleTargetLanguage: HandleTargetLanguage;
  handleTextChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  requestTranslation: MouseEventHandler<HTMLButtonElement>;
};

type InputBoxHeaderProps = {
  values: string[];
  targetLanguage: string;
  onChange: HandleLanguageChange;
  onInputChange: HandleTargetLanguage;
};

type InputBoxInputContainerProps = {
  text: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};

type InputBoxFooterProps = {
  loading: boolean;
  text: string;
  onClickTranslate: MouseEventHandler<HTMLButtonElement>;
};

type HandleLanguageChange = (
  event: React.SyntheticEvent,
  value: AutocompleteValue<any, any, any, any>,
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails
) => void;

type HandleTargetLanguage = (
  event: React.SyntheticEvent,
  value: string,
  reason: AutocompleteInputChangeReason
) => void;

// ----------------------------------------------------------------------

export function InputBox({
  loading,
  values,
  text,
  targetLanguage,
  handleLanguageChange,
  handleTextChange,
  requestTranslation,
  handleTargetLanguage,
}: Props) {
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={{ xs: 2, md: 3 }}>
          <InputBoxHeader
            values={values}
            onChange={handleLanguageChange}
            targetLanguage={targetLanguage}
            onInputChange={handleTargetLanguage}
          />
          <InputBoxInputContainer text={text} onChange={handleTextChange} />
          <InputBoxFooter
            loading={loading}
            text={text}
            onClickTranslate={requestTranslation}
          />
        </Stack>
      </Card>
    </Grid>
  );
}

function InputBoxHeader({
  values,
  targetLanguage,
  onChange,
  onInputChange,
}: InputBoxHeaderProps) {
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Autocomplete
        multiple
        size="small"
        sx={{
          minWidth: { xs: 120, md: 180 },
          maxWidth: "100%",
          backgroundColor: "rgba(145, 158, 171, 0.08)",
        }}
        options={LANGUAGES}
        getOptionLabel={(option) => option}
        onChange={onChange}
        value={values}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} label="Detect Languages" />
        )}
      />

      <Iconify
        visibility={{ xs: "visible", md: "hidden" }}
        icon="ph:arrows-left-right"
        width={24}
      />

      {isMobile && (
        <Autocomplete
          size="small"
          onInputChange={onInputChange}
          sx={{
            minWidth: { xs: 120, md: 180 },
            maxWidth: "100%",
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
    </Stack>
  );
}

function InputBoxInputContainer({
  text,
  onChange,
}: InputBoxInputContainerProps) {
  const isDesktop = useMediaQuery("(min-width: 900px)");
  const rows = isDesktop ? 10 : 6;

  return (
    <Box
      borderRadius="8px"
      border="1px solid #D3D3D3"
      height={{ xs: "210px", md: "360px" }}
    >
      <TextField
        onChange={onChange}
        fullWidth
        multiline
        rows={rows}
        placeholder="Type the text to translate"
        InputProps={{
          style: {
            fontWeight: 450,
            lineHeight: 1.5,
            fontSize: 20,
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& > fieldset": { border: "none" },
          },
        }}
      />
    </Box>
  );
}

function InputBoxFooter({
  loading,
  text,
  onClickTranslate,
}: InputBoxFooterProps) {
  const isDesktop = useMediaQuery("(min-width: 900px)");
  const theme = useTheme();
  const [historyOpen, setHistoryOpen] = useState(false);
  const handleOpen = () => {
    setHistoryOpen(true);
  };
  const handleClose = () => {
    setHistoryOpen(false);
  };

  // TODO: put in redux store
  const [history, setHistory] = useState<History | null>();

  const historyValues = history?.getHistory();
  console.log(historyValues);

  const historyArr = useMemo(
    () => history?.getHistory() || [],
    [history, historyValues]
  );
  // useEffect(() => {
  //   setHistoryArr(history?.getHistory() || []);
  // }, [history, historyValues]);

  // We cannot put this is useState because localstorage needs _window_ to be initialised first in nextjs
  // TODO: create a hook for this.
  useEffect(() => {
    setHistory(new History(() => localStorage));
  }, []);

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack alignItems="center" direction="row">
        <IconButton>
          <Iconify icon="material-symbols:mic-outline-rounded" width={24} />
        </IconButton>
        <IconButton>
          <Iconify icon="akar-icons:sound-on" width={24} />
        </IconButton>
        <IconButton>
          <Iconify icon="material-symbols:content-copy-outline" width={24} />
        </IconButton>
        {isDesktop ? (
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.grey[200],
              color: theme.palette.grey[800],
              "&:hover": {
                boxShadow: theme.customShadows.z8,
                backgroundColor: theme.palette.grey[400],
              },
            }}
            startIcon={<Iconify icon="eva:book-fill" width={24} />}
          >
            History
          </Button>
        ) : (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:book-fill" width={24} />
          </IconButton>
        )}
        <Dialog
          fullWidth
          maxWidth="md"
          open={historyOpen}
          onClose={handleClose}
        >
          <DialogTitle>History</DialogTitle>
          <DialogContent>
            {historyValues?.length ? (
              <HistoryDisplay
                history_arr={historyArr}
                setHistory={setHistory}
              />
            ) : (
              <DialogContentText>No history yet</DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Stack>
      <LoadingButton
        type="submit"
        variant="contained"
        size="medium"
        onClick={onClickTranslate}
        disabled={text.length === 0}
        loading={loading}
        sx={{ px: { md: 3 }, py: { md: 1.5 } }}
      >
        Translate
      </LoadingButton>
    </Stack>
  );
}
