(() => {
	const newGame = document.getElementById('newGame'),
		gameGrid = document.getElementById('gameGrid'),
		tossContainer = document.getElementById('tossContainer'),
		tossResultContainer = document.getElementById('tossResult'),
		toss = document.getElementById('toss'),
		tossWinner = document.getElementById('tossWinner'),
		winnerSymbol = document.getElementById('winnerSymbol'),
		turnIndicator = document.getElementById('turnIndicator'),
		playerTurn = document.getElementById('playerTurn'),
		winIndicator = document.getElementById('winIndicator'),
		winner = document.getElementById('winner'),
		gridSize = 3;

	let symbols = {computer: 'o', user: 'x'}, emptyCells, totalMoves = 0,
		playerClasses = {computer: 'zero', user: 'cross'}, gridMap;

	const userClickHandler = (event) => {
		event.target.removeEventListener('click', userClickHandler);
		gridMap[event.target.parentNode.rowIndex][event.target.cellIndex] = symbols.user;
		console.log(gridMap);
		event.target.className = playerClasses.user;
		event.target.innerHTML = symbols.user;

		emptyCells = document.getElementsByClassName('empty-cell');
		Array.from(emptyCells).forEach(function(emptyCell) {
			emptyCell.className = 'empty-cell';
			emptyCell.removeEventListener('click', userClickHandler);
		});
		totalMoves++;
		playerTurn.innerHTML = 'Computer\'s';
		turnIndicator.className = 'turn-indicator ' + playerClasses.computer;
		newGame.disabled = true;
		setTimeout(computerPlayHandler, 1000);
	}

	const checkRow = (rIndex) => {
		let rowCells = gameGrid.getElementsByTagName('tr')[rIndex].getElementsByTagName('td');
		let emptyCount = 0, userCount = 0, emptyIndex;

		Array.from(rowCells).forEach(function(cell) {
		    if(cell.className.includes('empty-cell')) {
		    	emptyCount++;
		    	emptyIndex = cell.cellIndex;
		    }
		    if(cell.className.includes(playerClasses.user)) {
		    	userCount++;
		    }
		});

		if(userCount === 2 && emptyCount === 1) {
			return { isTrue: 1, emptyIndex };
		}
		else {
			return { isTrue: 0, emptyIndex };
		}
	}

	const checkCol = (cIndex) => {
		let cellRows = gameGrid.getElementsByTagName('tr');
		let emptyCount = 0, userCount = 0, emptyIndex;

		Array.from(cellRows).forEach(function(cellRow) {
			let cell = cellRow.getElementsByTagName('td')[cIndex];
			if(cell.className.includes('empty-cell')) {
		    	emptyCount++;
		    	emptyIndex = cellRow.rowIndex;
		    }
		    if(cell.className.includes(playerClasses.user)) {
		    	userCount++;
		    }
		});

		if(userCount === 2 && emptyCount === 1) {
			return { isTrue: 1, emptyIndex };
		}
		else {
			return { isTrue: 0, emptyIndex };
		}
	}

	const checkLeftDiagonal = () => {
		let cellRows = gameGrid.getElementsByTagName('tr');
		let emptyCount = 0, userCount = 0, emptyIndex;

		Array.from(cellRows).forEach(function(cellRow, index) {
			let cell = cellRow.getElementsByTagName('td')[index];
			if(cell.className.includes('empty-cell')) {
		    	emptyCount++;
		    	emptyIndex = cellRow.rowIndex;
		    }
		    if(cell.className.includes(playerClasses.user)) {
		    	userCount++;
		    }
		});

		if(userCount === 2 && emptyCount === 1) {
			return { isTrue: 1, emptyIndex };
		}
		else {
			return { isTrue: 0, emptyIndex };
		}
	}

	const checkRightDiagonal = () => {
		let cellRows = gameGrid.getElementsByTagName('tr');
		let emptyCount = 0, userCount = 0, emptyIndex;

		Array.from(cellRows).forEach(function(cellRow, index) {
			let cell = cellRow.getElementsByTagName('td')[gridSize - index - 1];
			if(cell.className.includes('empty-cell')) {
		    	emptyCount++;
		    	emptyIndex = cellRow.rowIndex;
		    }
		    if(cell.className.includes(playerClasses.user)) {
		    	userCount++;
		    }
		});

		if(userCount === 2 && emptyCount === 1) {
			return { isTrue: 1, emptyIndex };
		}
		else {
			return { isTrue: 0, emptyIndex };
		}
	}

	const checkAttackRow = (rIndex) => {
		let rowCells = gameGrid.getElementsByTagName('tr')[rIndex].getElementsByTagName('td');
		let emptyCount = 0, computerCount = 0, emptyIndex = new Array(3).fill(0), emptyCellToFill;

		Array.from(rowCells).forEach(function(cell) {
		    if(cell.className.includes('empty-cell')) {
		    	emptyCount++;
		    	emptyIndex[cell.cellIndex] = 1;
		    }
		    if(cell.className.includes(playerClasses.computer)) {
		    	computerCount++;
		    }
		});

		if(computerCount === 1 && emptyCount === 2) {
			if(emptyIndex[0] === 1 || emptyIndex[gridSize - 1] === 1) {
				emptyCellToFill = emptyIndex[0] === 1 ? 0 : (gridSize - 1);
			}
			return { isTrue: 1, emptyCellToFill };
		}
		else if(emptyCount === 1) {
			emptyCellToFill = emptyIndex.indexOf(1);
			return { isTrue: 1, emptyCellToFill };
		}
	}

	const checkAttackCol = (cIndex) => {
		let cellRows = gameGrid.getElementsByTagName('tr');
		let emptyCount = 0, computerCount = 0, emptyIndex = new Array(3).fill(0), emptyCellToFill;

		Array.from(cellRows).forEach(function(cellRow) {
			let cell = cellRow.getElementsByTagName('td')[cIndex];
		    if(cell.className.includes('empty-cell')) {
		    	emptyCount++;
		    	emptyIndex[cellRow.rowIndex] = 1;
		    }
		    if(cell.className.includes(playerClasses.computer)) {
		    	computerCount++;
		    }
		});

		if(computerCount === 1 && emptyCount === 2) {
			if(emptyIndex[0] === 1 || emptyIndex[gridSize - 1] === 1) {
				emptyCellToFill = emptyIndex[0] === 1 ? 0 : (gridSize - 1);
			}
			return { isTrue: 1, emptyCellToFill };
		}
		else if(emptyCount === 1) {
			emptyCellToFill = emptyIndex.indexOf(1);
			return { isTrue: 1, emptyCellToFill };
		}
	}

	const checkAttackLeftDiagonal = () => {
		let cellRows = gameGrid.getElementsByTagName('tr');
		let emptyCount = 0, computerCount = 0, emptyIndex = new Array(3).fill(0), emptyCellToFill;

		Array.from(cellRows).forEach(function(cellRow, index) {
			let cell = cellRow.getElementsByTagName('td')[index];
			if(cell.className.includes('empty-cell')) {
		    	emptyCount++;
		    	emptyIndex[cellRow.rowIndex] = 1;
		    }
		    if(cell.className.includes(playerClasses.user)) {
		    	computerCount++;
		    }
		});

		if(computerCount === 1 && emptyCount === 2) {
			if(emptyIndex[0] === 1 || emptyIndex[gridSize - 1] === 1) {
				emptyCellToFill = emptyIndex[0] === 1 ? 0 : (gridSize - 1);
			}
			return { isTrue: 1, emptyCellToFill };
		}
		else if(emptyCount === 1) {
			emptyCellToFill = emptyIndex.indexOf(1);
			return { isTrue: 1, emptyCellToFill };
		}
	}

	const checkAttackRightDiagonal = () => {
		let cellRows = gameGrid.getElementsByTagName('tr');
		let emptyCount = 0, computerCount = 0, emptyIndex = new Array(3).fill(0), emptyCellToFill;

		Array.from(cellRows).forEach(function(cellRow, index) {
			let cell = cellRow.getElementsByTagName('td')[gridSize - index - 1];
			if(cell.className.includes('empty-cell')) {
		    	emptyCount++;
		    	emptyIndex[cellRow.rowIndex] = 1;
		    }
		    if(cell.className.includes(playerClasses.user)) {
		    	userCount++;
		    }
		});

		if(computerCount === 1 && emptyCount === 2) {
			if(emptyIndex[0] === 1 || emptyIndex[gridSize - 1] === 1) {
				emptyCellToFill = emptyIndex[0] === 1 ? 0 : (gridSize - 1);
			}
			return { isTrue: 1, emptyCellToFill };
		}
		else if(emptyCount === 1) {
			emptyCellToFill = emptyIndex.indexOf(1);
			return { isTrue: 1, emptyCellToFill };
		}
	}

	const computerPlayHandler = () => {
		if(totalMoves === 0) {
			let initialMoves = [
				[0, 0],
				[0, gridSize - 1],
				[parseInt(gridSize / 2), parseInt(gridSize / 2)],
				[gridSize - 1, 0],
				[gridSize - 1, gridSize - 1]
			];
			let startPos = Math.floor(Math.random() * initialMoves.length) + 0;
			let startRow = gameGrid.getElementsByTagName('tr')[initialMoves[startPos][0]];
			let startCol = startRow.getElementsByTagName('td')[initialMoves[startPos][1]];
			gridMap[startCol.parentNode.rowIndex][startCol.cellIndex] = symbols.computer;
			console.log(gridMap);
			startCol.className = playerClasses.computer;
			startCol.innerHTML = symbols.computer;
		}
		else if(totalMoves === 1) {
			let userFirstMove = gameGrid.getElementsByClassName(playerClasses.user)[0];
			let userFirstMoveRow = userFirstMove.parentNode.rowIndex;
			let userFirstMoveCol = userFirstMove.cellIndex;
			let centerPos = parseInt(gridSize / 2);

			if(userFirstMoveRow === centerPos && userFirstMoveCol === centerPos) {
				let initialMoves = [
					[0, 0],
					[0, gridSize - 1],
					[gridSize - 1, 0],
					[gridSize - 1, gridSize - 1]
				];
				let startPos = Math.floor(Math.random() * initialMoves.length) + 0;
				let startRow = gameGrid.getElementsByTagName('tr')[initialMoves[startPos][0]];
				let startCol = startRow.getElementsByTagName('td')[initialMoves[startPos][1]];
				gridMap[startCol.parentNode.rowIndex][startCol.cellIndex] = symbols.computer;
				console.log(gridMap);
				startCol.className = playerClasses.computer;
				startCol.innerHTML = symbols.computer;
			}
			else {
				let currentRow = gameGrid.getElementsByTagName('tr')[centerPos];
				let currentCol = currentRow.getElementsByTagName('td')[centerPos];
				currentCol.className = playerClasses.computer;
				currentCol.innerHTML = symbols.computer;
				gridMap[centerPos][centerPos] = symbols.computer;
				console.log(gridMap);
			}
		}
		else {
			let hCheck = new Array(gridSize).fill(1), vCheck = new Array(gridSize).fill(1),
				dCheck = new Array(2).fill(1);
			let userSelector = gameGrid.getElementsByClassName(playerClasses.user);
			let playWinMove = 1;

			Array.from(userSelector).forEach(function(user) {
				let userRow = user.parentNode.rowIndex, userCol = user.cellIndex;
				let centerPos =  parseInt(gridSize / 2), cellToFill;
				let rowCheck = checkRow(userRow), colCheck = checkCol(userCol),
					leftDiagCheck = checkLeftDiagonal(), rightDiagCheck = checkRightDiagonal();

				if((userRow === 0 && userCol === 0) || (userRow === gridSize - 1 && userCol === gridSize - 1)) {
					if(rowCheck.isTrue) {
						cellToFill = gameGrid.getElementsByTagName('tr')[userRow].getElementsByTagName('td')[rowCheck.emptyIndex];
					}
					else if(colCheck.isTrue) {
						cellToFill = gameGrid.getElementsByTagName('tr')[colCheck.emptyIndex].getElementsByTagName('td')[userCol];
					}
					else if(leftDiagCheck.isTrue) {
						cellToFill = gameGrid.getElementsByTagName('tr')[leftDiagCheck.emptyIndex].getElementsByTagName('td')[leftDiagCheck.emptyIndex];
					}
				}
				else if((userRow === 0 && userCol === gridSize - 1) || (userRow === gridSize - 1 && userCol === 0)) {
					if(rowCheck.isTrue) {
						cellToFill = gameGrid.getElementsByTagName('tr')[userRow].getElementsByTagName('td')[rowCheck.emptyIndex];
					}
					else if(colCheck.isTrue) {
						cellToFill = gameGrid.getElementsByTagName('tr')[colCheck.emptyIndex].getElementsByTagName('td')[userCol];
					}
					else if(rightDiagCheck.isTrue) {
						cellToFill = gameGrid.getElementsByTagName('tr')[rightDiagCheck.emptyIndex].getElementsByTagName('td')[gridSize - rightDiagCheck.emptyIndex - 1];
					}
				}
				else if((userRow > 0 && userCol > 0) || (userRow < gridSize - 1 && userCol < gridSize - 1)) {
					if(rowCheck.isTrue) {
						cellToFill = gameGrid.getElementsByTagName('tr')[userRow].getElementsByTagName('td')[rowCheck.emptyIndex];
					}
					else if(colCheck.isTrue) {
						cellToFill = gameGrid.getElementsByTagName('tr')[colCheck.emptyIndex].getElementsByTagName('td')[userCol];
					}
				}

				if(rowCheck.isTrue || colCheck.isTrue || leftDiagCheck.isTrue || rightDiagCheck.isTrue) {
					cellToFill.className = playerClasses.computer;
					cellToFill.innerHTML = symbols.computer;
					playWinMove = 0;
				}
			});

			if(playWinMove) {
				let computerSelector = gameGrid.getElementsByClassName(playerClasses.computer);
				
				Array.from(computerSelector).forEach(function(computer) {
					let computerRow = computer.parentNode.rowIndex, computerCol = computer.cellIndex;
					let centerPos =  parseInt(gridSize / 2);
					let rowCheck = checkAttackRow(computerRow), colCheck = checkAttackCol(computerCol),
					leftDiagCheck = checkAttackLeftDiagonal(), rightDiagCheck = checkRightDiagonal();

					if((computerRow === 0 && computerCol === 0) || (computerRow === gridSize - 1 && computerCol === gridSize - 1)) {
						if(leftDiagCheck.isTrue) {
							cellToFill = gameGrid.getElementsByTagName('tr')[leftDiagCheck.emptyCellToFill].getElementsByTagName('td')[leftDiagCheck.emptyCellToFill];
						}
						else if(rowCheck.isTrue) {
							cellToFill = gameGrid.getElementsByTagName('tr')[computerRow].getElementsByTagName('td')[rowCheck.emptyCellToFill];
						}
						else if(colCheck.isTrue) {
							cellToFill = gameGrid.getElementsByTagName('tr')[colCheck.emptyCellToFill].getElementsByTagName('td')[userCol];
						}
					}
					else if((computerRow === 0 && computerCol === gridSize - 1) || (computerRow === gridSize - 1 && computerCol === 0)) {
						if(rowCheck.isTrue) {
							cellToFill = gameGrid.getElementsByTagName('tr')[computerRow].getElementsByTagName('td')[rowCheck.emptyCellToFill];
						}
						else if(colCheck.isTrue) {
							cellToFill = gameGrid.getElementsByTagName('tr')[colCheck.emptyCellToFill].getElementsByTagName('td')[userCol];
						}
					}
					else if((computerRow > 0 && computerCol > 0) || (computerRow < gridSize - 1 && computerCol < gridSize - 1)) {
						if(rowCheck.isTrue) {
							cellToFill = gameGrid.getElementsByTagName('tr')[computerRow].getElementsByTagName('td')[rowCheck.emptyCellToFill];
						}
						else if(colCheck.isTrue) {
							cellToFill = gameGrid.getElementsByTagName('tr')[colCheck.emptyCellToFill].getElementsByTagName('td')[userCol];
						}
					}

					if(rowCheck.isTrue || colCheck.isTrue || leftDiagCheck.isTrue) {
						cellToFill.className = playerClasses.computer;
						cellToFill.innerHTML = symbols.computer;
					}
				});
			}
		}

		emptyCells = document.getElementsByClassName('empty-cell');
		Array.from(emptyCells).forEach(function(emptyCell) {
			emptyCell.className += ' pointer';
			emptyCell.addEventListener('click', userClickHandler);
		});
		totalMoves++;
		playerTurn.innerHTML = 'Your';
		turnIndicator.className = 'turn-indicator ' + playerClasses.user;
		newGame.disabled = false;
	}

	const startGame = (tossResult, tossWinnerSymbol) => {
		emptyCells = document.getElementsByClassName('empty-cell');
		turnIndicator.style.display = 'block';
		if(tossResult) {
			Array.from(emptyCells).forEach(function(emptyCell) {
				emptyCell.className += ' pointer';
				emptyCell.addEventListener('click', userClickHandler);
			});
			playerTurn.innerHTML = 'Your';
			turnIndicator.className = 'turn-indicator ' + playerClasses.user;
		}
		else {
			playerTurn.innerHTML = 'Computer\'s';
			turnIndicator.className = 'turn-indicator ' + playerClasses.computer;
			newGame.disabled = true;
			setTimeout(computerPlayHandler, 1000);
		}
	}

	const tossHandler = () => {
		// tossResult == 0 => winner = computer, else winner = player
		let tossResult = Math.floor(Math.random() * 2) + 0;
		// tossWinner.innerHTML = tossResult === 0 ? 'Computer' : 'You';

		// tossWinnerSymbol == 0 => winnerSymbol = o, else winnerSymbol = x
		let tossWinnerSymbol = Math.floor(Math.random() * 2) + 0;
		// winnerSymbol.innerHTML = tossWinnerSymbol === 0 ? 'o' : 'x';

		if(tossResult) {
			tossWinner.innerHTML = 'You';
			symbols.user = tossWinnerSymbol === 0 ? 'o' : 'x';
			symbols.computer = symbols.user === 'o' ? 'x' : 'o';

			playerClasses.user = tossWinnerSymbol === 0 ? 'zero' : 'cross';
			playerClasses.computer = playerClasses.user === 'zero' ? 'cross' : 'zero';
		}
		else {
			tossWinner.innerHTML = 'Computer';
			symbols.computer = tossWinnerSymbol === 0 ? 'o' : 'x';
			symbols.user = symbols.computer === 'o' ? 'x' : 'o';

			playerClasses.computer = tossWinnerSymbol === 0 ? 'zero' : 'cross';
			playerClasses.user = playerClasses.computer === 'zero' ? 'cross' : 'zero';
		}
		winnerSymbol.innerHTML = tossWinnerSymbol === 0 ? 'o' : 'x';

		tossResultContainer.style.display = 'block';
		toss.disabled = true;
		toss.removeEventListener('click', tossHandler);

		startGame(tossResult, tossWinnerSymbol);
	}

	const newGameHandler = () => {
		let newTbody = document.createElement('tbody'),
			oldTbody = document.getElementsByTagName('tbody');
        gameGrid.replaceChild(newTbody, oldTbody[0]);

        gridMap = [
			['', '', ''],
			['', '', ''],
			['', '', '']
		];

        tossContainer.style.display = 'block';
        tossResultContainer.style.display = 'none';
        toss.disabled = false;
        toss.addEventListener('click', tossHandler);
        turnIndicator.style.display = 'none';

        for(let i = 0; i < gridSize; i++) {
        	let row = gameGrid.insertRow(i);
        	for(let j = 0; j < gridSize; j++) {
        		let cell = row.insertCell(j);
        		cell.className = 'empty-cell';
        	}
        }
        totalMoves = 0;
	}

	newGame.addEventListener('click', newGameHandler);
})();