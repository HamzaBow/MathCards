import { DifficultyLevelsInterface, Field } from "components/cardform/CardForm";

export interface CardData {
  ownerId: string;
  front: Field[];
  back: Field[];
  difficultyLevels: DifficultyLevelsInterface; 
  tags: string[];
}

export interface CardPatchData {
  ownerId?: string;
  front?: Field[];
  back?: Field[];
  difficultyLevels?: DifficultyLevelsInterface; 
  tags?: string[];
}

//-----------------------------------------------------------

export interface CollectionData {
  title: string;
  ownerId: string;
  cardsIds: string[];
  tags: string[];
}

export interface CollectionPatchData {
  title?: string;
  ownerId?: string;
  cardsIds?: string[];
  tags?: string[];
}

//-----------------------------------------------------------

export interface UserData {
  uid: string;
  following: string[];
  collectionsIds: string[];
}
export interface UserPatchData {
  uid?: string;
  following?: string[];
  collectionsIds?: string[];
}
