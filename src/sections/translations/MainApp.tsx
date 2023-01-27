import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { translate } from "src/services/translate";
import { detectLanguages } from "src/services/detectLanguage";
import { useDebouncedCallback } from "use-debounce";
import History from "src/utils/storage/History";
import { Card, Grid } from "@mui/material";
import { ITranslateRequest } from "src/@types/translation";
import { ContextInput } from "./ContextInput";
import { InputBox } from "./InputBox";
import { OutputBox } from "./OutputBox";
import { useRequest } from "ahooks";

// ----------------------------------------------------------------------

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: "fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  height: 450,
}));

const defaultTranslateRequest = {
  text: "",
  languages: [],
  contexts: [],
  target_language: "",
};

// TODO: move to util
const defaultTranslateResponse = {
  text: "",
  language: "",
  romanization: "",
  context: "",
  meaning: "",
  pronunciation_url: "",
  pos: [],
};

const inputRootStyles = {
  ".MuiOutlinedInput-root": {
    // - The Input-root, inside the TextField-root
    "& fieldset": {
      // - The <fieldset> inside the Input-root
      borderColor: "white", // - Set the Input border
    },
    "&:hover fieldset": {
      borderColor: "white", // - Set the Input border when parent has :hover
    },
    "&.Mui-focused fieldset": {
      // - Set the Input border when parent is focused
      borderColor: "white",
    },
  },
};

// ----------------------------------------------------------------------

export default function MainApp() {
  const [translationRequest, setTranslationRequest] =
    useState<ITranslateRequest>(defaultTranslateRequest);
  const [customContexts, setCustomContexts] = useState<string[]>([]);
  const {
    data: translateResponses,
    loading: loadingTranslateResponses,
    error: translateResponsesError,
    run: runTranslate,
  } = useRequest(translate, {
    manual: true,
  });

  const handleTextChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setTranslationRequest((previousState) => {
      return { ...previousState, text: e.target.value };
    });
  };
  const handleTargetLanguage = (_: React.SyntheticEvent, value: string) => {
    setTranslationRequest((previousState) => {
      return { ...previousState, target_language: value };
    });
  };
  const handleLanguageChange = (_: React.SyntheticEvent, value: string[]) => {
    setTranslationRequest((previousState) => {
      return { ...previousState, languages: value };
    });
  };

  const requestTranslation = (_: any) => {
    runTranslate(translationRequest);
    if (translateResponses) {
      for (const response of translateResponses ?? [defaultTranslateResponse]) {
        history?.addHistory({
          from_lang: translationRequest.languages.join(","),
          to_lang: translationRequest.target_language,
          from_text: translationRequest.text,
          to_text: response.text,
        });
      }
    }
  };

  const runDetectLanguage = async () => {
    const response = await detectLanguages(translationRequest.text);
    setTranslationRequest((previousState) => {
      return { ...previousState, languages: response };
    });
  };
  const debouncedRunDetectLanguage = useDebouncedCallback(
    runDetectLanguage,
    500
  );

  useEffect(() => {
    debouncedRunDetectLanguage();
  }, [debouncedRunDetectLanguage, translationRequest.text]);

  // TODO: put in redux store
  const [history, setHistory] = useState<History | null>();

  // We cannot put this is useState because localstorage needs _window_ to be initialised first in nextjs
  // TODO: create a hook for this.
  useEffect(() => {
    setHistory(new History(() => localStorage));
  }, []);

  useEffect(() => {
    setTranslationRequest((previousState) => {
      return { ...previousState, contexts: customContexts };
    });
  }, [customContexts]);

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <ContextInput
        customContexts={customContexts}
        setCustomContexts={setCustomContexts}
      />
      <InputBox
        loading={loadingTranslateResponses}
        values={translationRequest.languages}
        text={translationRequest.text}
        handleLanguageChange={handleLanguageChange}
        handleTextChange={handleTextChange}
        requestTranslation={requestTranslation}
        targetLanguage={translationRequest.target_language}
        handleTargetLanguage={handleTargetLanguage}
      />
      <OutputBox
        loading={loadingTranslateResponses}
        data={translateResponses ?? [defaultTranslateResponse]}
        targetLanguage={translationRequest.target_language}
        handleTargetLanguage={handleTargetLanguage}
      />
    </Grid>
  );
}
