export interface Alumno {
    id?: number;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    curso: string;
    email: string;
    activo: boolean;
    alumnoId?:number;
}
