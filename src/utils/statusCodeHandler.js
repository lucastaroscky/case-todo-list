const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_FOUND = { code: 404, message: 'Task not found.' };
const BAD_REQUEST = { code: 400, message: 'All fields must be filled.' };
const CONFLICT = { code: 409, message: 'Task already exists.' };

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
  NO_CONTENT,
};
