let buttons = document.querySelectorAll("div.btn");
let playerScore = 0;
let computerScore = 0;
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let playerSelection = e.target.getAttribute("data-key");
    let computerSelection = getComputerChoice();
    let result = playRound(playerSelection, computerSelection);
    showResult(result);
    checkEnd(playerScore, computerScore);
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
    function playRound(player, computer) {
      // In 3x3 combination output 3 results
      // 0:tie, 1:lose, 2:won
      if (player == computer) {
        return 0;
      } else if (
        (player == "Rock" && computer == "Paper") ||
        (player == "Paper" && computer == "Scissors") ||
        (player == "Scissors" && computer == "Rock")
      ) {
        return 1;
      } else {
        return 2;
      }
    }
    function showResult(result) {
      let head2 = document.querySelector("h2.claim");
      let detail = document.querySelector("p.detail");
      switch (result) {
        case 0:
          head2.innerText = "A Tie!";
          detail.innerText = `${playerSelection} ties with ${computerSelection}.`;
          break;
        case 1:
          head2.innerText = "You Lose!";
          detail.innerText = `${computerSelection} beats ${playerSelection}.`;
          computerScore += 1;
          break;
        case 2:
          head2.innerText = "You Won!";
          detail.innerText = `${playerSelection} beats ${computerSelection}.`;
          playerScore += 1;
          break;
      }
      let player = document.querySelector(".player");
      player.innerText = `Player: ${playerScore}`;
      let computer = document.querySelector(".computer");
      computer.innerText = `Computer: ${computerScore}`;
    }
    function checkEnd(playerScore, computerScore) {
      let final = document.querySelector("h2.final-result");
      if (playerScore == 5) {
        final.innerText = "You rock!";
        end();
      } else if (computerScore == 5) {
        final.innerText = "Computer won :(";
        end();
      }
      function end() {
        let end = document.querySelector("section.end");
        end.classList.add("active");
      }
    }
  });
});
let reset = document.querySelector("div.reset-btn");
reset.addEventListener("click", (e) => {
  // Reset all value
  let end = document.querySelector("section.end");
  end.classList.remove("active");
  let head2 = document.querySelector("h2.claim");
  head2.innerText = "Choose";
  let detail = document.querySelector("p.detail");
  detail.innerText = "Reach 5 points first to win.";
  playerScore = 0;
  computerScore = 0;
  let player = document.querySelector(".player");
  player.innerText = `Player: ${playerScore}`;
  let computer = document.querySelector(".computer");
  computer.innerText = `Computer: ${computerScore}`;
});
