import { clean } from './utils/storage';

export const settingModal = [
  {
    title: 'Settings',
    btn: [
      {
        save: 'Save',
        cancel: 'Cancel',
        reset: 'Reset',
        close: 'Close',
        clean, // reset local storage
      },
    ],
    sortBtn: [
      {
        price: 'Price',
        genres: 'Genres',
        authors: 'Authors',
      },
    ],
  },
];
