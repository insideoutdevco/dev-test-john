const db = require('./db');
const helper = require('../helper');


async function getAll(page = 1, limit = 1, topic, sortBy='inserted', order='ASC') {
  const offset = helper.getOffset(page, limit);

  var totalRows = 0;
  var totalPages = 0;
  const currentPage = page;
  const count = await db.query(
    "SELECT count(*) as totalRows FROM tasks"
  );

  if(count) {
    totalRows = count[0].totalRows;
    totalPages = Math.ceil(totalRows / limit);
  }

  let query = '';
  let params = [];

  query = `SELECT task_id, topic, inserted FROM tasks WHERE topic LIKE ? ORDER BY ${sortBy} ${order} LIMIT ?,?`;
  params = [topic, offset, limit]


  const rows = await db.query(
    query,
    params
  );


  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
    totalRows,
    totalPages,
    currentPage
  }
}

module.exports = {
  getAll
}