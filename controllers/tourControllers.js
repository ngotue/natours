const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log('Tour id is', val);
  const tour = tours.find((el) => el.id === val);
  if (!tour) {
    return res.status(404).json({
      status: 'Not found',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.validateTour = (req, res, next) => {
  if(!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail', 
      message: 'Attribute "name" and "price" is required.'
    })
  }
  next()
}

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
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };
  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        console.error(err.message)
        return res.status(500).json({
          status: 'fail',
          message: 'Internal server error. Please contact Admin.'
        })
      }
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
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updated tour',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
};
