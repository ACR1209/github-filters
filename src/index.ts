import Organization from "./classes/organization";
import { mainInquirerSelect, waitForInput } from "./utils";
import GithubAdapter from "./classes/github-adapter";

const ORG = "stackbuilders";
const MIN_STARS = 5;
const LAST_UPDATED_COUNT = 5;
const HEAD_COUNT = 5;

const stackBuilders = new Organization(ORG);
GithubAdapter.fetchAllOrgRepositories(ORG).then((data) => {
  stackBuilders
    .parseRepositories(data)
    .then(async () => {
      console.log(`Welcome to the ${stackBuilders.name} organization! 🚀`);
      console.log(`We have ${stackBuilders.repositories.length} repositories!`);

      while (true) {
        const answer = await mainInquirerSelect(
          ORG,
          MIN_STARS,
          LAST_UPDATED_COUNT,
          HEAD_COUNT,
        );

        if (answer === "exit") {
          break;
        }

        switch (answer) {
          case "moreThanStars":
            const reposWithMoreThanStars =
              stackBuilders.getRepositoryWithEqualOrGreaterAmountOfStars(
                MIN_STARS,
              );
            console.log(
              reposWithMoreThanStars.map((repo) => repo.toString()).join("\n"),
            );
            break;
          case "lastFiveUpdated":
            const lastRepos = stackBuilders.getTailOfRepositories(5);
            console.log(lastRepos.map((repo) => repo.toString()).join("\n"));
            break;
          case "sumAllRepositories":
            console.log(
              `Sum of stars for all the repositories of ${stackBuilders.name}: ${stackBuilders.sumAllRepositories()}`,
            );
            break;
          case "mostPopularRepositories":
            const mostPopularRepositories =
              stackBuilders.getMostPopularRepositories(5);
            console.log(
              mostPopularRepositories.map((repo) => repo.toString()).join("\n"),
            );
            break;
        }

        await waitForInput();
        console.clear();
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
