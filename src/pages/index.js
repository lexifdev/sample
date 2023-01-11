import { useState } from 'react'
import { Button, Card, Input, Layout, Menu } from 'antd'

const Container = ({ children }) => (
  <div
    style={{
      maxWidth: '600px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '20px',
    }}
  >
    {children}
  </div>
)

const Title = ({ children }) => (
  <h1
    style={{
      textAlign: 'center',
    }}
  >
    {children}
  </h1>
)

const openAICompletions = async question => {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: question,
      max_tokens: 1000,
    }),
  })
  const data = await response.json()
  return data.choices
}

const IndexPage = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const ask = () => {
    setAnswer('')
    openAICompletions(question).then(answer => {
      setAnswer(answer[0].text)
    })
  }

  return (
    <Layout>
      <Container>
        <Title>무엇이든 물어보세요</Title>
        <Input
          placeholder="궁금한걸 적어보세요"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onPressEnter={ask}
        />
        <Button block onClick={ask}>
          물어보기
        </Button>
        <Card>
          {answer}
        </Card>
      </Container>
    </Layout>
  )
}

export default IndexPage
