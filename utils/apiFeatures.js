class APIFeatures {
    constructor(query, requestQuery) {
      this.query = query;
      this.requestQuery = requestQuery;
    }
  
    filter() {
      const queryObj = { ...this.requestQuery };
      const excludedQuery = ['sort', 'page', 'limit', 'fields'];
      excludedQuery.forEach((el) => delete queryObj[el]);
  
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gt|gte|lt|gte)\b/g, (match) => `$${match}`);
      console.log(this.query.find)
      this.query = this.query.find(JSON.parse(queryStr));
  
      return this;
    }
  
    sort() {
      if (this.requestQuery.sort) {
        const sort = this.requestQuery.sort.split(',').join(' ');
        this.query = this.query.sort(sort);
      } else this.query = this.query.sort('-createdAt');
  
      return this;
    }
  
    limitFields() {
      if (this.requestQuery.fields) {
        const fields = this.requestQuery.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else this.query = this.query.select('-__v');
  
      return this
    }
  
    paginate() {
      const limit = +this.requestQuery.limit || 10;
      const page = +this.requestQuery.page || 1;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
  
      return this
    }
  }

  module.exports = APIFeatures