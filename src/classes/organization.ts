import { GithubApiRepository } from "./github-adapter";
import Repository from "./repository";

class Organization {
  name: string;
  repositories: Repository[];

  constructor(name: string) {
    this.name = name;
    this.repositories = [];
  }

  async parseRepositories(jsonData: GithubApiRepository[]) {
    this.repositories = jsonData.map(
      (repo) =>
        new Repository(
          repo.name,
          repo.stargazers_count,
          new Date(repo.updated_at),
        ),
    );
  }

  getRepositoryWithEqualOrGreaterAmountOfStars(amountOfStars: number) {
    return this.repositories.filter(
      (repository) => repository.stars >= amountOfStars,
    );
  }

  sumAllRepositories() {
    return this.repositories.reduce(
      (acc, repository) => acc + repository.stars,
      0,
    );
  }

  orderRepositoriesByUpdatedDate() {
    return this.repositories.toSorted(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
    );
  }

  getTailOfRepositories(amountOfRepositories: number) {
    return this.orderRepositoriesByUpdatedDate().slice(0, amountOfRepositories);
  }

  orderRepositoriesByStars() {
    return this.repositories.toSorted((a, b) => {
      if (b.stars === a.stars) {
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      }
      return b.stars - a.stars;
    });
  }

  getMostPopularRepositories(amountOfRepositories: number) {
    return this.orderRepositoriesByStars().slice(0, amountOfRepositories);
  }
}

export default Organization;
