import { Service } from "typedi";
import { TypeORMRepository } from "./typeORMRepository";
import { Answer } from "../core/answer";

@Service()
export class AnswersRepository extends TypeORMRepository<Answer> {
  constructor() {
    super(Answer);
  }

  getFull(id: string): Promise<Answer | undefined> {
    return this.repository.findOne(id, { relations: ["storyPage"] });
  }
}
