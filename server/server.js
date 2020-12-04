const express = require('express');
const Twitter = require('twit');
 
const app = express();
const client = new Twitter({
  consumer_key: '2HwTfB9qBjWH0AN4bMsU28lbD',
  consumer_secret: '6AmYUBsdhhYAJzhf7huAzK3mewivWiImth5csohWBT0LHnW6c7',
  access_token: '1300918797071798272-ewCMT1sdHsI2rKXThi5JWB9bGynRGr',
  access_token_secret: 'YNrdKsktl5qcvwIoioeM1s5ErtJGFGOuEfAXteBunDvOt'
});
 
app.use(require('cors')());
app.use(require('body-parser').json());

app.get('/api/user', (req, res) => {
  client.get('account/verify_credentials').then(user => {
    res.send(user)
  }).catch(error => {
    res.send(error);
  });
});
 
app.listen(3000, () => console.log('Server running'));