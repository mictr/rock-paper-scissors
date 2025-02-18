/**
 * returns "rock", "paper", or "scissors"
 */
const getComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * 3);
  const computerChoice = calculateChoice(randomNumber);

  console.assert(
    computerChoice !== null,
    `Computed invalid random number, should be a number from 0 - 2, computed ${randomNumber}`
  );

  return computerChoice;
};

/**
 * Prompts the user to input "rock", "paper", or "scissors". If anything other than those
 * three values is entered, continue prompting the user.
 * @returns "rock", "paper", or "scissors"
 */
const getHumanChoice = () => {
  let humanChoice = null;

  while (
    humanChoice === null ||
    !["rock", "paper", "scissors"].some(
      (choice) => choice === humanChoice.toLowerCase()
    )
  ) {
    humanChoice = prompt("Rock, paper, scissors?");
  }

  return humanChoice;
};

/**
 * Takes an integer between 0 and 2 (inclusive) and returns a string. Numbers
 * outside the bounds will return null.
 *
 * 0 - "rock"
 * 1 - "paper"
 * 2 - "scissors"
 *
 * @param {number} randomNumber - A number between 0 and 2 (inclusive)
 */
const calculateChoice = (randomNumber) => {
  switch (randomNumber) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
    default:
      return null;
  }
};

/**
 * Capitalizes the first character of a word.
 * @param {string} word - A word
 * @returns selection with the first character capitalized
 */
const makeProperCase = (word) =>
  `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;

/**
 * Plays Rock, Paper, Scissors. Game ends when the first player reachs 5 points.
 */
const playGame = () => {
  const setupChoiceButtonById = (buttonId) => {
    const buttonChoice = document.querySelector(`#${buttonId}`);
    buttonChoice.addEventListener("click", (e) => {
      playRound(buttonId, getComputerChoice());
    });

    return buttonChoice;
  };

  const rockButton = setupChoiceButtonById("rock");
  const paperButton = setupChoiceButtonById("paper");
  const scissorsButton = setupChoiceButtonById("scissors");

  const result = document.querySelector("#result");
  const score = document.querySelector("#score");

  const playAgainButton = document.querySelector("#play-again");

  let humanScore = 0;
  let computerScore = 0;

  playAgainButton.addEventListener("click", () => {
    humanScore = 0;
    computerScore = 0;
    result.textContent = "";
    score.textContent = "";
    [rockButton, paperButton, scissorsButton].forEach((button) => {
      button.disabled = false;
    });

    playAgainButton.hidden = true;
  });

  const playRound = (humanSelection, computerSelection) => {
    const winConditions =
      (humanSelection === "rock" && computerSelection === "scissors") ||
      (humanSelection === "paper" && computerSelection === "rock") ||
      (humanSelection === "scissors" && computerSelection === "paper");

    const loseConditions =
      (computerSelection === "rock" && humanSelection === "scissors") ||
      (computerSelection === "paper" && humanSelection === "rock") ||
      (computerSelection === "scissors" && humanSelection === "paper");

    if (winConditions) {
      result.textContent = `You win! ${makeProperCase(
        humanSelection
      )} beats ${makeProperCase(computerSelection)}`;
      humanScore++;
    } else if (loseConditions) {
      result.textContent = `You lose! ${makeProperCase(
        computerSelection
      )} beats ${makeProperCase(humanSelection)}`;
      computerScore++;
    } else {
      result.textContent = `Tie! Both selected ${makeProperCase(
        humanSelection
      )}`;
    }

    if (humanScore < 5 && computerScore < 5) {
      score.textContent = `Current score - Human: ${humanScore}, Computer: ${computerScore}`;
    } else {
      [rockButton, paperButton, scissorsButton].forEach((button) => {
        button.disabled = true;
      });
      score.textContent = `Final Score: Human: ${humanScore}, Computer: ${computerScore}`;
      playAgainButton.hidden = false;
    }
  };

  // while (humanScore !== 5 && computerScore !== 5) {
  //   playRound(getHumanChoice(), getComputerChoice());
  // }
};

playGame();
