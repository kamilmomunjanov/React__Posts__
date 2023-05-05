import React, {useEffect, useState} from "react";
import "./styles/App.css"
import PostList from "./components/PostList";
import MyButton from "./components/Ui/button/MyButton";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/Ui/MyModal/MyModal";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/Ui/loader/Loader";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort:"", query:""})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.post, filter.query)
    const [isPostLoading, setIsPostsLoading] = useState(false)


    useEffect(() => {
        fetchPosts()
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

   async function fetchPosts() {
        setIsPostsLoading(true)
       setTimeout(async() => {
           const posts = await PostService.getAll()
           setPosts(posts)
           setIsPostsLoading(false)
       }, 1000)

    }

    const removePost = (post) => {
        setPosts(posts.filter(el => el.id !== post.id))
    }

  return (
    <div className="App">
        <MyButton onClick={fetchPosts}>GET POSTS</MyButton>
        <MyButton style={{marginTop: "30px"}} onClick={() => setModal(true)}>Create user</MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost}/>
        </MyModal>

        <hr style={{margin: "15px 0"}}/>
        <PostFilter filter={filter} setFilter={setFilter}/>
        {isPostLoading
            ? <div style={{display:"flex", justifyContent:"center", marginTop:"50px"}}><Loader/></div>
            : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Posts about Js"/>
        }

    </div>
  );
}

export default App;
