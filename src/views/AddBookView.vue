<template>
    <div>
      <h1>Add Book</h1>
      <form @submit.prevent="addBook">
        <div>
          <label for="isbn">ISBN:</label>
          <input type="text" v-model="isbn" id="isbn" required />
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" required />
        </div>
        <button type="submit">Add Book</button>
      </form>
  
      <!-- Include the BookList component -->
      <BookList />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import db from '../firebase/init.js';
  import { collection, addDoc } from 'firebase/firestore';
  import BookList from '@/components/BookList.vue';
  
  export default {
    components: { BookList },
    setup() {
      const isbn = ref('');
      const name = ref('');
  
      const addBook = async () => {
        console.log('addBook function called');
        try {
          // Store ISBN as a string
          await addDoc(collection(db, 'books'), {
            isbn: isbn.value,
            name: name.value,
          });
          isbn.value = '';
          name.value = '';
          alert('Book added successfully!');
        } catch (error) {
          console.error('Error adding book:', error);
          alert(`Error adding book: ${error.message}`);
        }
      };
  
      return {
        isbn,
        name,
        addBook,
      };
    },
  };
  </script>