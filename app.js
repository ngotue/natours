const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const app = express();

app.use(morgan('dev'));
app.use(express.json()); // this middleware allows us to access req.body

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);
  if (tour) {
    res.status(200).json({
      status: 'success',
      data: { tour: tours[req.params.id] },
    });
  } else {
    res.status(404).json({
      status: 'Not found',
      message: 'Invalid ID',
    });
  }
};

const createTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);
  if (!tour) {
    res.status(404).json({
      status: 'Not found',
      message: 'Invalid ID',
    });
  }
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) throw new Error(error.message);
      res.status(201).json({
        status: 'created',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);
  if (!tour) {
    res.status(404).json({
      status: 'Not found',
      message: 'Invalid ID',
    });
  }else {
    res.status(200).json({
      status: 'success',
      data: {
        tour: 'updated tour',
      },
    });
  }
};

const deleteTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);
  if (!tour) {
    res.status(404).json({
      status: 'Not found',
      message: 'Invalid ID',
    });
  }else {
    res.status(204).json({
      status: 'success',
      data: {
        tour: null,
      },
    });
  }
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);


app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
