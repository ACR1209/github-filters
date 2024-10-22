export interface GithubApiRepository {
  name: string;
  updated_at: string;
  stargazers_count: number;
}

class GithubAdapter {
  static async fetchOrgRepositoriesPage(org: string, page = 1, per_page = 30) {
    const response = await fetch(
      `https://api.github.com/orgs/${org}/repos?page=${page}&per_page=${per_page}`,
    );
    const data = (await response.json()) as GithubApiRepository[];
    return data;
  }

  static async fetchAllOrgRepositories(org: string) {
    let res: GithubApiRepository[] = [];

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
