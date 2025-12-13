import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SportVenues } from "./components/sport-venues/sport-venues";
import { Alert } from "../../components/alert/alert";
import { IReservation, ISport, IUser } from '../../interfaces';
import { Auth } from '../../services';
import { Reservations } from './components/reservations/reservations';
import { Reservations as ReservationService } from '../../services';

@Component({
  selector: 'app-home',
  imports: [SportVenues, Reservations, Alert],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{
  @ViewChild("alert", { static: true}) alert!:Alert;
  protected user!: IUser;
  protected token!: string;
  protected sports!: ISport[];
  protected reservations!: IReservation[];

  constructor(
    private readonly authService: Auth,
    private readonly cdRef: ChangeDetectorRef,
    private readonly reservationService: ReservationService
  ){}

  ngOnInit(): void {
    this.user = this.authService.getUserLS!;
    this.token = this.authService.getTokenLS!;
  }


  protected receiveReservations( reservations: IReservation[] ){
    this.reservations = reservations;
    this.cdRef.detectChanges();
  }


  protected receiveSportsVenue( sports: ISport[] ){
    this.sports = sports;
    this.cdRef.detectChanges();
  }

}
