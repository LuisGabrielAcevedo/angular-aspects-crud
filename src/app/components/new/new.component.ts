import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  form_aspects = [];
  loading = true;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadAspects();
  }

  async loadAspects() {
    this.loading = true;
    const builder = await this.userService.builder();
    this.form_aspects = builder.formAspects();
  }

}
