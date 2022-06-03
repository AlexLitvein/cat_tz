import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICat } from '../models/types';
import { catsAPI } from '../services/CatsService';
import { useAppSelector } from '../store/catsStore';
import { catAdded, catAddMany, catsSelectors, setCurrPage } from '../store/slice/catFavSlicer';
import { CatCard } from './Cat';
import catStyle from './Cat.module.css';

export const CatsContainer = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(5);
  // const [page, setPage] = useState(1);
  const page = useAppSelector((state) => state.cats.currPage);
  const { data: catsFetched = [], error, isLoading } = catsAPI.useFetchCatsQuery({ limit, page });
  const cats = useSelector(catsSelectors.selectAll);

  const onChildClick = (idx: number) => {
    dispatch(catAdded(cats[idx]));
    // cats?.splice(idx, 1);
  };

  // const changePage = (n = 0) => {
  //   setPage((prev) => {
  //     let p = prev + n !== 0 ? prev + n : prev;
  //     // let p = Math.max(prev, prev + n);
  //     console.log(`p: ${p}`);
  //     return p;
  //   });
  // };

  const changePage = (n = 0) => {
    let p = page + n !== 0 ? page + n : page;
    dispatch(setCurrPage(p));
    console.log(page);
  };

  useEffect(() => {
    dispatch(catAddMany(catsFetched));
  }, [catsFetched]);

  const renderList = () => {
    return cats && cats.map((el) => <CatCard cat={el} onClick={onChildClick} key={el.id} />);
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
    <div className={catStyle.сardCont}>
      {isLoading && <h1>Идет загрузка...</h1>}

      {/* {error && <h1>Ошибка при загрузке</h1>} */}
      {error && <h1>{getErrorStr(error)}</h1>}
      <button onClick={(e) => changePage(-1)}>prev</button>
      <button onClick={(e) => changePage(1)}>next</button>
      {renderList()}
    </div>
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
