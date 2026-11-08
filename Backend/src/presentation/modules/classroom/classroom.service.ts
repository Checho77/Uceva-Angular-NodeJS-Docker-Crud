import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { Classroom, CreateClassroom, UpdateClassroom } from "../../../domain/interfaces/classroom.interface";

export class ClassroomService {

    public async getAllClassrooms(): Promise<Classroom[]> {
        const sql = `SELECT * FROM classrooms;`;
        const classrooms = await pool.query(sql);
        return classrooms.rows;
    }

    public async getClassroomById(id: number): Promise<Classroom | null> {
        const sql = `SELECT * FROM classrooms WHERE id = $1;`;
        const classroom = (await pool.query<Classroom>(sql, [id])).rows[0];
        return classroom ?? null;
    }

    public async createClassroom(classroom: CreateClassroom): Promise<Classroom> {
        const sql = `
            INSERT INTO classrooms (
                name,
                building,
                capacity,
                classroom_type,
                status
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [
            classroom.name,
            classroom.building,
            classroom.capacity,
            classroom.classroom_type,
            classroom.status
        ];
        const classroomCreated = (await pool.query<Classroom>(sql, values)).rows[0];
        if(!classroomCreated) {
            throw CustomError.internalServer(`No se pudo crear el salon`);
        }
        return classroomCreated;
    }

    public async updateClassroom(
        id: number,
        classroom: UpdateClassroom
    ): Promise<Classroom> {
        const existingClassroom = await this.getClassroomById(id);
        if(!existingClassroom) {
            throw CustomError.internalServer(`No existe un salon con ese id`);
        }
        const sql = `
            UPDATE classrooms
            SET
                name = $1,
                building = $2,
                capacity = $3,
                classroom_type = $4,
                status = $5
            WHERE id = $6
            RETURNING *;
        `;
        const values = [
            classroom.name,
            classroom.building,
            classroom.capacity,
            classroom.classroom_type,
            classroom.status,
            id,
        ];
        const classroomUpdated = (await pool.query<Classroom>(sql, values)).rows[0];
        if(!classroomUpdated) {
            throw CustomError.internalServer(`No se pudo actualizar el salon`);
        }
        return classroomUpdated;
    }

    public async deleteClassroom(id: number): Promise<boolean> {
        const existingClassroom = await this.getClassroomById(id);
        if(!existingClassroom) {
            throw CustomError.internalServer(`No existe un salon con ese id`);
        }
        const sql = `
            DELETE FROM classrooms
            WHERE id = $1
            RETURNING id;
        `;
        const classroomDeleted = await pool.query(sql, [id]);
        if(!classroomDeleted) {
            throw CustomError.internalServer(`No se pudo eliminar el salon`);
        }
        return classroomDeleted.rowCount !== null && classroomDeleted.rowCount > 0;
    }

}