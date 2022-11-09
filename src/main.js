import './style.css';

import {
  fillUsersSelect,
  fillPosts,
  fillFeaturedPostComments,
  clearPageData,
  fillErrorMessage,
} from './utils/updateUI';

const usersSelect = document.querySelector('#users-select');

const USERS_API = 'https://dummyjson.com/users';
// faça a lógica para pegar as informações das pessoas usuárias e preencher o select aqui.

fetch(USERS_API)
  .then(response => response.json())
    .then(data => fillUsersSelect(data.users))

usersSelect.addEventListener('change', () => {
  clearPageData();
  // faça a lógica para pegar as informações dos posts da pessoa selecionada e dos comentários do post destacado aqui.
  fetch(`https://dummyjson.com/posts/user/${usersSelect.value}`)
    .then(response => response.json())
    .then(data => {
      fillPosts(data.posts);
      return fetch(`https://dummyjson.com/posts/${data.posts[0].id}/comments`)})
    .then(response => response.json())
    .then(data => fillFeaturedPostComments(data.comments))
    .catch(error => fillErrorMessage(error.message))
});
