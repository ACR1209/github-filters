import readline from "readline/promises";
import { select, Separator } from "@inquirer/prompts";

export async function waitForInput(
  promptMessage = "Press ENTER to continue...",
) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  await rl.question(promptMessage);
  rl.close();
}

export const mainInquirerSelect = (
  ORG: string,
  MIN_STARS: number,
  LAST_UPDATED_COUNT: number,
  HEAD_COUNT: number,
  PREFIX: string,
) =>
  select({
    message: "Select an action to do",
    choices: [
      {
        name: `Get repositories with more than ${MIN_STARS} stars`,
        value: "moreThanStars",
        description: `Get repositories with more than ${MIN_STARS} stars from ${ORG}`,
      },
      {
        name: `Last ${LAST_UPDATED_COUNT} repositories updated`,
        value: "lastFiveUpdated",
        description: `Get the last ${LAST_UPDATED_COUNT}  repositories updated from ${ORG}`,
      },
      {
        name: "Sum of all repositories",
        value: "sumAllRepositories",
        description: `Get the sum of all the stars of repositories from ${ORG}`,
      },
      {
        name: `Get the top ${HEAD_COUNT} repositories with more stars`,
        value: "mostPopularRepositories",
        description: `Get the top ${HEAD_COUNT} repositories with more stars from ${ORG}`,
      },
      {
        name: `List all repositories alphabetically and remove all repositories starting with '${PREFIX}'`,
        value: "listAndRemove",
        description: `List all repositories alphabetically and remove all repositories starting with '${PREFIX}' from ${ORG}`,
      },
      new Separator(),
      {
        name: "Exit",
        value: "exit",
        description: "Exit the program",
      },
    ],
  });
