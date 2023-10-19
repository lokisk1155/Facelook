function PostContent({
  post,
  editId,
  editContent,
  setEditContent,
  setEditId,
  submitUpdate,
}) {
  return (
    <div
      className="post-content-container"
      style={{
        width: '100%',
        minHeight: '35px',
        paddingBottom: '5px',
        overflow: 'hidden',
      }}
    >
      {editId !== post.id ? (
        <p
          style={{
            height: '100%',
            margin: '0',
            padding: '7.5px',
          }}
        >
          {post?.content}
        </p>
      ) : (
        <div
          className="edit-update-post-button-container"
          style={{
            display: 'flex',
            paddingBottom: '10px',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <textarea
            className="post-content-textarea"
            autoFocus={editId}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder={post.content}
            maxLength="150"
            style={{
              width: '80%',
              resize: 'none',
              fontSize: '12px',
              minHeight: '10px',
            }}
          ></textarea>
          <div
            style={{
              display: 'flex',
              paddingRight: '15px',
              alignItems: 'center',
            }}
          >
            <button
              style={{
                minHeight: '20px',
                backgroundColor: '#1b74e4',
                border: 'none',
                borderRadius: '2px',
                margin: '5px',
                color: 'white',
              }}
              className="save-cancel-individual-post-buttons"
              onClick={() => setEditId(null)}
            >
              cancel
            </button>
            <button
              style={{
                minHeight: '20px',
                backgroundColor: '#1b74e4',
                border: 'none',
                borderRadius: '2px',
                margin: '5px',
                color: 'white',
                visibility: editContent?.length < 1 ? 'hidden' : '',
              }}
              className="save-cancel-individual-post-buttons"
              onClick={submitUpdate(post.id)}
            >
              save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostContent;
