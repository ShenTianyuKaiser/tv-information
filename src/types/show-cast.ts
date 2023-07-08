import { ShowImage } from "./show-info";

export interface ShowCast {
  person: ShowPerson; // This is the person of the show
  character: ShowCharacter;  // This is the character of the show
}

interface ShowPerson {
  name: string; // This is the name of the person
  image: ShowImage; // This is the image of the person
}

interface ShowCharacter {
  name: string; // This is the name of the character
}
