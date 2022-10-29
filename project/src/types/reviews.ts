import {User} from './user';

export type ReviewType = {
  comment: string
  date: string
  id: number
  rating: number
  user: User
}

export type Reviews = ReviewType[];

export type ReviewData = {
  comment: string
  rating: number
}
