import Organization from "../src/classes/organization";
import { readFileSync } from "fs";
import Repository from "../src/classes/repository";

const fixtureGithubResponse = JSON.parse(
  readFileSync("./tests/github-org-fixture.json", "utf8"),
);

const fixtureNoConflictingStarsGithubResponse = JSON.parse(
  readFileSync("./tests/github-org-fixture-stars-no-conflict.json", "utf8"),
);

const ORG = "stackbuilders";

describe("Organization", () => {
  let organization: Organization;

  describe("#parseRepositories", () => {
    beforeEach(() => {
      organization = new Organization(ORG);
    });

    test("should be able to parse all valid repositories in a response", () => {
      organization.parseRepositories(fixtureGithubResponse);

      expect(organization.repositories.length).toBe(6);
      expect(organization.repositories).toBeInstanceOf(Array);
      organization.repositories.forEach((repo) => {
        expect(repo).toBeInstanceOf(Repository);
      });
    });

    test("should return and empty repository if no data passed", () => {
      organization.parseRepositories([]);

      expect(organization.repositories.length).toBe(0);
      expect(organization.repositories).toBeInstanceOf(Array);
    });
  });

  describe("#getRepositoryWithEqualOrGreaterAmountOfStars", () => {
    beforeEach(() => {
      organization = new Organization(ORG);
      organization.parseRepositories(fixtureGithubResponse);
    });

    test("should return an array of repositories", () => {
      const minStars = 5;

      const res =
        organization.getRepositoryWithEqualOrGreaterAmountOfStars(minStars);

      expect(res).toBeInstanceOf(Array);

      res.forEach((repo) => {
        expect(repo).toBeInstanceOf(Repository);
      });
    });

    test("should not modify repositories stored in memory", () => {
      const minStars = 5;
      const currentSize = organization.repositories.length;

      const res =
        organization.getRepositoryWithEqualOrGreaterAmountOfStars(minStars);

      expect(organization.repositories.length).toBe(currentSize);
    });

    test("should not be equal to repositories stored", () => {
      const minStars = 5;
      const currentSize = organization.repositories.length;

      const res =
        organization.getRepositoryWithEqualOrGreaterAmountOfStars(minStars);

      expect(organization.repositories.length).toBe(currentSize);
      expect(organization.repositories.length).not.toBe(res.length);
    });

    test("should return correct amount of repositories given the amount of stars to filter by", () => {
      const minStars = 5;

      const res =
        organization.getRepositoryWithEqualOrGreaterAmountOfStars(minStars);

      expect(res.length).toBe(3);
      expect(res).toBeInstanceOf(Array);
      res.forEach((repo) => {
        expect(repo).toBeInstanceOf(Repository);
        expect(repo.stars).toBeGreaterThanOrEqual(minStars);
      });
    });
  });

  describe("#sumAllRepositories", () => {
    beforeEach(() => {
      organization = new Organization(ORG);
      organization.parseRepositories(fixtureGithubResponse);
    });

    test("should return a number", () => {
      const res = organization.sumAllRepositories();

      expect(typeof res).toBe("number");
    });

    test("should not modify repositories stored in memory", () => {
      const currentSize = organization.repositories.length;

      const res = organization.sumAllRepositories();

      expect(organization.repositories.length).toBe(currentSize);
    });

    test("should return correct sum of stars given repositories", () => {
      const res = organization.sumAllRepositories();

      expect(res).toBe(52);
    });
  });

  describe("#orderRepositoriesByUpdatedDate", () => {
    beforeEach(() => {
      organization = new Organization(ORG);
      organization.parseRepositories(fixtureGithubResponse);
    });

    test("should return an array of repositories", () => {
      const res = organization.orderRepositoriesByUpdatedDate();

      expect(res).toBeInstanceOf(Array);

      res.forEach((repo) => {
        expect(repo).toBeInstanceOf(Repository);
      });
    });

    test("should not modify repositories stored in memory", () => {
      const currentSize = organization.repositories.length;
      const currentRepos = organization.repositories.slice();

      const res = organization.orderRepositoriesByUpdatedDate();

      expect(organization.repositories).toEqual(currentRepos);
      expect(res).not.toEqual(currentRepos);
    });

    test("should correctly sort the repositories given their update date", () => {
      const res = organization.orderRepositoriesByUpdatedDate();
      const expectedOrder = [5, 3, 4, 2, 1, 6];

      res.forEach((repo, index) => {
        expect(repo.name).toBe(`Test ${expectedOrder[index]}`);
      });
    });
  });

  describe("#getTailOfRepositories", () => {
    beforeEach(() => {
      organization = new Organization(ORG);
      organization.parseRepositories(fixtureGithubResponse);
    });

    test("should return an array of repositories", () => {
      const amountOfRepositories = 5;

      const res = organization.getTailOfRepositories(amountOfRepositories);

      expect(res).toBeInstanceOf(Array);

      res.forEach((repo) => {
        expect(repo).toBeInstanceOf(Repository);
      });
    });

    test("should not modify repositories stored in memory", () => {
      const currentSize = organization.repositories.length;
      const currentRepos = organization.repositories.slice();
      const amountOfRepositories = 5;

      const res = organization.getTailOfRepositories(amountOfRepositories);

      expect(organization.repositories).toEqual(currentRepos);
      expect(res).not.toEqual(currentRepos);
    });

    test("should correctly get the n last updated repositories", () => {
      const amountOfRepositories = 5;
      const res = organization.getTailOfRepositories(amountOfRepositories);
      const expectedRepos = [5, 3, 4, 2, 1];

      expect(res.length).toBe(amountOfRepositories);
      res.forEach((repo, index) => {
        expect(repo.name).toBe(`Test ${expectedRepos[index]}`);
      });
    });
  });

  describe("#orderRepositoriesByStars", () => {
    beforeEach(() => {
      organization = new Organization(ORG);
      organization.parseRepositories(fixtureGithubResponse);
    });

    test("should return an array of repositories", () => {
      const res = organization.orderRepositoriesByStars();

      expect(res).toBeInstanceOf(Array);

      res.forEach((repo) => {
        expect(repo).toBeInstanceOf(Repository);
      });
    });

    test("should not modify repositories stored in memory", () => {
      const currentSize = organization.repositories.length;
      const currentRepos = organization.repositories.slice();

      const res = organization.orderRepositoriesByStars();

      expect(organization.repositories).toEqual(currentRepos);
      expect(res).not.toEqual(currentRepos);
    });

    test("should sort by updated date if same number of stars", () => {
      const res = organization.orderRepositoriesByStars();
      const expectedOrder = [1, 6, 3, 5, 4, 2];

      res.forEach((repo, index) => {
        expect(repo.name).toBe(`Test ${expectedOrder[index]}`);
      });
    });

    test("should sort the repositories given their stars", () => {
      organization = new Organization(ORG);
      organization.parseRepositories(fixtureNoConflictingStarsGithubResponse);

      const res = organization.orderRepositoriesByStars();
      const expectedOrder = [1, 6, 3, 5, 2, 4];

      res.forEach((repo, index) => {
        expect(repo.name).toBe(`Test ${expectedOrder[index]}`);
      });
    });
  });

  describe("#getMostPopularRepositories", () => {
    beforeEach(() => {
      organization = new Organization(ORG);
      organization.parseRepositories(fixtureGithubResponse);
    });

    test("should return an array of repositories", () => {
      const amountOfRepositories = 5;

      const res = organization.getMostPopularRepositories(amountOfRepositories);

      expect(res).toBeInstanceOf(Array);

      res.forEach((repo) => {
        expect(repo).toBeInstanceOf(Repository);
      });
    });

    test("should not modify repositories stored in memory", () => {
      const currentSize = organization.repositories.length;
      const currentRepos = organization.repositories.slice();
      const amountOfRepositories = 5;

      const res = organization.getMostPopularRepositories(amountOfRepositories);

      expect(organization.repositories).toEqual(currentRepos);
      expect(res).not.toEqual(currentRepos);
    });

    test("should correctly get the top n repositories given their stars", () => {
      const amountOfRepositories = 5;
      const res = organization.getMostPopularRepositories(amountOfRepositories);
      const expectedRepos = [1, 6, 3, 5, 4];

      expect(res.length).toBe(amountOfRepositories);
      res.forEach((repo, index) => {
        expect(repo.name).toBe(`Test ${expectedRepos[index]}`);
      });
    });
  });
});
