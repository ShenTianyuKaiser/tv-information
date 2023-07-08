export interface ShowInfo {
  id: string; // This is the ID from the API
  name: string;  // This is the name of the show
  rating:ShowRating;  // This is the rating of the show
  image: ShowImage; // This is the image of the show
  summary: string; // This is the summary of the show
  language: string; // This is the language of the show
  premiered: string; // This is the premiered date of the show
  genres: string[]; // This is the genres of the show
  url: string; // This is the url of the show
}

interface ShowRating {
  average: number; // This is the average rating of the show
}

export interface ShowImage {
  medium: string; // This is the medium image of the show
}
