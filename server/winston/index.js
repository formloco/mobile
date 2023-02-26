const {createLogger, format, transports} = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { service: 'formloco' },
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = { logger }
