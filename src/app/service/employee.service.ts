import { inject, Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {Employee} from "../model/employee";
import {Apollo} from "apollo-angular";
import {ApolloQueryResult, FetchResult, gql} from "@apollo/client/core";

const GET_EMPLOYEES = gql`
  query($employeeNumber: Int!) {
    employeeByNumber(employeeNumber: $employeeNumber) {
      employeeId
      employeeNumber
      name
      dateOfBirth
      city
      salary
      gender
      email
    }
  }
`;

const ADD_EMPLOYEE = gql`
  mutation newEmployee($employeeNumber: Int!,
    $name: String!,
    $dateOfBirth: String!,
    $city: String!,
    $salary: Float!,
    $gender: String,
    $email: String) {
    newEmployee(createEmployeeInput: {employeeNumber: $employeeNumber, name: $name, dateOfBirth: $dateOfBirth, city: $city, salary: $salary, gender: $gender, email: $email}) {
      employeeId
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees$: BehaviorSubject<readonly Employee[]> = new BehaviorSubject<readonly Employee[]>([]);
  
  private apollo: Apollo = inject(Apollo);

  public getEmployee(employeeNumber: number): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .query<any>({
      query: GET_EMPLOYEES,
      variables: {
        employeeNumber
      }
    });
  }

  addEmployee(e: Employee): Observable<FetchResult<unknown>>{
    return this.apollo.mutate({
        mutation: ADD_EMPLOYEE,
        variables: {
          employeeNumber: e.employeeNumber,
          name: e.name,
          cit: e.city,
          salary: e.salary,
          gender: e.gender,
          email: e.email
        }
      }
    );
  }
}
