export class Employee {
  constructor(
    public employeeId: string,
    public employeeNumber: number,
    public name: string,
    public dateOfBirth: string,
    public city: string,
    public salary: number,
    public gender?: string,
    public email?: string
  ) {}
}
