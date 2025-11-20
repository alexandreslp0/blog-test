export class Article {
  constructor(
    public readonly id: string,
    public title: string,
    public content: string,
    public userId: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
