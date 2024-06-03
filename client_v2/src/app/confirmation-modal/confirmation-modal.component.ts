import { Component, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  standalone: true // Mark this component as standalone
})
export class ConfirmationModalComponent {
  message: string = ''; // Initialize the message property

  constructor(@Inject(NgbActiveModal) public activeModal: NgbActiveModal) {}

  onConfirm() {
    this.activeModal.close('confirmed');
  }

  onDecline() {
    this.activeModal.dismiss('declined');
  }
}
