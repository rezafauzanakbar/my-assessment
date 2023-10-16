import { Component, Input, OnInit } from '@angular/core';
import { IResult } from 'src/app/interfaces/i-result';
import { ResultModel } from 'src/app/models/result-model';

interface Participant {
  id: number;
  username: string;
  email: string;
  name: string;
  results: IResult[];
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
    console.log(this.participants);

  }

}
