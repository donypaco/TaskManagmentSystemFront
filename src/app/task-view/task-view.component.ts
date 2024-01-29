import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent {
  tasks: any[] = []; 
  statuses: any[] = [];
  successMessage : string = '';

  constructor(private taskService: TaskService, private router:Router) { }

  ngOnInit(): void {
    this.loadTasks();
    this.getStatuses();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Failed to fetch Tasks', error);
      }
    );
  }
  deleteTask(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);

    this.taskService.deleteTask(taskId).subscribe(
      (response) => {
        this.loadTasks();
        this.successMessage = `Task ${task.title} successfully deleted`;
      },
      (error) => {
        if (error) {
          this.loadTasks();
          this.successMessage =  `${error.text} ${task.title}`;
        } 
      }
    )
    this.loadTasks();
  }
  editTask(task: any) {
    task.editMode = true;
  }
  cancelEdit(task: any) {
    task.editMode = false;
  }
  saveTask(id:number, task:any ) {
    this.taskService.editTask(id, task.title, task.description).subscribe(
      (response) => {
        this.loadTasks();
        this.successMessage = `Task ${task.title} successfully edited`;
      },
      (error) => {
        if (error) {
          this.loadTasks();
          this.successMessage =  `${error.text} ${task.title}`;
        } 
      }
    );
  }
  getStatuses() {
    this.taskService.getStatuses().subscribe((data: any) => {
      console.log('roles',this.statuses);
      this.statuses = data;
    });
  }
  getStatusName(statusId: number): string {
    const status = this.statuses.find(s => s.id === statusId);
    return status ? status.name : '';
  }
  onStatusChange(task: any): void {
    task.statusTouched = true;
  }  
  changeStatus(taskId: number, statusId: number): void {
    this.taskService.updateTaskStatus(taskId, statusId).subscribe((data: any) => {
    });
  }  
  redirectToCreateTaskPage(){
    this.router.navigate(['/create-task']);
  }

}
