<template>
    <div>
      <h1>Books with ISBN > 1000</h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import db from '../firebase/init.js';
  import { collection, getDocs } from 'firebase/firestore';
  
  export default {
    setup() {
      const books = ref([]);
  
      const fetchBooks = async () => {
        try {
          console.log('Fetching books...');
          const q = collection(db, 'books'); // Fetch all books
          const querySnapshot = await getDocs(q);
          const booksArray = [];
          querySnapshot.forEach((doc) => {
            console.log('Found book:', doc.data());
            booksArray.push({ id: doc.id, ...doc.data() });
          });
          books.value = booksArray;
          console.log('Books array:', books.value);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };
  
      onMounted(() => {
        fetchBooks();
      });
  
      return {
        books,
      };
    },
  };
  </script>