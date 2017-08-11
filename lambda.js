const handler = require('./index.js').handler;

const fakeEvent = {};
const fakeContext = null;

const fakeCallback = (dummy, response) => {
  console.log(response);
};

handler(fakeEvent, fakeContext, fakeCallback);