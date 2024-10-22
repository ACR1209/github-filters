class Repository {
  name: string;
  stars: number;
  updatedAt: Date;

  constructor(name: string, stars: number, updatedAt: Date) {
    this.name = name;
    this.updatedAt = updatedAt;
    this.stars = stars;
  }

  toString() {
    return `${this.name} - ${this.stars} stars - Last updated at ${this.updatedAt}`;
  }
}

export default Repository;
