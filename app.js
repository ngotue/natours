const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json()); // this middleware allows us to access req.body

app.use((req, res, next) => {
  
})

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
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
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updated tour',
    },
  });
};

const deleteTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);
  if (!tour) {
    res.status(404).json({
      status: 'Not found',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
};

app.route('/api/v1/tours').get(getAllTours)
                          .post(createTour);

app.route('/api/v1/tours/:id').get(getTour)
                              .patch(updateTour)
                              .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
