import {Reviews} from '../types/reviews';

export const reviews: Reviews = [
  {
    comment: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, sunt.',
    date: '2022-09-11T12:25:36.946Z',
    id: 111,
    rating: 4.5,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 1111,
      isPro: false,
      name: 'Max'
    }
  },
  {
    comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet architecto assumenda at cumque deserunt, dolorum, earum et excepturi facilis in itaque laborum nemo nulla odio optio qui vero vitae.',
    date: '2022-06-05T12:25:36.946Z',
    id: 222,
    rating: 3.2,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 2222,
      isPro: false,
      name: 'Angelina'
    }
  }
];
