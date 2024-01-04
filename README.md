# [Facelook (live link)](https://faceooook.herokuapp.com/)

Welcome to Facelook, my full-stack clone of Facebook, started during my time at App Academy. This project encapsulates the first year of my journey in software development, showcasing both my growth and the challenges I faced. While it may have its imperfections, the experience gained in development, refactoring, and debugging has been pivotal in my evolution as a software engineer. A standout feature of this project is the dynamic User Text Stories. I innovated a method to save both text and inline CSS styles, enabling the recreation of unique user-generated content. This feature, though not groundbreaking, marked a significant milestone in my journey, giving me a profound sense of accomplishment as an engineer

## 💻 Stack

### Ruby on Rails

Introduced me to modern web application development and the MVC framework. It taught me efficient web application management. Within its structure, models are the heart of data and logic, views elegantly present this data, and controllers seamlessly interweave the two. The Rails philosophy of 'convention over configuration' significantly streamlines routine processes, freeing me to concentrate on the distinct features of my application

### React

Transformed my approach to crafting dynamic user interfaces. This shift to React meant embracing a more direct and interactive way of building web interfaces. With React Hooks, I found a more intuitive and efficient way to manage state and lifecycle features in my applications, enhancing the reactivity and interactivity of user interfaces. This newfound capability, akin to a JavaScript superpower, energized my development process. I embraced React's reactive paradigm with eagerness, although sometimes my enthusiasm led me to explore its limits a bit too fervently

### Redux

Integrating Redux into my project was a pivotal learning experience, particularly with the introduction of the Redux logger middleware. This tool provided invaluable insights into the state changes and rerenders within my application, allowing me to understand and optimize the rendering process at a much deeper level. By visually tracking each action and the resulting state transition, I gained a clearer comprehension of how data flows and triggers updates in the application, significantly enhancing my debugging and development skills

### PostgreSQL

PostgreSQL is a robust, SQL-compliant database system, renowned for its advanced features, data integrity, and support for complex queries. Its relational nature allows for efficient organization and manipulation of data, making it an excellent choice for platforms like Facebook that require extensive Create, Read, Update, and Delete (CRUD) operations.

### AWS

Integrated S3 for robust, scalable cloud storage and IAM for secure access management, enabling efficient and secure image uploads. This integration highlights AWS's versatility and capacity to enhance web applications, ranging from straightforward hosting to complex, data-driven functionalities

# 📝 Architecture

### CSRF Authorization & Validation

```
async function csrfFetch(url, options = {}) {
  options.method = options.method || 'GET'
  options.headers = options.headers || {}
  options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token')

  if (options.method.toUpperCase() !== 'GET' && !(options.body instanceof FormData)) {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json'
  }

  const res = await fetch(url, options)
  if (res.status >= 400) throw res
  return res
}
```

CSRF attacks are a concern because they can trick a user into submitting a request to a web application where they are authenticated without their knowledge or intent. The CSRF token mechanism is a defense strategy against such attacks. It works by ensuring that every client-side request to the server is accompanied by a unique, secret token that the server can verify. This token is not accessible by third-party websites, thus making it difficult for attackers to forge a valid request.

# Redux Data Structures

```
   simpleUsers = [
     [user_id] = {
        id: number,
        picture: string || null,
        name: string,
      }
   ]
```

On application load, a simple verison of each user is fetched and stored in simpleUsers state for dynamic search

```
  sessionUser {
    id: number
    /* an array of user id's that have an associated friendship are eagerloaded on user queries*/
    friends: Array<[user_id's]>
    language: string || null
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    bio: string || null
    location: string || null
    month: string || null,
    phone_number: string || null,
    places_lived: string || null,
    places_worked: string || null,
    profile_picture: string,
    gender: string || null,
    highschool: string || null,
    relationship: string || null,
    social_link: string || null,
    website: string || null,
    work: string || null,
    year: string || null
    created_at: Date
    updated_at: Date
}
```

sessionUser holds the data for the user that login into the application

```
  currentUser {
    id: number
    /* an array of user id's that have an associated friendship are eagerloaded on user queries*/
    friends: Array<[user_id's]>
    language: string || null
    email: string,
    first_name: string,
    last_name: string,
    bio: string || null
    location: string || null
    month: string || null,
    phone_number: string || null,
    places_lived: string || null,
    places_worked: string || null,
    profile_picture: string,
    gender: string || null,
    highschool: string || null,
    relationship: string || null,
    social_link: string || null,
    website: string || null,
    work: string || null,
    year: string || null
    created_at: Date
    updated_at: Date
}
```

When visiting a different users profile, the currentUser slice of state is populated with the necesscary data to display the users profile page

```
   posts = [
     [post_id] = {
        id: number,
        user_id: number,
        picture: string || null,
        content: string || null,
        created_at: Date,
        updated_at: Date
      }
   ]
```

On application load, all posts are fetched and stored within an array inside the post slice of state.

