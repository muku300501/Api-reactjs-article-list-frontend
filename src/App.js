import React from 'react';
import './App.css';
import {useState, useEffect} from 'react'; 
import ArticleList from './Components/ArticleList'; 
import Form from './Components/Form';
import {useCookies} from 'react-cookie';


function App() {

  const [articles, setArticles] = useState([])
  const [editArticle, setEditArticle] = useState(null)
  const [token] = useCookies(['mytoken'])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles/', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mytoken']}`
      }
    })
    .then(response => response.json())
    .then(response => setArticles(response))
    .catch(error => console.log(error))
  
  }, [token])

  const editBtn = (article) => {
     setEditArticle(article)
  }

  const updateInformation = (article) => {
    const new_article = articles.map(myarticle => {
      if(myarticle.id === article.id){
        return article;
      }
      else{
        return myarticle;
      }
    })

    setArticles(new_article)
  } 

  const articleForm = () => {
    setEditArticle({title:'', description:''})
  }

  const insertedInformation = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }

  const deleteBtn = (article) => {
    const new_articles = articles.filter(myarticle => {
      if(myarticle.id === article.id) {
        return false;
      }
      return true;
    })

    setArticles(new_articles)
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h1>Django And ReactJS Course</h1>
          <br />
        </div>
        <div className="col">
          <button onClick={articleForm} className="btn btn-primary">Insert Article</button>
        </div>
      </div>
      <br />
      <ArticleList articles={articles} editBtn={editBtn} deleteBtn={deleteBtn} />

      {editArticle ? <Form article={editArticle} updateInformation={updateInformation} insertedInformation={insertedInformation} /> : null }

    </div>
  );
}

export default App;
