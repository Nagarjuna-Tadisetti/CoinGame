var timeleft;
var timeId ;
var roundnoId ;
var questionId ;
var inter ;
var roundnocounter = 1;
var currQuestion ;
var isTimerRunning = false;

var coinWeights = coinWeights = {
		coin1:1,
		coin2:5,
		coin3:10,
		coin4:25
	};
var coinImages = {
		image1:"onecent.jpg",
		image2:"fivecent.jpg",
		image3:"tencent.jpg",
		image4:"twentyfivecent.jpg"
	};
var answersGrid = {option1:{},
					option2:{},
					option3:{},
					option4:{},
					option5:{},
					option6:{}};

function loadDefaults()
{
	var result = "";
	timeId = document.getElementById('time');
	if(timeId == null)
	{
		result += "timeId=null";
	}
	else
	{
		result += "timeId=loaded";
	}

	roundnoId = document.getElementById('round_no');
	if(roundnoId == null)
	{
		result += "roundId=null";
	}
	else
	{
		result += "roundId=loaded";
	}
	//alert(result);
	return result;
}

function getRandomNumber()
{
	roundno();
	questionGenerator();
	if(timeId==null || timeId==undefined)
	{
		timeId = document.getElementById('time');
		timeleft = 20;
		inter = setInterval(timer, 999);
	}
	if(!isTimerRunning)
	{
		timeleft = 20;
		inter = setInterval(timer, 999);
		isTimerRunning = true;
	}	
}

function timer()
{
	timeleft = timeId.innerText;

	timeleft --;

		timeId.innerText = timeleft;
	if(timeleft <= 0 )
	{
		isTimerRunning = false;
		clearInterval(inter);
	}
}

function roundno()
{
	if(roundnoId==null || roundnoId==undefined)
	{
		roundnoId = document.getElementById('round_no');
	}
	roundnoId.innerText = roundnocounter;
	//alert(roundnocounter);
	roundnocounter++;
}

function questionGenerator()
{
	//console.log("phase 1");
	var optionNumber = Math.floor(Math.random() * 6) + 1;
	var displayQuestion = 0;
	//answersGrid["answer"+optionNumber] = new Object();
	var total = 0;
	var i;
	//console.log("phase 2");
	var res = ""+optionNumber+"\n";
	for(i=1; i<7; i++)
	{
		var curTotal = 0;
		var fi = Math.floor(Math.random() * 4) + 1;
		var si = Math.floor(Math.random() * 4) + 1;
		var ti = Math.floor(Math.random() * 4) + 1;

		curTotal=coinWeights["coin"+fi]+coinWeights["coin"+si]+coinWeights["coin"+ti];

		if(total==curTotal)
		{
			if(ti==4)
			{
				ti-=1;
			}
			else
			{
				ti+=1;
			}
			curTotal = coinWeights["coin"+fi]+coinWeights["coin"+si]+coinWeights["coin"+ti];
		}

		if(total==0)
		{
			total=curTotal;
		}

		if(i==optionNumber)
		{
			displayQuestion = curTotal;
		}

		//alert(answersGrid["option"+i]+", "+coinImages["image"+fi]);

		answersGrid["option"+i]["img1"]=coinImages["image"+fi];
		answersGrid["option"+i]["img2"]=coinImages["image"+si];
		answersGrid["option"+i]["img3"]=coinImages["image"+ti];
		answersGrid["option"+i]["total"]=curTotal;
		res = res + coinImages["image"+fi]+" - "+coinImages["image"+si]+" - "+coinImages["image"+ti]+" - "+curTotal+"\n";
	}
	res=res+displayQuestion;
	//console.log("phase 3");
	//alert(answersGrid["option1"]["img1"]+" - "+answersGrid["option1"]["img2"]+" - "+answersGrid["option1"]["img3"]+" - "+answersGrid["option1"]["total"]);
	//alert(res);
	var j = 1;
	for(i=1;i<7;i++)
	{
		for(var k=1; k<4; k++)
		{
			document.getElementById("image_"+j).src=answersGrid["option"+i]["img"+k];
			++j;
		}
		//++j;
		//document.getElementById("image_"+j).src=answersGrid["option"+i]["img"+i];
	}
	//answersGrid["answer"+optionNumbe].image1=*/
	currQuestion = Math.floor(Math.random() * 100);
	//alert(currQuestion);
}

