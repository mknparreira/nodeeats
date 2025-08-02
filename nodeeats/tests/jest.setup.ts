// tests/jest.setup.ts
/* global jest */
jest.spyOn(console, 'error').mockImplementation(message => {
  if (!String(message).includes('not found')) {
    console.warn('Unhandled error:', message);
  }
});
