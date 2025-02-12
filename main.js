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
  let humanScore = 0;
  let computerScore = 0;

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
      console.log(
        `You win! ${makeProperCase(humanSelection)} beats ${makeProperCase(
          computerSelection
        )}`
      );
      humanScore++;
    } else if (loseConditions) {
      console.log(
        `You lose! ${makeProperCase(computerSelection)} beats ${makeProperCase(
          humanSelection
        )}`
      );
      computerScore++;
    } else {
      console.log(`Tie! Both selected ${makeProperCase(humanSelection)}`);
    }
  };

  while (humanScore !== 5 && computerScore !== 5) {
    playRound(getHumanChoice(), getComputerChoice());
  }

  console.log(`Final Score: Human: ${humanScore}, Computer: ${computerScore}`);
};

playGame();
