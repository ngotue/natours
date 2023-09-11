const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);
  if (!tour) {
    res.status(404).json({
      status: 'Not found',
      message: 'Invalid ID',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour: 'updated tour',
      },
    });
  }
};

exports.deleteTour = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);
  if (!tour) {
    res.status(404).json({
      status: 'Not found',
      message: 'Invalid ID',
    });
  } else {
    res.status(204).json({
      status: 'success',
      data: {
        tour: null,
      },
    });
  }
};
