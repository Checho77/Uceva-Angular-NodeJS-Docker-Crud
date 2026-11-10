import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { Classroom, UpdateClassroomRequest } from '../../interfaces/classroom';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-update-classroom',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './update-classroom.html',
})
export class UpdateClassroom {

  id!: number;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
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

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = Number(paramId);
    if (!paramId || !Number.isFinite(this.id) || this.id <= 0) {
      this.alertService.toast('Identificación no válida', 'error');
      this.goToList();
      return;
    }
    this.getClassroom();
  }

  getClassroom() {
    this.classroomService.getById(this.id).subscribe({
      next: (classroom) => {
        this.setValues(classroom);
      },
      error: (error: any) => {
        console.error('Error fetching classroom:', error);
        this.alertService.toast('Error al consultar el salon', 'error');
        this.goToList();
      }
    })
  }

  setValues(classroom: Classroom): void {
    this.classroomForm.patchValue({
      name: classroom.name,
      building: classroom.building,
      capacity: classroom.capacity,
      classroom_type: classroom.classroom_type,
      status: classroom.status
    });
  }

  updateClassroom(): void {
    if (this.classroomForm.invalid) {
      this.classroomForm.markAllAsTouched();
      return;
    }
    const formValue = this.classroomForm.getRawValue();
    const classroom: UpdateClassroomRequest = {
      name: formValue.name!,
      building: formValue.building!,
      capacity: Number(formValue.capacity),
      classroom_type: formValue.classroom_type!,
      status: formValue.status!
    };

    this.classroomService.update(this.id, classroom).subscribe({
      next: () => {
        this.alertService.toast('Salón actualizado correctamente', 'success');
        this.goToList();
      },
      error: (error: any) => {
        console.error('Error updating classroom:', error);
        const message = error?.error?.error ?? 'Error al actualizar el salon';
        this.alertService.toast(message, 'error');
      }
    });
  }

  goToList() {
    this.router.navigateByUrl('/classrooms/list');
  }

}