const Clarifai = require('clarifai');

const app = new Clarifai.App ({
  apiKey: '5462c8c2ace242d68d28f95aa92de699'
});

const handleApiCall = (req, res) => {
  app.models.predict(
    {name: 'face'}, 
    req.body.input
  )
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to process API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err=> res.status(400).json('unable to get entries'))
}

module.exports = { handleImage, handleApiCall }