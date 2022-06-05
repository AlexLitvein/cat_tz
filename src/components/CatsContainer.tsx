import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICat2 } from '../models/types'; //ICat2,
import { catsAPI } from '../services/CatsService';
import { useAppSelector } from '../store/catsStore';
import { catAdd, catAddMany, catFavAdd, catsSelectors, catUpdate, fetchCats } from '../store/slice/catFavSlicer';
import { CatCard } from './Cat';
import catStyle from './Cat.module.css';

export const CatsContainer = () => {
  // let timer: NodeJS.Timeout;
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(5);
  // const [page, setPage] = useState(1);
  const [page, setPage] = useState(1); //useAppSelector((state) => state.cats.currPage)
  // const page = useAppSelector((state) => state.cats.currPage);
  const {
    data: catsFetched = [],
    error = '',
    isLoading = false,
    isFetching = false,
  } = catsAPI.useFetchCatsQuery({ limit, page });
  // let { catsFetched, error=null, isLoading = false, isFetching = false } = {};
  const cats = useSelector(catsSelectors.selectAll);

  // const onChildClick = (idx: number) => {
  //   dispatch(catAdded(cats[idx]));
  // };

  const onChildClick = (cat: ICat2) => {
    dispatch(catUpdate({ id: cat.id, changes: { isChecked: true } }));
    // dispatch(catFavAdd(cat));
    dispatch(catFavAdd({ ...cat, isChecked: true }));
  };

  // const changePage = (n = 0) => {
  //   setPage((prev) => (prev + n !== 0 ? prev + n : prev));
  // };

  useEffect(() => {
    dispatch(catAddMany(catsFetched.map((catDTO) => ({ ...catDTO, isChecked: false }))));
    // return () => {
    //   clearTimeout(timer);
    // };
  }, [catsFetched]);

  const scrollHandler = () => {
    let isStart = false;
    return (e: any) => {
      let sz = e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight);
      if (!isStart && sz <= 100) {
        isStart = true;
        setPage((prev) => prev + 1);
      }
      if (sz > 100) {
        isStart = false;
      }
    };
  };

  useEffect(() => {
    // ({ data:catsFetched, error, isLoading, isFetching } = catsAPI.useFetchCatsQuery({ limit, page }));

    // dispatch<any>(fetchCats({ limit, page }));

    console.log('mount');
    document.addEventListener('scroll', scrollHandler());
    return () => {
      document.removeEventListener('scroll', scrollHandler());
    };
  }, []);

  const renderList = () => {
    return cats && cats.map((cat) => <CatCard cat={cat} onClick={onChildClick} key={cat.id} />);
    // return cats && cats.map((el, i) => <CatCard idx={i} cat={el} onClick={onChildClick} key={el.id} />);
  };

  const getErrorStr = (e: FetchBaseQueryError | SerializedError | undefined) => {
    let errMsg = '';
    if (e) {
      if ('status' in e) {
        // you can access all properties of `FetchBaseQueryError` here
        errMsg = 'error' in e ? e.error : JSON.stringify(e.data);
      } else {
        // you can access all properties of `SerializedError` here
        errMsg = e.message || '';
      }
      return errMsg;
    }
  };

  console.log('render CatList');
  // isLoading && console.log('isLoading');

  return (
    <>
      <div className={catStyle.сardCont}>
        {/* {isLoading && <h1>Идет загрузка...</h1>} */}

        {/* <button onClick={(e) => changePage(-1)}>prev</button>
      <button onClick={(e) => changePage(1)}>next</button> */}
        {renderList()}
      </div>
      {(isFetching || error) && (
        <div className={catStyle.catLoadCont}>
          {isFetching && <h1>Закружаем котиков...</h1>}
          {error && <h1>{getErrorStr(error)}</h1>}
        </div>
      )}
    </>
  );
};

// const PostContainer = () => {
//   const [limit, setLimit] = useState(100);
//   const {
//     data: posts,
//     error,
//     isLoading,
//     refetch,
//   } = postAPI.useFetchAllPostsQuery(limit);
//   const [createPost, {}] = postAPI.useCreatePostMutation();
//   const [updatePost, {}] = postAPI.useUpdatePostMutation();
//   const [deletePost, {}] = postAPI.useDeletePostMutation();

//   useEffect(() => {
//     // setTimeout(() => {
//     //     setLimit(3)
//     // }, 2000)
//   }, []);

//   const handleCreate = async () => {
//     const title = prompt();
//     await createPost({ title, body: title } as IPost);
//   };

//   const handleRemove = (post: IPost) => {
//     deletePost(post);
//   };

//   const handleUpdate = (post: IPost) => {
//     updatePost(post);
//   };

//   return (
//     <div>
//       <div className="post__list">
//         <button onClick={handleCreate}>Add new post</button>
//         {isLoading && <h1>Идет загрузка...</h1>}
//         {error && <h1>Произошла ошибка при загрузке</h1>}
//         {posts &&
//           posts.map((post) => (
//             <PostItem
//               remove={handleRemove}
//               update={handleUpdate}
//               key={post.id}
//               post={post}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default PostContainer;
