const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path
//app.use(express.static(path.join(__dirname, "../jewels-store/dist/jewels-store")));

app.use(bodyParser.json());

const publicVapidKey="BC8eLnIUgzJYZtXUh7uILVIn9poPE8Rd4P32vDPvqiQg20guaze2EbVe4Qqb014s3KT0-mvDPG1YPCNJTBYqSV4";
const privateVapidKey="rlwc3K5cfPYXmLHz25KEFxwYfkRD0cNVichSbiyexVo";

webpush.setVapidDetails('mailto:tester@test.com', publicVapidKey, privateVapidKey);

// Ssubscribe Router
app.post('/subscribe', (req, res)=>{
  //  Get push subscription object
  const   subscription = req.body;

  // Ssend 201- resource created
    res.status(201).json({});

    // Create payload
    const payload=JSON.stringify({title: 'Push test'});

    // Pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err=>console.error(err));
});

const port = 5000;

app.listen(port, ()=>console.log(`Server started on port ${port}`));
