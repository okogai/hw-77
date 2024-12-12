import PostsList from './components/Post/PostsList.tsx';
import PostForm from './components/PostForm/PostForm.tsx';

const App = () => {
  return (
    <div>
      <PostForm/>
      <PostsList/>
    </div>
  );
};

export default App;