#!/usr/bin/env node
var google = require('google');
var readline = require('readline');
var open = require('open');
var readability = require('node-readability');

google.resultsPerPage = 5;

var sys = require('sys');
var asciimo = require('asciimo').Figlet;
var colors = require('colors');

var font = 'Colossal';
var welcome = "Google";


var selectArray = [];

var rl = readline.createInterface({
	input: process.stdin,
        output: process.stdout
});

asciimo.write(welcome,font,function(art){
    
    sys.puts(art.rainbow);

	rl.question("What are you searching for?\n".yellow, function(answer) {
		 //Search google
		selectArray = [];
		console.log("Searching Google....".rainbow);		
		doSearch(answer);

	});
	rl.close
});

function doSearch(searchString)
{

	google(searchString, function(err, next, links){
		if (err) console.error(err);

		for (var i = 0; i < links.length; ++i) {
		if(i==0)
		{
			selectArray=[];
		}
			console.log((i).toString().yellow+")"+links[i].title.blue + ' - ');
			if(links[i].link != null) 
				console.log(links[i].link.toString().yellow);
			
			if(links[i].description != null)
				console.log(links[i].description.toString() + "\n");

			selectArray.push(links[i].link);
		};

		rl.question('Number to select link, n for next page, Any other text to search google\n>', function(answer2) {
			if(answer2 == "n" || answer2 == "N")
			{
				if(next) next();
			}
			else if(!isNaN(+answer2))
			{
				open(selectArray[answer2]);

				/*readability.read(selectArray[answer2], function(err, article) {
					console.log(article.getContent());
				});*/
			}
			else
			{
				doSearch(answer2);
				console.log("Searching Google....".green);
			}
			rl.close();
		});

	
	});
	

}


