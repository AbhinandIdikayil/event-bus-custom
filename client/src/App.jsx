import { useState } from 'react'
import PostCreate from './pages/PostCreate'
import PostList from './pages/PostList'

function App() {

  return (
    <>
      <PostCreate />
      <hr />
      <h2> posts </h2>
      <PostList />
    </>
  )
}

export default App
