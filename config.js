const env = process.env;

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || 'remotemysql.com',
    user: env.DB_USER || 'XLbdsYSG79',
    password: env.DB_PASSWORD || '7gTYB8CnJw',
    database: env.DB_NAME || 'XLbdsYSG79',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;