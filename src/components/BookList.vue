<template>
    <div>
      <h1>Books</h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          <!-- Display book details -->
          <div v-if="editingBookId !== book.id">
            {{ book.name }} - ISBN: {{ book.isbn }}
            <button @click="startEditing(book)">Edit</button>
            <button @click="deleteBook(book.id)">Delete</button>
          </div>
  
          <!-- Edit form for the book -->
          <div v-else>
            <input type="text" v-model="editName" />
            <input type="text" v-model="editIsbn" />
            <button @click="updateBook(book.id)">Save</button>
            <button @click="cancelEditing">Cancel</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import db from '../firebase/init.js';
  import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
  } from 'firebase/firestore';
  
  export default {
    setup() {
      const books = ref([]);
      const editingBookId = ref(null);
      const editName = ref('');
      const editIsbn = ref('');
  
      const fetchBooks = async () => {
        try {
          console.log('Fetching books...');
          const q = query(
            collection(db, 'books'),
            where('name', '!=', ''),
            orderBy('name'),
            limit(10)
          );
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
  
      const startEditing = (book) => {
        editingBookId.value = book.id;
        editName.value = book.name;
        editIsbn.value = book.isbn;
      };
  
      const cancelEditing = () => {
        editingBookId.value = null;
        editName.value = '';
        editIsbn.value = '';
      };
  
      const updateBook = async (id) => {
        try {
          const bookRef = doc(db, 'books', id);
          await updateDoc(bookRef, {
            name: editName.value,
            isbn: editIsbn.value,
          });
          console.log('Book updated');
          cancelEditing();
          fetchBooks(); // Refresh the list
        } catch (error) {
          console.error('Error updating book:', error);
        }
      };
  
      const deleteBook = async (id) => {
        try {
          const bookRef = doc(db, 'books', id);
          await deleteDoc(bookRef);
          console.log('Book deleted');
          fetchBooks(); // Refresh the list
        } catch (error) {
          console.error('Error deleting book:', error);
        }
      };
  
      onMounted(() => {
        fetchBooks();
      });
  
      return {
        books,
        editingBookId,
        editName,
        editIsbn,
        fetchBooks,
        startEditing,
        cancelEditing,
        updateBook,
        deleteBook,
      };
    },
  };
  </script>