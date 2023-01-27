import { useState } from 'react';
import { ITranslateResponse } from 'src/@types/translation';

const defaultTranslateResponse = {
  text: '',
  language: '',
  romanization: '',
  context: '',
  meaning: '',
  pronunciation_url: '',
  pos: [],
};

function paginationHelper(response: ITranslateResponse[]) {
  const [currentPage, setCurrentPage] = useState(0);
  const maxPage = response.length - 1;

  function currentData() {
    if (response.length < 1) {
      return defaultTranslateResponse;
    }
    return response[currentPage];
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(0, currentPage - 1));
  }

  function jump(page: number) {
    const pageNumber = Math.max(0, page - 1);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return { currentData, next, prev, jump };
}

export default paginationHelper;
