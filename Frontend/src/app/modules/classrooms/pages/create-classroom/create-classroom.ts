import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { CreateClassroomRequest } from '../../interfaces/classroom';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-create-classroom',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './create-classroom.html',
})
export class CreateClassroom {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private classroomService = inject(ClassroomService);

  classroomTypes = ['Aula', 'Laboratorio', 'Auditorio', 'Sala de reuniones'];

  classroomForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    building: ['', [Validators.required, Validators.maxLength(100)]],
    capacity: [null as number | null, [Validators.required, Validators.min(1), Validators.max(200)]],
    classroom_type: ['', [Validators.required, Validators.maxLength(50)]],
    status: [true]
  });

  createClassroom(): void {
    if (this.classroomForm.invalid) {
      this.classroomForm.markAllAsTouched();
      return;
    }
    const classroom: CreateClassroomRequest = {
      name: this.classroomForm.value.name!,
      building: this.classroomForm.value.building!,
      capacity: Number(this.classroomForm.value.capacity),
      classroom_type: this.classroomForm.value.classroom_type!,
      status: this.classroomForm.value.status!
    };
    this.classroomService.create(classroom).subscribe({
      next: () => {
        this.alertService.toast('Salón registrado correctamente', 'success');
        this.router.navigateByUrl('/classrooms/list');
      },
      error: (error: any) => {
        console.error('Error creating classroom:', error);
        const message = error?.error?.error ?? 'Error al crear el salon';
        this.alertService.toast(message, 'error');
      }
    })
  }

}