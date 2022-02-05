const express = require('express')

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123424",
  },
  {
    id: 2,
    name: "Juan Palta",
    number: "051-2342342",
  },
  {
    id: 3,
    name: "David Armas",
    number: "051-284242",
  },
  {
    id: 4,
    name: "Julian Calle",
    number: "051-234242",
  },
]

const PORT = 3001
const app = express()

app.use(express.json())

app.get('/api/v1/persons', (req, res) => {
  return res.status(200).json(persons)
})

app.get('/api/v1/persons/:id', (req, res) => {
  const personID = Number(req.params.id)
  console.log(personID)

  const person = persons.filter(item => item.id === personID)

  if(!person) return res.status(404).json({ message: 'Person not found' });
  return res.status(200).json(person)
})

app.delete('/api/v1/persons/:id', (req, res) => {
  const personID = Number(req.params.id)

  const index = persons.findIndex(item => item.id == personID)

  if( index >= 0 ) return res.status(404).json({ message: 'Not found id person' })

  persons.splice(index, 1)
  return res.status(200).json(persons)
})

app.post('/api/v1/persons', (req, res) => {
  const person = req.body
  const id = persons.length > 0 ? persons.length + 1 : 1;

  if (Object.keys(person).length < 2) return res.status(404).json({ message: "data insert name or number" })
  if ( persons.some( item => item.name === person.name ) ) return res.status(404).json({ message: "name exist!!!" })

  persons.push({id,...person})
  return res.status(200).json(persons)
})


app.put('/api/notes/:id', (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  const notes = notes.find((elem) => elem.id === Number(id))

  if( notes ) return res.status(404).json({ message: 'Note not foun' })

  return res.status(200).json({ message: 'Updated note' })
})



app.get('/info', (req, res) => {
  return res.send(`
    <h1>Phonebook hasinfo for 4 people</h1>
    <h2>Sat Jan 25 2020 19:03:51 GMT+0200 (Eastern European Standard Time)</h2>
  `)
})




app.listen(PORT, () => {
  console.log('Server is running with express')
})
