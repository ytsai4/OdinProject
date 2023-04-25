function getComputerChoice() {
  let num = Math.floor(Math.random() * 100) % 3;
  if (num == 2) {
    return "Rock";
  } else if (num == 1) {
    return "Paper";
  } else {
    return "Scissors";
  }
}
function playRound(playerSelection, computerSelection) {
  // your code here!
  // Make playerSelection case-insensitive
  let player =
    playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase();
  // In 3x3 combination output 3 results
  if (player == computerSelection) {
    return `${player} ties with ${computerSelection}.`;
  } else if (
    (player == "Rock" && computerSelection == "Paper") ||
    (player == "Paper" && computerSelection == "Scissors") ||
    (player == "Scissors" && computerSelection == "Rock")
  ) {
    return `You Lose! ${computerSelection} beats ${player}`;
  } else {
    return `You Won! ${player} beats ${computerSelection}`;
  }
}
function game() {
  let playerScore = 0,
    computerScore = 0;
  for (let i = 0; i < 5; i++) {
    let playerSelection = prompt("Rock, Paper, or Scissors?", "Rock");
    let computerSelection = getComputerChoice();
    let result = playRound(playerSelection, computerSelection);
    if (result.includes("Lose")) {
      playerScore++;
    } else if (result.includes("Won")) {
      computerScore++;
    }
    console.log(result);
    console.log(`Player: ${playerScore} \nComputer: ${computerScore}`);
  }
  if (playerScore > computerScore) {
    return "You Won!";
  } else if (playerScore < computerScore) {
    return "You Lose!";
  } else {
    return "Tie!";
  }
}
console.log(game());
