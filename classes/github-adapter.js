class GithubAdapter {
  static async fetchOrgRepositoriesPage(org, page = 1, per_page = 30) {
    const response = await fetch(
      `https://api.github.com/orgs/${org}/repos?page=${page}&per_page=${per_page}`,
    );
    const data = await response.json();
    return data;
  }

  static async fetchAllOrgRepositories(org) {
    let res = [];

    let page = 1;
    let per_page = 100;
    let repositories;

    do {
      repositories = await this.fetchOrgRepositoriesPage(org, page, per_page);
      res = res.concat(repositories);
      page++;
    } while (repositories.length === per_page);

    return res;
  }
}

export default GithubAdapter;
