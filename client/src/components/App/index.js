import React from 'react';

function App () {
  const textbooks = [{
    title: 'Book1',
    author: 'John Doe',
    year: '3012',
    url: "https://www.youtube.com/"
  }, {
    title: 'Book2',
    author: 'Jane Doe',
    year: '3004',
    url: "https://youtu.be/dQw4w9WgXcQ"
  }]

  return (
    <div style={{margin: 15}}>
      <h1>Lab 3 Solution</h1>

      <Books textbooks={textbooks} />

    </div>
  )
}

function Books({textbooks}) {
  return (
    <div>
      {textbooks.map((item) => {
        return(
          <ul>
            <li>Title: {item.title}</li>
            <p>Author: {item.author}</p>
            <p>Year: {item.year}</p>
            <p>URL: <a href={item.url}>{item.url}</a></p>
          </ul>
        )
      })}
    </div>
  )
}

export default App;