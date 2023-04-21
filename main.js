const express = require('express');
const app = express();
const fs = require('fs');
const dataPath = './data.json';

app.get('/:classId/:securityKey', (req, res) => {
  const classId = req.params.classId;
  const securityKey = req.params.securityKey;
  
  if (/^\d{4}$/.test(classId) && securityKey) {
    try {
      const data = fs.readFileSync(dataPath, 'utf8');
      const jsonData = JSON.parse(data);
      const classData = jsonData[classId];
      if (classData && classData.securityKey === securityKey) {
        res.send(classData);
      } else {
        res.status(401).send('Security Key is incorrect. Try again.');
      }
    } catch (error) {
      res.status(500).send('Error loading data: ' + error);
    }
  } else {
    res.status(400).send('Invalid ClassId or Security Key');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});