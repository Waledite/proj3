"use strict"; 

var puzzlePiece; 
var winnerCounter;
var timeKeeper;
var spaceY;
var spaceX;


 window.onload = function ()

{

	var puzzleArea = document.getElementById('board');
	puzzlePiece = puzzleArea.getElementsByTagName('div'); 

	for (var i=0; i<puzzlePiece.length; i++) 

	{

		puzzlePiece[i].className = 'puzzlepiece'; 

		puzzlePiece[i].style.left = (i%4*100)+'px'; 

		puzzlePiece[i].style.top = (parseInt(i/4)*100) + 'px'; 

		puzzlePiece[i].style.backgroundPosition= '-' + puzzlePiece[i].style.left + ' ' + '-' + puzzlePiece[i].style.top; 
		


		puzzlePiece[i].onmouseover = function() 

		{
			if (checkMove(parseInt(this.innerHTML))) 

			{

				this.style.border = "3px solid red"; 

				this.style.color = "red"; 

                this.style.backgroundImage="url('luigi.jpeg')"; 
               
			}

		};


		puzzlePiece[i].onmouseout = function() 

		{

			this.style.border = "2px solid black"; 

			this.style.color = "#000000"; 

			this.style.textDecoration = "none"; 

		};



		puzzlePiece[i].onclick = function() 

		{

			if (checkMove(parseInt(this.innerHTML)))

			{
				changePlaces(this.innerHTML-1); 


				if (finish()) 

				{

					Won(); 

				}

				return;

			}

		};

	}


	var shuffle = document.getElementById('shuffleBtn'); 

	spaceX = '300px'; 
	spaceY = '300px';

	shuffle.onclick = function() 

	{

		for (var i=0; i<300; i++) 

		{

			var rand = parseInt(Math.random()* 100) %4; 

			if (rand == 0)

			{

				var temp = moveUp(spaceX, spaceY); 

				if ( temp != -1)

				{

					swap(temp);

				}

			}

			if (rand == 1)

			{

				var temp = moveDown(spaceX, spaceY);

				if ( temp != -1) 

				{

					changePlaces(temp);

				}

			}



			if (rand == 2)

			{

				var temp = moveLeft(spaceX, spaceY);

				if ( temp != -1)

				{

					changePlaces(temp);

				}

			}


			if (rand == 3)

			{

				var temp = moveRight(spaceX, spaceY);

				if (temp != -1)

				{

					changePlaces(temp);

				}

			}

		}

	};

};



function checkMove(position) 

{

	if (moveLeft(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (moveDown(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (moveUp(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (moveRight(spaceX, spaceY) == (position-1))

	{

		return true;

	}

}


function DisplayWinner() 

{

	winnerCounter --; 

	if (winnerCounter== 0) 

	{

		var body = document.getElementsByTagName('body'); 

		body[0].style.backgroundImage= "none"; 

		alert('You won!'); 

		return;

	}

	else  (winnerCounter % 2) 

	{

		var body = document.getElementsByTagName('body'); 

	    body[0].style.backgroundImage= "url('luigi_mansion.jpg')";
	 
		
	}
timeKeeper= setTimeout(DisplayWinner, 200);
}



function Won() 

{

	var body = document.getElementsByTagName('body');

	winnerCounter = 10; 
	
	body[0].style.backgroundImage= "url('luigi_mansion.jpg')";


	timeKeeper= setTimeout(DisplayWinner, 200);

}


function finish() 

{

	var gameEnded = true;

	for (var i = 0; i < puzzlePiece.length; i++) 
	{

		var top = parseInt(puzzlePiece[i].style.top);

		var left = parseInt(puzzlePiece[i].style.left);


		if (left != (i%4*100) || top != parseInt(i/4)*100) 

		{

			gameEnded = false;

			break;

		}

	}

	return gameEnded;

}



function moveLeft(x, y) 

{

	var cordX = parseInt(x);

	var cordY = parseInt(y);



	if (cordX > 0)

	{

		for (var i = 0; i < puzzlePiece.length; i++) 

		{

			if (parseInt(puzzlePiece[i].style.left) + 100 == cordX && parseInt(puzzlePiece[i].style.top) == cordY)

			{

				return i;

			} 

		}

	}

	else 

	{

		return -1;

	}

}



function moveRight (x, y) 
{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordX < 300)

	{

		for (var i =0; i<puzzlePiece.length; i++){

			if (parseInt(puzzlePiece[i].style.left) - 100 == cordX && parseInt(puzzlePiece[i].style.top) == cordY) 

			{

				return i;

			}

		}

	}

	else

	{

		return -1;

	} 

}



function moveUp(x, y) 
{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordY > 0)

	{

		for (var i=0; i<puzzlePiece.length; i++)

		{

			if (parseInt(puzzlePiece[i].style.top) + 100 == cordY && parseInt(puzzlePiece[i].style.left) == cordX) 

			{

				return i;

			}

		} 

	}

	else 

	{

		return -1;

	}

}



function moveDown (x, y) 

{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordY < 300)

	{

		for (var i=0; i<puzzlePiece.length; i++)

		{

			if (parseInt(puzzlePiece[i].style.top) - 100 == cordY && parseInt(puzzlePiece[i].style.left) == cordX) 

			{

				return i;

			}

		}

	}

	else

	{

		return -1;

	} 

}



function changePlaces (position) 
{

	var temp = puzzlePiece[position].style.top;

	puzzlePiece[position].style.top = spaceY;

	spaceY = temp;

	temp = puzzlePiece[position].style.left;

	puzzlePiece[position].style.left = spaceX;

	spaceX = temp;

}


