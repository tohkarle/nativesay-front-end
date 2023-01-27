export type ITranslateRequest = {
  text: string;
  languages: string[];
  contexts: string[];
  target_language: string;
};

export type ITranslateResponse = {
  text: string;
  language: string;
  romanization: string;
  context: string;
  meaning: string;
  pronunciation_url: string;
  pos: string[];
};

export type ITranslationResponse = {
  id: number;
  text: string;
  context: string;
  languages: string;
  outputs: ITranslateResponse[];
};

export type IDetectLanguageRequest = {
  text: string;
};

export type IDetectLanguageResponse = {
  data: {
    main_language: string[];
    other_languages: string[];
    colloquial_languages: string[];
  };
};

export type ISearchVocabRequest = {
  text: string;
};

export type ISearchVocabResponse = {
  definitions: IDefinition[];
};

export type IDefinition = {
  definition: string;
  word_class: string;
};
