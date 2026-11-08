export class UpdateClassroomDTO {

    private constructor(
        public readonly name: string,
        public readonly building: string,
        public readonly capacity: number,
        public readonly classroom_type: string,
        public readonly status: boolean
    ) {}

    static create(
        object: { [key: string]: any },
    ): [string | undefined, UpdateClassroomDTO?]{
        const {
            name,
            building,
            capacity,
            classroom_type,
            status
        } = object;

        if(!name) return ["Missing name"];
        if(!building) return ["Missing building"];
        if(!capacity) return ["Missing capacity"];
        if(!classroom_type) return ["Missing classroom_type"];
        if(typeof status !== "boolean") return ["Missing or invalid status"];

        if(name.length > 100)
            return ["name is too large, max length is 100 characters"];

        if(building.length > 100)
            return ["building is too large, max length is 100 characters"];

        if(classroom_type.length > 50)
            return ["classroom_type is too large, max length is 50 characters"];

        if(typeof capacity !== "number" || capacity < 1 || capacity > 200)
            return ["Invalid capacity, must be a number between 1 and 200"];

        return [
            undefined,
            new UpdateClassroomDTO(
                name,
                building,
                capacity,
                classroom_type,
                status
            )
        ];

    }

}