<template>
  <div id="app">
    <h1>Book Manager</h1>
    <button @click="getBookCount">Get Book Count</button>
    <p v-if="count !== null">Total number of books: {{ count }}</p>
    <p v-if="error" class="error">{{ error }}</p>

    <h2>Add a New Book</h2>
    <input v-model="newBookTitle" placeholder="Book Title" />
    <input v-model="newBookAuthor" placeholder="Author" />
    <button @click="addBook">Add Book</button>

    <h2>All Books</h2>
    <pre>{{ booksJson }}</pre>
  </div>
</template>

<script>
import axios from 'axios';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import db from '@/firebase/init.js'; 

export default {
  name: 'BookManager',
  data() {
    return {
      newBookTitle: '',
      newBookAuthor: '',
      count: null,
      books: [],
      error: null,
    };
  },
  computed: {
    booksJson() {
      return JSON.stringify(this.books, null, 2);
    },
  },
  async mounted() {
    await this.getBookCount();
    await this.getAllBooks();
  },
  methods: {
    async getBookCount() {
      try {
        const response = await axios.get(
          'https://countbooks-42w22b5jgq-uc.a.run.app'
        );
        this.count = response.data.count;
        this.error = null;
      } catch (error) {
        console.error('Error fetching book count:', error);
        this.error = 'Error fetching book count: ' + error.message;
        this.count = null;
      }
    },
    async getAllBooks() {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        this.books = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.error = null;
      } catch (error) {
        console.error('Error fetching books:', error);
        this.error = 'Error fetching books: ' + error.message;
      }
    },
    async addBook() {
      try {
        if (!this.newBookTitle.trim() || !this.newBookAuthor.trim()) {
          this.error = 'Please provide both title and author.';
          return;
        }
        await addDoc(collection(db, 'books'), {
          title: this.newBookTitle,
          author: this.newBookAuthor,
        });
        this.newBookTitle = '';
        this.newBookAuthor = '';
        this.error = null;
        alert('Book added successfully!');
        await this.getBookCount(); // Update book count
        await this.getAllBooks(); // Refresh the list of books
      } catch (e) {
        console.error('Error adding document:', e);
        this.error = 'Error adding book: ' + e.message;
      }
    },
  },
};
</script>

<style scoped>
#app {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1,
h2 {
  text-align: center;
  color: #333;
}

button {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: #42b983;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #369870;
}

input {
  display: block;
  width: calc(100% - 20px);
  margin: 5px auto;
  padding: 10px;
  font-size: 16px;
}

p {
  text-align: center;
  color: #555;
}

.error {
  color: red;
}

pre {
  background-color: #f4f4f4;
  padding: 15px;
  border: 1px solid #ddd;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>