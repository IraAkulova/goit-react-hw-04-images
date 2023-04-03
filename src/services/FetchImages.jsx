const KEY = '33290430-0314363842258507589316bae';
const BASE_URL = 'https://pixabay.com/api/';

export const FetchImages = (query, page) => {
  return fetch(
    `${BASE_URL}?q=${query}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  ).then(response => {
    return response.json();
  });
};
