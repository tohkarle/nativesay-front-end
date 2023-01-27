import { ITranslationResponse } from 'src/@types/translation';
import baseAxios from 'src/utils/axios';

export const getTranslations = async () => {
  const { data } = await baseAxios.post<ITranslationResponse[]>(
    'translations/'
  );
  return data;
};
