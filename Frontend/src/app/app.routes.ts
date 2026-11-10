
import { Routes } from '@angular/router';

import { CreateCourse } from './modules/courses/pages/create-course/create-course';
import { DetailCourse } from './modules/courses/pages/detail-course/detail-course';
import { ListCourses } from './modules/courses/pages/list-courses/list-courses';
import { UpdateCourse } from './modules/courses/pages/update-course/update-course';

import { CreateStudent } from './modules/students/pages/create-student/create-student';
import { DetailStudent } from './modules/students/pages/detail-student/detail-student';
import { ListStudents } from './modules/students/pages/list-students/list-students';
import { UpdateStudent } from './modules/students/pages/update-student/update-student';

import { ListTeachers } from './modules/teachers/pages/list-teachers/list-teachers';
import { CreateTeacher } from './modules/teachers/pages/create-teacher/create-teacher';
import { DetailTeacher } from './modules/teachers/pages/detail-teacher/detail-teacher';
import { UpdateTeacher } from './modules/teachers/pages/update-teacher/update-teacher';

import { ListClassrooms } from './modules/classrooms/pages/list-classrooms/list-classrooms';
import { CreateClassroom } from './modules/classrooms/pages/create-classroom/create-classroom';
import { DetailClassroom } from './modules/classrooms/pages/detail-classroom/detail-classroom';
import { UpdateClassroom } from './modules/classrooms/pages/update-classroom/update-classroom';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'students',
        pathMatch: 'full'
    },
    {
        path: 'students',
        children: [
            { path: 'list', component: ListStudents },
            { path: 'create', component: CreateStudent },
            { path: 'update/:id', component: UpdateStudent },
            { path: 'detail/:id', component: DetailStudent },
            { path: '**', redirectTo: 'list' }
        ]
    },
    {
        path: 'teachers',
        children: [
            { path: 'list', component: ListTeachers },
            { path: 'create', component: CreateTeacher },
            { path: 'update/:id', component: UpdateTeacher },
            { path: 'detail/:id', component: DetailTeacher },
            { path: '**', redirectTo: 'list' }
        ]
    },
    {
        path: 'classrooms',
        children: [
            { path: 'list', component: ListClassrooms },
            { path: 'create', component: CreateClassroom },
            { path: 'update/:id', component: UpdateClassroom },
            { path: 'detail/:id', component: DetailClassroom },
            { path: '**', redirectTo: 'list' }
        ]
    },
    {
        path: 'courses',
        children: [
            { path: 'list', component: ListCourses },
            { path: 'create', component: CreateCourse },
            { path: 'update/:id', component: UpdateCourse },
            { path: 'detail/:id', component: DetailCourse },
            { path: '**', redirectTo: 'list' }
        ]
    }
];
