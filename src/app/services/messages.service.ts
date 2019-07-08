import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messageQueue: Array<any> = Array<any>();
  private snackBarRef: MatSnackBarRef<SimpleSnackBar>;
  private isInstanceVisible = false;
  constructor(private snackBar: MatSnackBar) { }
  renderErrorMessage(data: any) {
    if (typeof data.errors === 'object') {
      Object.keys(data.errors).forEach(error => {
        if (Array.isArray(data.errors[error])) {
          data.errors[error].forEach(message => {
            this.openSnackBar(`${error.charAt(0).toUpperCase() + error.slice(1)} ${message}`);
          });
        }
      });
    }
  }

  openSnackBar(message: string, config?: MatSnackBarConfig) {
      if (!config) {
        config = new MatSnackBarConfig();
        config.duration = 2500;
      }
      this.messageQueue.push({message, config});
      if (!this.isInstanceVisible) { this.showNext(); }
  }

  private showNext() {
    if (this.messageQueue.length === 0) {
      return;
    }

    const message = this.messageQueue.shift();
    this.isInstanceVisible = true;

    this.snackBarRef = this.snackBar.open(
      message.message,
      'Ok',
      message.config
    );

    this.snackBarRef.afterDismissed().subscribe(() => {
      this.isInstanceVisible = false;
      this.showNext();
    });
  }
}
