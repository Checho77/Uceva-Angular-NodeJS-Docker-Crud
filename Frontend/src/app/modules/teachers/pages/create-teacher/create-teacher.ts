import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { CreateTeacherRequest } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-create-teacher',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './create-teacher.html',
})
export class CreateTeacher {

  private fb = inject(FormBuilder);
  private router = inject(Router);
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

  createTeacher(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
    const teacher: CreateTeacherRequest = {
      name: this.teacherForm.value.name!,
      email: this.teacherForm.value.email!,
      phone: this.teacherForm.value.phone!,
      specialty: this.teacherForm.value.specialty!,
      hire_date: new Date(this.teacherForm.value.hire_date!),
      status: this.teacherForm.value.status!
    };
    this.teacherService.create(teacher).subscribe({
      next: () => {
        this.alertService.toast('Profesor registrado correctamente', 'success');
        this.router.navigateByUrl('/teachers/list');
      },
      error: (error: any) => {
        console.error('Error creating teacher:', error);
        const message = error?.error?.error ?? 'Error al crear el profesor';
        this.alertService.toast(message, 'error');
      }
    })
  }

}