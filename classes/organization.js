import Repository from "./repository.js";

class Organization {
  constructor(name) {
    this.name = name;
    this.repositories = [];
  }

  async parseRepositories(jsonData) {
    this.repositories = jsonData.map(
      (repo) =>
        new Repository(
          repo.name,
          repo.stargazers_count,
          new Date(repo.updated_at),
        ),
    );
  }

  getRepositoryWithEqualOrGreaterAmountOfStars(amountOfStars) {
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
    return this.repositories.toSorted((a, b) => b.updatedAt - a.updatedAt);
  }

  getTailOfRepositories(amountOfRepositories) {
    return this.orderRepositoriesByUpdatedDate().slice(0, amountOfRepositories);
  }
}

export default Organization;
