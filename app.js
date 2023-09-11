const express =require('express')

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World',
        app: 'natours app'
    })
})

app.post('/', (req, res) => {
    res.status(201).send('good job')
})

const port = 3000
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});