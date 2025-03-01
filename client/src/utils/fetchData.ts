export const exerciseOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_EXERCISE_API_KEY,
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_YOUTUBE_API_KEY,
    'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com',
  },
};

export const fetchData = async (
  url: RequestInfo | URL,
  options: RequestInit | undefined
) => {
  console.log('exercised', import.meta.env.VITE_EXERCISE_API_KEY);
  console.log('youtube', import.meta.env.VITE_YOUTUBE_API_KEY);
  console.log('url', url);
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
