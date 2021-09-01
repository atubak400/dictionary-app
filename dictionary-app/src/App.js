import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Container } from '@material-ui/core'
import Header from './components/header/Header'
import Definitions from './components/Definitions/Definitions'

function App() {
  const [word, setWord] = useState('')
  const [meanings, setMeanings] = useState([])
  const [category, setCategory] = useState('en')

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      )

      console.log(data)
      setMeanings(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(meanings)

  useEffect(() => {
    dictionaryApi()
  }, [word, category])
  return (
    <div className='App'>
      <Container className='container' maxWidth='md'>
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
        />
        {meanings && (
          <Definitions word={word} meanings={meanings} category={category} />
        )}
      </Container>
    </div>
  )
}

export default App