```
   stories = [
      {
        [user_id] = [
          [story_id] = {
            id: number,
            user_id: number,
            picture: string || null,
            /*  inline styling to replicate user creation  */
            background_color: string || null,
            color: string || null,
            font_size: string || null,
            font_type: string || null,
            paddig_left: string || null,
            paddig_right: string || null,
            padding_y: string || null,
            padding_x: string || null,
            created_at: Date,
            updated_at: Date
          }
        ]
      }
   ]
```

Stories are fetched on application and load and organized by user_id to facilitate simple iteration

# Code Examples

The handleNext function is an integral component of the user interface, essential for navigating through a collection of stories submitted by users. Designed to facilitate seamless and intuitive progression, this function adeptly utilizes the browser's URL to key into a specific user's stories within the application's state. This approach not only enhances the user experience but also ensures efficient state management and navigation consistency.

Technically, the function dynamically updates the navigation state, represented by currentWindow, and interacts seamlessly with the browser's history API, utilizing methods like history.push and history.replace. This dual capability not only provides a fluid and responsive user experience across various stories and user profiles but also highlights the function's adaptability and robustness in managing complex user interactions within a dynamic web environment.

```
const { id } = useParams()

const query = new URLSearchParams(location.search)

/* if a user selects a story from the home page, get the index from params */
const windowIndex = query.get('windowIndex')

const [currentWindow, setCurrentWindow] = useState(
  windowIndex !== null ? parseInt(windowIndex) : 0
)

const currentStory = stories[id][currentWindow]

useEffect(() => {
  const intervalId = setInterval(() => {
    handleNext()
  }, 3500)

  return () => clearInterval(intervalId)
}, [dispatch, handleNext, id, sessionUser, simpleUsers, stories, currentWindow])

const handleNext = useCallback(
    (e) => {
      if (e) {
        e.preventDefault()
      }
      if (stories[id] === null || stories[id] === null) {
        return null
      }
      history.replace(`/stories/${id}`)
      if (parseInt(id) === sessionUserId) {
        if (currentWindow === Object.values(stories[id])?.length - 1) {
          for (const userId in stories) {
            if (simpleUsers[userId] !== undefined && parseInt(userId) !== sessionUserId) {
              setCurrentWindow(0)
              return history.push(`/stories/${userId}`)
            }
          }
        } else {
          const newWindow = currentWindow + 1
          setCurrentWindow(newWindow)
        }
      } else {
        if (currentWindow === Object.values(stories[id])?.length - 1) {
          let firstId = false
          let found = false
          let target = Object.keys(stories).length - 1
          let current = 0
          for (const userId in stories) {
            if (!firstId) {
              firstId = userId
            }
            current += 1
            if (found) {
              setCurrentWindow(0)
              return history.push(`/stories/${userId}`)
            }
            if (userId === id) {
              if (current === target) {
                setCurrentWindow(0)
                return history.push(`/stories/${firstId}`)
              }
              found = true
            }
          }
        } else {
          if (currentWindow === 0 && stories[id].length === 1) {
            for (const userId in stories) {
              return history.push(`/stories/${userId}`)
            }
          }
          const newWindow = currentWindow + 1
          setCurrentWindow(newWindow)
        }
      }
    },
    [id, simpleUsers, stories, currentWindow, history, sessionUserId]
  )
```

To faciliate the code above, I organized my stories JSON response with jBuilder

```
  @stories.each do |user_id, stories|
    json.set! user_id do
      json.array! stories do |story|
        json.extract! story, :id, :background_color, :font_size, :padding_left, :padding_right, :padding_y, :color,
                    :text_content, :user_id, :font_type, :created_at, :updated_at
        json.picture story.photo.url
      end
    end
  end

```

## Pages

## ⚙️ Setting Up

### Must Haves:

- [Ruby 3.1.2](https://www.ruby-lang.org/en/downloads/)
- [Rails 7](https://guides.rubyonrails.org/v5.0/getting_started.html)

Create a rails database and configure the database.yml file:

```
development:
  <<: *default
  database: RailsBackend_development

```

Install Rails Gem's

```
Bundle install
```

Run migration Files

```
rails db:migrate
```

<br>

## 🚀 Run Locally

1.Clone the Fish-Hatchery-Inventory-system repository:

```sh
git clone https://github.com/lokisk1155/Facelook
```

2.Install the dependencies with one of the package managers listed below inside of the frontend folder:

```bash
npm install
```

3.Start the development mode from the root of the project:

```bash
npm start
```

## 🙌 Contributors

<table style="border:1px solid #404040;text-align:center;width:100%">
I would like to thank Dan for his consistent and invaluable mentorship during my initial two years in the software 
<tr><td style="width:14.29%;border:1px solid #404040;">
        <a href="https://github.com/lokisk1155" spellcheck="false">
          <img src="https://avatars.githubusercontent.com/u/95663040?v=4?s=100" width="100px;" alt="lokisk1155"/>
          <br />
          <b>lokisk1155</b>
        </a>
      </td><td style="width:14.29%;border:1px solid #404040;">
        <a href="https://github.com/dmallon1" spellcheck="false">
          <img src="https://avatars.githubusercontent.com/u/14059956?v=4?s=100" width="100px;" alt="dmallon1"/>
          <br />
          <b>dmallon1</b>
        </a>
      </td></table>
