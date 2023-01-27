import { ITranslateResponse, ITranslateRequest } from 'src/@types/translation';
import baseAxios from 'src/utils/axios';

export const translate = async (input: ITranslateRequest) => {
  if (
    input.text.length === 0 ||
    input.languages.length === 0 ||
    input.target_language === ''
  ) {
    return [];
  }

  const { data } = await baseAxios.post<ITranslateResponse[]>(
    'translations/translate/',
    input
  );
  return data;
};
