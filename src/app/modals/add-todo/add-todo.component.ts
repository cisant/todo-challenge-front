import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NotifierService } from 'src/app/notifier.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {
  @ViewChild('content') content: ElementRef;
  todo = {
    description: '',
    name: '',
    email: '',
  };
  isLoading = false;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private apiService: ApiService,
    private notifier: NotifierService
  ) {}

  open() {
    this.todo = {
      description: '',
      name: '',
      email: '',
    };
    this.isLoading = false;
    this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  saveTodo() {
    if (!this.checkEmpty(this.todo)) {
      this.toastr.error('Existem campos vazios!');
      return;
    }
    this.isLoading = true;
    this.apiService.addTodo(this.todo).subscribe((result) => {
      this.isLoading = false;
      if (result && result.valid) {
        this.toastr.success('Tarefa criada com sucesso!');
        this.modalService.dismissAll();
        this.notifier.notify('UpdateTodoList');
      } else if (result && result.didYouMean) {
        this.toastr.warning(`Você quis dizer ${result.didYouMean}?`);
      } else {
        this.toastr.error(
          'Houve um erro na criação da tarefa. Tente novamente!'
        );
      }
    });
  }

  checkEmpty(todo) {
    for (var key in todo) {
      if (todo[key].trim() === '') {
        return false;
      }
    }
    return true;
  }
}
