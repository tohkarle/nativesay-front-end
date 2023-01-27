import {
  ISearchVocabResponse,
  ISearchVocabRequest,
} from 'src/@types/translation';
import baseAxios from 'src/utils/axios';

export const searchVocab = async (input: ISearchVocabRequest) => {
  if (input.text.length === 0) {
    return {
      definitions: [],
    };
  }

  const { data } = await baseAxios.post<ISearchVocabResponse>(
    'translations/search/',
    input
  );
  return data;
};
