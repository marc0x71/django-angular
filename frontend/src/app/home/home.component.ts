import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnChanges {
  data: any;

  constructor(private dataService: DataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dataService.get_data().subscribe((values) => {
      this.data = Array.isArray(values) ? values : [values];
    });
  }

  ngOnInit(): void {
    this.dataService.get_data().subscribe((values) => {
      this.data = Array.isArray(values) ? values : [values];
    });
  }
}
