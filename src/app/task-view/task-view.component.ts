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

  constructor(private taskService: TaskService, private router:Router) { }

  ngOnInit(): void {
    this.loadTasks();
    this.getStatuses();
  }

  loadTasks() {
    // this.taskService.getTasks().subscribe((data: any) => {
    //   this.tasks = data;
      
    // });
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks.map((task) => ({...task, successMessage: ''}));
      },
      (error) => {
        console.error('Failed to fetch auctions', error);
      }
    );
  }
  deleteTask(taskId: number): void {
    debugger
    const task = this.tasks.find(t => t.id === taskId);

    this.taskService.deleteTask(taskId).subscribe(
      (response) => {
        task.successMessage = 'Auction successfully deleted';
      },
      (HttpErrorResponse ) => {        console.log(HttpErrorResponse )

        console.log(HttpErrorResponse )
        if (HttpErrorResponse  && HttpErrorResponse.error.message) {
          task.successMessage = HttpErrorResponse.error.message;
        } 
        else if (HttpErrorResponse  && HttpErrorResponse.error) {
          task.successMessage = HttpErrorResponse.error;
        } 

        else {
          task.successMessage = 'Auction deletion failed';
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
    console.log('task to be edited : ', task.id, task.id, task.description)
    this.taskService.editTask(id, task.title, task.description).subscribe((data: any) => {
    });
    this.loadTasks();
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
