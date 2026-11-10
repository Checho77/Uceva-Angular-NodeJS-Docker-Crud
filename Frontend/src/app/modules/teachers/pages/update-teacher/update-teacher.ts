import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { Teacher, UpdateTeacherRequest } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-update-teacher',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './update-teacher.html',
})
export class UpdateTeacher {

  id!: number;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private teacherService = inject(TeacherService);

  today = new Date().toISOString().substring(0, 10);

  teacherForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    phone: ['', [Validators.required, Validators.maxLength(10)]],
    specialty: ['', [Validators.required, Validators.maxLength(100)]],
    hire_date: ['', Validators.required],
    status: [true]
  });

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = Number(paramId);
    if (!paramId || !Number.isFinite(this.id) || this.id <= 0) {
      this.alertService.toast('Identificación no válida', 'error');
      this.goToList();
      return;
    }
    this.getTeacher();
  }

  getTeacher() {
    this.teacherService.getById(this.id).subscribe({
      next: (teacher) => {
        this.setValues(teacher);
      },
      error: (error: any) => {
        console.error('Error fetching teacher:', error);
        this.alertService.toast('Error al consultar el profesor', 'error');
        this.goToList();
      }
    })
  }

  setValues(teacher: Teacher): void {
    this.teacherForm.patchValue({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      specialty: teacher.specialty,
      hire_date: this.formatDate(teacher.hire_date),
      status: teacher.status
    });
  }

  private formatDate(value: Date | string): string {
    if (typeof value === 'string') {
      return value.substring(0, 10);
    }
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  updateTeacher(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
    const formValue = this.teacherForm.getRawValue();
    const teacher: UpdateTeacherRequest = {
      name: formValue.name!,
      email: formValue.email!,
      phone: formValue.phone!,
      specialty: formValue.specialty!,
      hire_date: new Date(formValue.hire_date!),
      status: formValue.status!
    };

    this.teacherService.update(this.id, teacher).subscribe({
      next: () => {
        this.alertService.toast('Profesor actualizado correctamente', 'success');
        this.goToList();
      },
      error: (error: any) => {
        console.error('Error updating teacher:', error);
        const message = error?.error?.error ?? 'Error al actualizar el profesor';
        this.alertService.toast(message, 'error');
      }
    });
  }

  goToList() {
    this.router.navigateByUrl('/teachers/list');
  }

}