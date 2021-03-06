import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddTodoComponent } from './modals/add-todo/add-todo.component';
import { NotifierService } from './notifier.service';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  @ViewChild('addTodoModal') addTodoModal: AddTodoComponent;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private notifier: NotifierService
  ) {}

  generateTodos(): void {
    this.apiService.generateTodos().subscribe((response) => {
      if (response) {
        this.toastr.success('Tarefas geradas com sucesso!');
        this.notifier.notify('UpdateTodoList');
      }
    });
  }

  openAddTodoModal() {
    this.addTodoModal.open();
  }
}
