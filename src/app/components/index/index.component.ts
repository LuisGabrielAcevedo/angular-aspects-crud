import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  aspects = [];
  data = [];
  displayedColumns: string[] = [];
  loading = true;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadAspects();
  }

  async loadAspects() {
    this.loading = true;
    this.aspects = await this.userService.builder().indexAspects();
    this.aspects.forEach(element => this.displayedColumns.push(element.accessor));
    this.loadData();
  }

  loadData() {
    this.userService.getAll().subscribe(
      resp => {
        this.loading = false;
        this.data = resp
      }
    )
  }
}
