import { Component, Input, OnInit } from '@angular/core';
import { ResultModel } from 'src/app/models/result-model';

interface Participant {
  id: number;
  username: string;
  email: string;
  name: string;
  results: [];
}

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {

  @Input() participants: Participant[] = []

  constructor() {
  }

  ngOnInit(): void {
  }

}
