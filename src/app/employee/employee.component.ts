import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import {EmployeeService} from "../service/employee.service";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {Employee} from "../model/employee";
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, NgIf]
})
export class EmployeeComponent implements OnInit, OnDestroy {
  selectedEmployee: Employee | null = null;
  private subscription!: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private employeeService: EmployeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const numb = Number(params['id']);
      this.subscription = this.employeeService.getEmployee(numb).subscribe({
        next: ({data, loading}) => {
          this.selectedEmployee = data.employeeByNumber;
        },
        error: (error: any) => {
          this.selectedEmployee = null;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}