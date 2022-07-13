const cleanLocalStorage = (): void => {
  localStorage.clear();
};

export const settingModal = [
  {
    title: 'Settings',
    btn: [
      {
        save: 'Save',
        cancel: 'Cancel',
        reset: 'Reset',
        close: 'Close',
        cleanLocalStorage, // reset local storage
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
