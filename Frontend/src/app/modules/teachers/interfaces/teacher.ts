export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  hire_date: Date;
  status: boolean;
}

export type CreateTeacherRequest = Omit<Teacher, 'id'>;

export type UpdateTeacherRequest = Omit<Teacher, 'id'>;