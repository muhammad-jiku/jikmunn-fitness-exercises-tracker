export const exerciseOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': import.meta.env.REACT_APP_EXERCISE_API_KEY,
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': import.meta.env.REACT_APP_YOUTUBE_API_KEY,
    'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com',
  },
};

export const fetchData = async (
  url: RequestInfo | URL,
  options: RequestInit | undefined
) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
