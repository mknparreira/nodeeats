import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, json, errors } = format;

const isProd = process.env.NODE_ENV === 'production';

const consoleFormat = combine(
  colorize(),
  timestamp(),
  errors({ stack: true }),
  printf(({ timestamp, level, message, stack }) => {
    return stack !== undefined
      ? `[${timestamp}] ${level}: ${message}\n${stack}`
      : `[${timestamp}] ${level}: ${message}`;
  }),
);

const prodFormat = combine(timestamp(), errors({ stack: true }), json());

export const logger = createLogger({
  level: isProd ? 'info' : 'debug',
  format: isProd ? prodFormat : consoleFormat,
  transports: [new transports.Console()],
  exceptionHandlers: [new transports.Console({ handleExceptions: true })],
  exitOnError: false,
});
