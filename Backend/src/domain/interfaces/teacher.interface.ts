export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  hire_date: Date;
  status: boolean;
}

export type CreateTeacher = Omit<Teacher, "id">;

export type UpdateTeacher = Omit<Teacher, "id">;