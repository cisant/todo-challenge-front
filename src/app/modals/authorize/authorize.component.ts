import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css'],
})
export class AuthorizeComponent {
  @ViewChild('content') content: ElementRef;
  private onAuthorize: Function;
  password = '';

  constructor(private modalService: NgbModal, private apiService: ApiService, private toastr: ToastrService) {}

  open(onAuthorize: Function) {
    this.onAuthorize = onAuthorize;
    this.password = '';
    this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  checkPassword() {
    this.apiService.authorize(this.password).subscribe((result) => {
      if (result) {
        this.toastr.success('Senha validada com sucesso!');
        this.modalService.dismissAll();
        this.onAuthorize();
      } else {
        this.toastr.error('Senha não autorizada!');
      }
    });
  }
}
