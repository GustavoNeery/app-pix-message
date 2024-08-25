import { Interation } from "../../entities/Interation";

export interface IInterationRepository {
  findById(interationId: string): Promise<Interation | null>;
}
