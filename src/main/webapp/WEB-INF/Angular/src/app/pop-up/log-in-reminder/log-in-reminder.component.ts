import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-log-in-reminder',
  templateUrl: './log-in-reminder.component.html',
  styleUrls: ['./log-in-reminder.component.css']
})
export class LogInReminderComponent implements OnInit {


  constructor(public router: Router,
              public dialogRef: MatDialogRef<LogInReminderComponent>) {
  }

  ngOnInit() {
  }

}
