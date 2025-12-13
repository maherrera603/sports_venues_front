import { ISport } from "./ISport";
import { IUser } from "./IUser";

export interface IReservation{
    id: string,
    date_reservation: string,
    status: string,
    hours: number,
    hour_initial: string,
    hour_finish: string,
    sports_venue: ISport | string,
    confirm_reservation: boolean,
    to_user: IUser,
    user: string
}

export type DReservation = Omit<IReservation, "id" | "status" | "confirm_reservation" | "to_user" | "user">;
