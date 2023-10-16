import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from 'src/app/interfaces/i-user';
import { AssessmentModel } from 'src/app/models/assessment-model';
import { Assessment, Question } from 'src/app/models/assessment-modelnew';
import { ChoiceModel } from 'src/app/models/choice-model';
import { QuestionModel } from 'src/app/models/question-model';
import { ResultModel } from 'src/app/models/result-model';
import { UserModel } from 'src/app/models/user-model';
import { AssessmentServiceNew } from 'src/app/services/assessmentnew.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assessment-create',
  templateUrl: './assessment-create.component.html',
  styleUrls: ['./assessment-create.component.css'],
})
export class AssessmentCreateComponent implements OnInit {
  closeResult: string = '';

  assessment: Assessment = {
    title: '',
    endDate: '',
    questions: [
      {
        text: '',
        choices: [
          {
            true: true,
            value: '',
          },
          {
            true: false,
            value: '',
          },
          {
            true: false,
            value: '',
          },
          {
            true: false,
            value: '',
          },
        ],
      },
    ],
  };

  constructor(private assessmentService: AssessmentServiceNew, private router: Router) { }

  saveAssesment() {
    Swal.fire({
      title: 'Yakin Ingin Save Assessment?',
      text: 'Anda tidak dapat mengembalikan tindakan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.isAssessmentValid()) {
          // Panggil layanan untuk mengirim data assessment ke API
          this.assessmentService
            .createAssessment(this.assessment)
            .subscribe((response) => {
              console.log('Response from API:', response);
            });
          Swal.fire('Create Berhasil!', '', 'success');
          this.router.navigate(["/home"]);
        } else {
          Swal.fire('Assessment is not valid. Please try again!', '', 'error');
          console.error(
            'Assessment is not valid. Ensure only one true choice per question and up to 4 choices.'
          );
        }
      } else {
        Swal.fire('Tindakan dibatalkan.', '', 'error');
      }
    });

  }

  addQuestion() {
    this.assessment.questions.push({
      text: '',
      choices: [
        { true: true, value: '' },
        { true: false, value: '' },
        { true: false, value: '' },
        { true: false, value: '' },
      ],
    });
  }

  addChoice(question: any) {
    if (question.choices.length < 4) {
      question.choices.push({ true: false, value: '' });
    }
  }

  removeQuestion(index: number) {
    this.assessment.questions.splice(index, 1);
  }

  removeChoice(question: any, index: number) {
    question.choices.splice(index, 1);
  }

  isTrueChoiceCount(question: any): number {
    return question.choices.filter((choice: any) => choice.true).length;
  }

  isAssessmentValid(): boolean {
    // Check if only one choice is true for each question and at most 4 choices
    for (const question of this.assessment.questions) {
      let trueChoiceCount = 0;
      for (const choice of question.choices) {
        if (choice.true) {
          trueChoiceCount++;
        }
      }
      if (trueChoiceCount !== 1 || question.choices.length > 4) {
        return false;
      }
    }
    return true;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public isCollapsed = false;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  question: QuestionModel = {
    id: 0,
    text: '',
    image: '',
    type: 'choices',
    choices: [],
  };

  user: IUser = {
    id: 0,
    name: '',
    username: '',
    password: '',
    email: '',
    active: false,
    admin: false,
  };

  choice: ChoiceModel = {
    id: 0,
    value: '',
    true: false,
  };

  // addParticipant() {
  //   // this.assessment.participants.push(this.user);
  //   // this.user = {
  //   //   id: 0,
  //   //   nama: '',
  //   //   username: '',
  //   //   password: '',
  //   //   email: ''
  //   // };
  // }

  submitAssessment() {
    // Implement logic to submit the assessment to your backend
    console.log(this.assessment);
  }
}
