import { Datum } from './inderface';
// make uniq elements in array

export const makeUniq = (arr: Datum[]) => {
  return arr
    .sort((a, b) => {
      return a.mal_id - b.mal_id;
    })
    .filter((item, index) => {
      return arr.indexOf(item) === index;
    });
};
