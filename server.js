const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
var randomArr = [];
var firstArray = [], secondArray = [], thirdArray = [], fourthArray =[];

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

app.get('/api/getTickets', (req, res) => {
	firstArray = [], secondArray = [], thirdArray = [], fourthArray =[];
	try {
	    while(firstArray.length < 25){
	        var randomnumber = Math.floor(Math.random()*100) + 1;
	        if(firstArray.indexOf(randomnumber) > -1) continue;
	        firstArray[firstArray.length] = randomnumber;
	    }
	    while(secondArray.length < 25){
	        var randomnumber = Math.floor(Math.random()*100) + 1;
	        if(secondArray.indexOf(randomnumber) > -1) continue;
	        secondArray[secondArray.length] = randomnumber;
	    }
	    while(thirdArray.length < 25){
	        var randomnumber = Math.floor(Math.random()*100) + 1;
	        if(thirdArray.indexOf(randomnumber) > -1) continue;
	        thirdArray[thirdArray.length] = randomnumber;
	    }
		while(fourthArray.length < 25){
	        var randomnumber = Math.floor(Math.random()*100) + 1;
	        if(fourthArray.indexOf(randomnumber) > -1) continue;
	        fourthArray[fourthArray.length] = randomnumber;
	    }
	} catch (err) {
		res.send(err);
	}
 	res.send({
 		"firstTicket": firstArray,
 		"secondTicket" : secondArray,
 		"thirdTicket" : thirdArray,
 		"fourthTicket" : fourthArray
 	});
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