import './storiesHeader.css'
function StoriesHeader() {
  return (
    <div className="stories-header-container">
      <div className="stories-header">
        <svg className="story-icon" fill="rgb(27, 116, 228)" viewBox="0 0 20 20">
          <g fillRule="evenodd" transform="translate(-446 -350)">
            <path d="M457 368.832a.5.5 0 0 0 .883.323l1.12-1.332a.876.876 0 0 1 .679-.323h3.522a2.793 2.793 0 0 0 2.796-2.784v-10.931a2.793 2.793 0 0 0-2.796-2.785h-3.454a2.75 2.75 0 0 0-2.75 2.75v15.082zm-1.5 0a.5.5 0 0 1-.883.323l-1.12-1.332a.876.876 0 0 0-.679-.323h-3.522a2.793 2.793 0 0 1-2.796-2.784v-10.931a2.793 2.793 0 0 1 2.796-2.785h3.454a2.75 2.75 0 0 1 2.75 2.75v15.082z"></path>
          </g>
        </svg>
        <h5 style={{ color: 'rgb(27, 116, 228)' }}>Stories</h5>
      </div>
    </div>
  )
}

export default StoriesHeader
