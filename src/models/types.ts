//   { json placeholder photo
//     "albumId": 1,
//     "id": 1,
//     "title": "accusamus beatae ad facilis cum similique qui sunt",
//     "url": "https://via.placeholder.com/600/92c952",
//     "thumbnailUrl": "https://via.placeholder.com/150/92c952"
//   },

export interface ICatDTO {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface ICat2 extends ICatDTO {
  isChecked: boolean;
}

export interface IFetchCatsParams {
  limit: number;
  page: number;
}

export interface CatCardProp {
  cat: ICat2;
  onClick?: (cat: ICat2) => void;
}
