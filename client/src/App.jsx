import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState('')
  const [releaseYear, setReleaseYear] = useState('')
  const [newTitle, setNewTile] = useState('')

  const addBooks = async () => {
    const bookData = {
      book_title: title,
      release_year: releaseYear,
    }
    try {
      const res = await axios.post("http://localhost:8000/api/books/create/", bookData)
      setBooks(prev => [...prev, res.data])
      setTitle('')
      setReleaseYear('')
      alert("Add successfully")
    } catch (err) {
      alert("Some error occured")
      console.log(err);
    }
  }

  const updateBook = async (id, date) => {
    const bookData = {
      book_title: newTitle,
      release_year: date,
    }
    try {
      const res = await axios.put(`http://localhost:8000/api/books/${id}`, bookData)
      setBooks(prev => prev.map(book => book.id === id ? res.data : book))
      alert("Save successfully")
    } catch (err) {
      alert("Some error occured")
      console.log(err);
    }
  }

  const deleteBook = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/books/${id}`)
      setBooks(prev => prev.filter(book => book.id !== id))
      alert("Delete successfully")
    } catch (err) {
      alert("Some error occured")
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/books/")
        const data = await res.data
        setBooks(data)
      } catch (err) {
        console.log(err);
      }
    }
    fetchBooks()
  }, [])


  return (
    <div className='layout'>
      <div className='wrapper'>
        <div className='book-form'>
          <h2>Add book</h2>
          <div className="mb-3 book-input">
            <label htmlFor="book_title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="book_title"
              placeholder='Input Title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3 book-input">
            <label htmlFor="release_year" class="form-label">Release Year</label>
            <input
              type="number"
              className="form-control"
              id="release_year"
              placeholder='Input Year'
              value={releaseYear}
              onChange={e => setReleaseYear(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={addBooks}>Add book</button>
        </div>
      </div>

      <h2>List books</h2>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Release Year</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <th>{index + 1}</th>
              <td>{book.book_title} </td>
              <td>{book.release_year}</td>
              <td className='row-edit'>
                <input
                  className="form-control w-50"
                  type="text"
                  placeholder='New title'
                  onChange={e => setNewTile(e.target.value)}
                />
                <button className='btn btn-secondary' onClick={() => updateBook(book.id, book.release_year)}>Save</button>
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => deleteBook(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
