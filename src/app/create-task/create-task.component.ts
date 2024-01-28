import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  createForm: FormGroup;
  statuses: any[] = [];
  employees: any[] = [];

  constructor(private fb: FormBuilder, private router: Router, private taskService: TaskService, private authService: AuthService) {
      this.createForm = this.fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          userAssignedId: ['', Validators.required],
          statusId: ['', Validators.required],
      });
  }

  ngOnInit() {
      this.taskService.getStatuses().subscribe((data: any) => {
          this.statuses = data;
      });
      this.authService.getEmployess().subscribe((data: any) => {
        this.employees = data;
    });

  }

  onSubmit() {
    debugger
      if (this.createForm.valid) {
          // Call your task service to create a new task
          this.taskService.addTask(this.createForm.value).subscribe(
              response => {
                  console.log('Task created successfully:', response);
                  this.router.navigate(['/tasks']); // Navigate back to the task list page
              },
              error => {
                  console.error('Error creating task:', error);
              }
          );
      }
  }

}
