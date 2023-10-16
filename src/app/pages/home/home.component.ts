import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IAssessment } from 'src/app/interfaces/i-assessment';
import { format } from 'date-fns';
import { AssessmentService } from 'src/app/services/assessment.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from 'src/app/interfaces/i-user';
import { UserService } from 'src/app/services/user.service';
import { AssessmentServiceNew } from 'src/app/services/assessmentnew.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  closeResult: string = '';
  // dasboard assessment
  countAssesment: number = 0;
  countActive: number = 0;
  countClosed: number = 0;
  idAseesment: any;

  // efek Loading
  isLoading: boolean;

  // background status
  isStatus: boolean;

  // Mengambil data kolom status
  status: string;

  // Mengambil tanggal saat ini
  currentDate: Date;
  endDate: Date;

  // Search
  keyword: string;

  // pagination
  itemsPerPage = 7; // Jumlah item per halaman
  currentPage = 1; // Halaman saat ini
  totalPages: number; // Total halaman

  // Mengambil data assessments
  assessments: IAssessment[] = [];

  //Mengambil data user
  participant: IUser[] = [];
  participants: IUser[] = [];
  filterParticipant: IUser[] = [];

  data: any[] = [];

  constructor(
    private assessmentService: AssessmentService,
    private assessmentNew: AssessmentServiceNew,
    private modalService: NgbModal,
    private userService: UserService
  ) {
    this.currentDate = new Date();
    this.endDate = new Date();
    this.status = '';
    this.isStatus = false;
    this.isLoading = true;
    this.totalPages = 0;
    this.keyword = '';
  }

  ngOnInit(): void {
    this.getAssessment();
  }

  open(content: any, id: any) {
    this.getAllParticipant();
    this.idAseesment = id;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  getAllParticipant() {
    this.userService
      .getAllUser()
      .pipe(catchError(this.handleError))
      .subscribe((response: any) => {
        this.participant = response.data;
        this.assessmentService.getDetail(this.idAseesment);

        this.assessmentService
          .getDetail(this.idAseesment)
          .subscribe((resp: any) => {
            const participants = resp.data.participants;

            // Menyaring data yang tidak ada di participants
            const filteredParticipants = this.participant.filter(
              (participant) => {
                return !participants.some((p: any) => p.id === participant.id);
              }
            );
            this.filterParticipant = filteredParticipants;
          });
      });
  }

  addParti(i: any) {
    this.data.push(i);
  }

  updateParticipant() {
    this.assessmentNew
      .updateParticipantList(this.idAseesment, this.data)
      .subscribe(
        (response) => {
          console.log('Data berhasil diperbarui', response);
        },
        (error) => {
          console.error('Gagal mengirim permintaan', error);
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.filterParticipant = [];
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.filterParticipant = [];
      return 'by clicking on a backdrop';
    } else {
      this.filterParticipant = [];
      return `with: ${reason}`;
    }
  }

  getAssessment() {
    this.assessmentService
      .getAll()
      .pipe(catchError(this.handleError))
      .subscribe((resp: any) => {
        this.assessments = resp.data;
        this.isLoading = false;
        this.totalPages = Math.ceil(
          this.assessments.length / this.itemsPerPage
        );
        this.countAssesment = this.assessments.length;

        for (var i = 0; i < this.assessments.length; i++) {
          // Mengambil endDate
          this.endDate = new Date(resp.data[i].endDate);

          // Merubah format untuk dibandingkan
          const currentDateFormatted = format(
            this.currentDate,
            'yyyy-MM-dd hh:mm:ss'
          );
          const endDateFormatted = format(this.endDate, 'yyyy-MM-dd hh:mm:ss');

          // Untuk memberikan status
          if (endDateFormatted > currentDateFormatted) {
            this.status = 'Open';
            this.countActive = +this.status.length;
          } else {
            this.status = 'Closed';
            this.countClosed = +this.status.length;
          }

          // Untuk memberikan background pada status
          if (this.status == 'Open') {
            this.isStatus = true;
          } else if (this.status == 'Closed') {
            this.isStatus = false;
          }
        }
      });
  }

  getPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.assessments.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  search(keyword: string) {
    if (keyword != '') {
      // Mencari data yang cocok dengan kata kunci
      this.assessments = this.assessments.filter((item) =>
        item.title.toLowerCase().includes(keyword.toLowerCase())
      );
    } else {
      // Jika tidak ada kata kunci, tampilkan semua data
      this.getAssessment();
    }
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
