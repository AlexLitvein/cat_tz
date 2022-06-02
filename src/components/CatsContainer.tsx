import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useState } from 'react';
import { catsAPI } from '../services/CatsService';
import { CatCard } from './Cat';
import catStyle from './Cat.module.css';

export const CatsContainer = () => {
  console.log('render CatList');

  const [limit, setLimit] = useState(10);
  const { data: cats, error, isLoading } = catsAPI.useFetchCatsQuery(limit);

  const onChildClick = (id: number) => {
    console.log('clickHandler', id);
  };

  const renderList = () => {
    return cats && cats.map((el) => <CatCard cat={el} onClick={onChildClick} key={el.id} />);
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

  return (
    <div className={catStyle.сardCont}>
      {isLoading && <h1>Идет загрузка...</h1>}
      {/* {error && <h1>Ошибка при загрузке</h1>} */}
      {error && <h1>{getErrorStr(error)}</h1>}
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
