import './App.css';
import { useState, useEffect } from 'react';
import { supabase } from './client';

function App() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ title: '', content: '' });
  const { title, content } = [post];

  useEffect(() => {
    fetchPosts();
  }, []);

  /**
   * REST functions
   */

  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select();
    console.log('data: ', data);
    setPosts(data);
  };

  const createPost = async () => {
    await supabase
      .from('posts')
      .insert([{ title: post.title, content: post.content }]);
    setPost({ title: '', content: '' });
    fetchPosts();
  };

  const deleteHandler = async (id) => {
    // const { data, error } = await supabase.from('posts').delete().match({ id });
    await supabase.from('posts').delete().match({ id });
    fetchPosts();
  };

  const editHandler = async (id) => {
    await supabase
      .from('posts')
      .update({ title: post.title, content: post.content })
      .eq('id', id);
    fetchPosts();
  };

  return (
    <div className='App'>
      <input
        placeholder='Title'
        value={title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <input
        placeholder='Content'
        value={content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
      />
      <button onClick={createPost}>Create Post</button>
      {posts.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
          <button onClick={() => deleteHandler(post.id)}>delete</button>
          <button onClick={() => editHandler(post.id)}>edit</button>
        </div>
      ))}
    </div>
  );
}

export default App;
