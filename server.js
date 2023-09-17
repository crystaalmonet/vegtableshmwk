require('dotenv').config();
const express = require('express');
const app = express();
const fruits = require('./models/vegetable')
const mongoose = require('mongoose');
const Fruit = require('./models/vegetable');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})

// INDUCES

// Index
app.get('/vegetables', (req, res) => {
  Fruit.find({})
    .then((allVeggies) => {
      console.log(allVeggies);
      res.render('Index', { vegetables: allVeggies });
    })
    .catch(error => {
      console.error(error)
    })
});

// New
app.get('/vegetables/new', (req, res) => {
  res.render('New')
})

// Delete
app.delete('/vegetables/:id', (req, res) => {
  Fruit.deleteOne({ _id: req.params.id })
    .then(info => {
      console.log(info)
      res.redirect('/vegetables')
    })
    .catch(error => console.log(error))
})

// Update
app.put('/vegetables/:id', (req, res) => {
  if (req.body.readyToEat === 'on') {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  Vegetablesuit.updateOne({ _id: req.params.id }, req.body)
    .then(info => {
      console.log(info);
      res.redirect(`/vegetables/${req.params.id}`)
    })
})

// Create
app.post('/vegetables', (req, res) => {
  if (req.body.readyToEat === 'on') {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  Vegetables.create(req.body)
    .then((createdVegetables) => {
      res.redirect('/vegetables')
    })
    .catch(error => {
      console.error(error)
    })
});

app.get('/vegetables/seed', (req, res) => {
  Vegetables.insertMany([
    {
      name: 'cucumber',
      color: 'green',
      readyToEat: true
    },
    {
      name: 'potato',
      color: 'brown',
      readyToEat: false
    },
    {
      name: 'squash',
      color: 'yellow',
      readyToEat: true
    }
  ])
})

// Edit
app.get('/vegetables/:id/edit', (req, res) => {
    Vegetables.findOne({ _id: req.params.id })
    .then(foundVegetable => {
      res.render(
        'Edit',
        {
            vegetables: foundVegetable
        }
      )
    })
    .catch(error => console.log(error))
})

// Show
app.get('/vegetables/:id', (req, res) => {
    Vegetables.findOne({ _id: req.params.id })
    .then((foundVegetable) => {
      res.render('Show', {
        fruit: foundVegetable
      })
    })
    .catch(error => {
      console.error(error)
    })
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
});