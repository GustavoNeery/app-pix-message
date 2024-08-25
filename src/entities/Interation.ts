class Interation {
  id?: string;
  callCount: number;

  constructor({ callCount }: Interation) {
    this.callCount = callCount;
  }
}

export { Interation };
