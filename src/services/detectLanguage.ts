import {
  IDetectLanguageRequest,
  IDetectLanguageResponse,
} from "src/@types/translation";
import baseAxios from "src/utils/axios";

export const detectLanguages = async (input: string) => {
  if (input.length === 0) {
    return [];
  }

  const { data } = await baseAxios.post<
    IDetectLanguageRequest,
    IDetectLanguageResponse
  >("translations/detect_language/", { text: input });
  const res = [...data.main_language, ...data.other_languages];

  return res.filter((language) => language !== "None");
};
