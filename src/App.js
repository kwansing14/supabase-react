import './App.css';
import { useState, useEffect } from 'react';
import { supabase } from './client';

function App() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ title: '', content: '' });
  const { title, content } = [post];
  return <div className='App'></div>;
}

export default App;
