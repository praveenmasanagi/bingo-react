const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
var randomArr = [];

app.get('/api/drawBall', (req, res) => {
	try {
		var randomnumber;
		if(randomArr.length === 0) {
			randomnumber = Math.floor(Math.random()*100) + 1;
			randomArr.push(randomnumber);
		} else {
			randomnumber = Math.floor(Math.random()*100) + 1;
			while(randomArr.indexOf(randomnumber) > -1) {
				randomnumber = Math.floor(Math.random()*100) + 1;
			}
			randomArr.push(randomnumber);
		}
	} catch (err) {
		res.send(err);
	}
 	res.send({ nextNumber: randomnumber });
});

app.get('/api/checkBingo', (req, res) => {
	try {
		console.log(req.query.data);
		console.log(randomArr);
		var result = arrayContainsAnotherArray(req.query.data, randomArr)
		res.send({ isBingo: result });
	} catch (err) {
		res.send(err);
	}
});

function arrayContainsAnotherArray(ticket, drawnBallsArray) {
  for(var i = 0; i < ticket.length; i++){
    if(drawnBallsArray.indexOf(parseInt(ticket[i])) === -1)
       return false;
  }
  return true;
}

app.listen(port, () => console.log(`Listening on port ${port}`));