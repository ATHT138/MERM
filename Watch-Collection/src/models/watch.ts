import { Brand } from "./brand";
import { Comment } from "./comment";

export interface Watches {
  _id: string;
  watchName: string;
  image: string;
  price: number;
  Automatic: boolean;
  watchDescription: string;
  brand: Brand;
  comments: Comment[];
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WatchDetail {
  watch: Watch;
  nameBrand: string;
  totalRate: number;
}

export interface Watch {
  _id: string;
  watchName: string;
  image: string;
  price: number;
  Automatic: boolean;
  watchDescription: string;
  brand: string;
  comments: Comment[];
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WatchForm {
  watchName: string;
  image: string;
  price: number;
  Automatic: boolean;
  watchDescription: string;
  brandName: string;
}
