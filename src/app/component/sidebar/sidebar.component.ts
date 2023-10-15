import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  fixedRoutes: string[];
  includeRoutes: string[];

  constructor(private router: Router) {
    this.fixedRoutes = [''];
    this.includeRoutes = [
      '/result',
      '/home',
      '/assessment-detail',
      '/assessment-create',
      '/participant'
    ];
  }

  shouldShowNavbar(): boolean {
    const currentRoute = this.router.url;
    return (
      this.includeRoutes.some((r) => currentRoute.includes(r)) ||
      this.fixedRoutes.some((r) => currentRoute == r)
    );
  }

  logout() {
    Swal.fire({
      title: 'Apakah Anda yakin Ingin?',
      text: 'Anda tidak dapat mengembalikan tindakan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire('Logout Berhasil!', '', 'success');
        this.router.navigate([""]);
      } else {
        Swal.fire('Tindakan dibatalkan.', '', 'error');
      }
    });
  }
}
