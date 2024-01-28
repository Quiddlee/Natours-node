import { FilterQuery, Query } from 'mongoose';

class ApiFeatures<TQuery> {
  private excludedFields = ['page', 'sort', 'limit', 'fields'];

  private queryString: qs.ParsedQs;

  query: Query<TQuery[], TQuery>;

  constructor(queryObj: Query<TQuery[], TQuery>, queryString: qs.ParsedQs) {
    this.query = queryObj;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    this.excludedFields.forEach(
      (field) => delete queryObj[field as keyof typeof queryObj],
    );

    const formattedQueryObj = JSON.parse(
      JSON.stringify(queryObj).replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`,
      ),
    ) as FilterQuery<TQuery>;

    this.query = this.query.find(formattedQueryObj);
    return this;
  }

  sort() {
    if (
      'sort' in this.queryString &&
      typeof this.queryString.sort === 'string'
    ) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (
      'fields' in this.queryString &&
      typeof this.queryString.fields === 'string'
    ) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = Number(this.queryString?.page || 1);
    const limit = Number(this.queryString.limit) || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default ApiFeatures;
