import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthorizeComponent } from '../modals/authorize/authorize.component';
import { NotifierService } from '../notifier.service';
import { ApiService } from '../services/api.service';
import { SocketioService } from '../services/socketio.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnDestroy {
  @ViewChild('authorizeTodoModal') authorizeTodoModal: AuthorizeComponent;
  todos = { pending: [], done: [] };
  private UpdateTodoListSubscribeId = null;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private socketio: SocketioService,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {
    this.loadTodos();
    this.UpdateTodoListSubscribeId = this.notifier.subscribe(
      'UpdateTodoList',
      () => {
        this.loadTodos();
      }
    );
    this.socketio.onUpdateTodoList(() => {
      this.loadTodos();
    });
  }

  ngOnDestroy(): void {
    this.notifier.unsubscribe(this.UpdateTodoListSubscribeId);
  }

  loadTodos(): void {
    this.apiService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  changeStatus(todo): void {
    if (todo.status === 'Done') {
      this.authorizeTodoModal.open(() => {
        this.confirmChangeStatus(todo);
      });
    } else {
      this.confirmChangeStatus(todo);
    }
  }

  confirmChangeStatus(todo) {
    this.apiService.changeStatus(todo.id).subscribe((result) => {
      if (result) {
        this.toastr.success('Status alterado com sucesso!');
        this.loadTodos();
      } else {
        this.toastr.error(
          'Ocorreu um erro ao alterar o status. Tente novamente!'
        );
      }
    });
  }
}
