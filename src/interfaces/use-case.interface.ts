export interface IUseCasePromise<TModel> {
  execute(...args: any[]): Promise<TModel>;
}
