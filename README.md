# [Facelook (live link)](https://faceooook.herokuapp.com/)
Welcome to Facelook, my full-stack clone of Facebook, started during my time at App Academy. This project encapsulates the first year of my journey in software development, showcasing both my growth and the challenges I faced. While it may have its imperfections, the experience gained in development, refactoring, and debugging has been pivotal in my evolution as a software engineer. A standout feature of this project is the dynamic User Text Stories. I innovated a method to save both text and inline CSS styles, enabling the recreation of unique user-generated content. This feature, though not groundbreaking, marked a significant milestone in my journey, giving me a profound sense of accomplishment as an engineer

## 💻 Stack

### Ruby on Rails 
Standing as the server-side framework in this stack. Rails taught me how to manage web applications efficiently, with a clear separation of concerns – the models managing data and business logic, the views handling data presentation, and the controllers acting as an intermediary between models and views. By following established conventions, Rails automates many tasks, allowing developers to focus on the unique aspects of their application

### React 
React has transformed UI development with its component-based architecture, streamlining the management of state and props to craft dynamic and responsive interfaces. It unified the aspects of frontend development for me, offering a sense of cohesion that was less apparent in other frameworks. Ruby on Rails shares parallels, especially with its controllers akin to the supportive role of JavaScript for the view or JSX. However, the ability to manipulate both state and presentation directly on the frontend, a shift from my experience with Ruby on Rails, felt empowering, almost like acquiring a new superpower in web development, a JS superpower that was for sure abused 

### Redux
Integrating Redux into my project was a pivotal learning experience, particularly with the introduction of the Redux logger middleware. This tool provided invaluable insights into the state changes and rerenders within my application, allowing me to understand and optimize the rendering process at a much deeper level. By visually tracking each action and the resulting state transition, I gained a clearer comprehension of how data flows and triggers updates in the application, significantly enhancing my debugging and development skills

### PostgreSQL 
PostgreSQL is a robust, SQL-compliant database system, renowned for its advanced features, data integrity, and support for complex queries. Its relational nature allows for efficient organization and manipulation of data, making it an excellent choice for platforms like Facebook that require extensive Create, Read, Update, and Delete (CRUD) operations.

### AWS
Amazon Web Services (AWS) proved crucial in my project, especially through the use of S3 for robust, scalable cloud storage and IAM for secure access management, enabling efficient and secure image uploads. This integration highlights AWS's versatility and capacity to enhance web applications, ranging from straightforward hosting to complex, data-driven functionalities

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
