# FaceOok

# Overview

- [faceook](https://faceooook.herokuapp.com/)
- Faceook is a facebook clone.

# Technologies

- Ruby on Rails
- React Redux
- Heroku
- HTML5 and CSS

# Special Features

### About Page

- posts and about page come from the same origin component

```
      {showPosts && <Posts currentUser={currentUser} redirect={redirect}/>}
      {showAbout && <AboutPage currentUser={currentUser} renderString={renderString}/>}
```

 <img width="1458" alt="Screen Shot 2022-10-25 at 9 54 42 AM" src="https://user-images.githubusercontent.com/95663040/197792837-c5251279-a395-4c3c-9823-b066ac4ed2e7.png">
<img width="1470" alt="Screen Shot 2022-10-25 at 9 57 14 AM" src="https://user-images.githubusercontent.com/95663040/197793366-e42364e6-a3a7-4077-9d52-3786984874d0.png">

### Posts

- below is the code snipit that maps over all posts inside the posts slice of state, and displays them inside of the post-container div. Each post comes with the authors profile pic, a button to edit and delete. The edit post code uses the same component that is used to create a post, but is given props to specificy the component should render.

```
   {posts && <div className="individual-post-container">{posts.map(post => {
         return <div key={post.id}className="individual-post">
                    <div key={post.id} className="post-header">
                        <img key={post.id} className="post-pic" src={profilePic}></img>
                        <h5 key={post.id} className="current-user-name">name</h5>
                    </div>

                    <p key={post.id} className="post-content">{post.content}</p>
                    <button onClick={(() => handleDeletePost(post.id))}>Delete Post</button>
                    <button onClick={handleEditPost(post.id)}>Edit Post</button>
                    {checkPost === post.id && <CreatePostModal type="update" currentUser={currentUser}
                    postId={post.id} postContent={post.content} header= {'Editpost'} closeModal={setEditPost}/>}

                </div>}).reverse()}
             </div>
   }
```

# Future Direction

The entire App needs a lot of CSS love. I plan on adding AWS, Friends, likes, and comments to faceook. To cap my project off I want to create a "dating app" inside of faceook, that lets users find friends to add as a friend.
