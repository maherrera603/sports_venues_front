import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DReservation, IReservation, ISport, IUser } from '../../../../interfaces';
import { Alert } from '../../../../components/alert/alert';
import { Auth, Reservations as ReservationsService } from '../../../../services';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ConvertHour, Validator} from '../../../../helpers';



@Component({
  selector: 'app-reservations',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './reservations.html',
  styleUrl: './reservations.scss',
})
export class Reservations implements OnInit{
  @Input() user!: IUser;
  @Input() token!: string;
  @Input() alert!: Alert;
  @Input() reservations!: IReservation[];
  @Input() sports!: ISport[];
  @ViewChild("overlayReservation", { static: true }) protected overlayReservation!: ElementRef<HTMLElement>;
  private sport!:ISport;
  private reservation!: IReservation;
  protected isEdit:boolean = false;


  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly authService: Auth,
    private readonly reservationService: ReservationsService,
  ){}

  ngOnInit(): void {
    this.handleLoadReservations();
  }

  protected get isAdmin():boolean {
    return this.authService.isAdmin;
  }

  protected reservationForm = new FormGroup({
    date_reservation: new FormControl("", [ Validators.required ]),
    hours: new FormControl("", [ Validators.required ]),
    hour_initial: new FormControl("", [ Validators.required ]),
    hour_finish: new FormControl("", [ Validators.required ]),
    sports_venue: new FormControl( "", [ Validators.required ] ),
    status: new FormControl("", [ Validators.required, Validators.pattern(Validator.text) ])
  });


  protected get date_reservation(): FormControl {
    return this.reservationForm.get("date_reservation") as FormControl;
  }

  protected get hours(): FormControl {
    return this.reservationForm.get("hours") as FormControl;
  }

  protected get hour_initial(): FormControl {
    return this.reservationForm.get("hour_initial") as FormControl;
  }

  protected get hour_finish(): FormControl {
    return this.reservationForm.get("hour_finish") as FormControl;
  }

  protected get sports_venue(): FormControl {
    return this.reservationForm.get("sports_venue") as FormControl;
  }

  protected get status(): FormControl {
    return this.reservationForm.get("status") as FormControl;
  }

  private find(){
    this.reservationService.find( this.token ).subscribe(
      ({ code, data }) => {
        if(!data) return this.alert.handleAlertSuccess("no hay reservaciones aun");
        console.log( data );
        this.reservations = data || [];
        this.cdRef.detectChanges();
      }
    );
  }

  private findByUser(){
    this.reservationService.findByUser( this.token ).subscribe(
      ({ code, data }) => {
        this.reservations = data || [];
        this.cdRef.detectChanges();
      }
    );
  }

  protected handleLoadReservations(){
    if(this.authService.isAdmin) return this.find();
    return this.findByUser();
  }

  protected  getStatus( status: string): string{
    return status === "confirm" ? "confirmada": "pendiente";
  }


  protected handleOpenOverlay( isEdit: boolean = true ){
    this.isEdit = isEdit;
    const isContain = this.overlayReservation.nativeElement.classList.contains("overlay__reservations__active");
    if( isContain ) return this.overlayReservation.nativeElement.classList.remove("overlay__reservations__active");
    return this.overlayReservation.nativeElement.classList.add("overlay__reservations__active")
  }

  protected handleSubmit(){
    const data = {
      ...this.reservationForm.value,
      hours: Number(this.reservationForm.value.hours),
      hour_initial: ConvertHour.convertHour(this.reservationForm.value.hour_initial!.toString()),
      hour_finish: ConvertHour.convertHour(this.reservationForm.value.hour_finish!.toString())
    } as DReservation;

    if( this.reservation.id ) {
      this.reservationService.update( this.token, this.reservation.id, data )
      .subscribe(
        ({ data, message }) => {
          if(!data) return this.alert.handleAlertDanger(message);
          const reservation = this.reservations.find(reservation => reservation.id === data.id);
          Object.assign(reservation!, data);
          this.reservationForm.reset();
          this.handleOpenOverlay();
          this.cdRef.detectChanges();
          return this.alert.handleAlertSuccess(message);
        }
      );
    }else{
      this.reservationService.create( this.token, data )
      .subscribe(
        ({ data, message }) => {
          if(!data) return this.alert.handleAlertDanger(message);
          this.reservations.push( data );
          this.reservationForm.reset();
          this.handleOpenOverlay();
          this.cdRef.detectChanges();
          return this.alert.handleAlertSuccess(message);
        }
      );
    }
  }

  protected handleLoadData(reservation:IReservation = {} as IReservation){
    const sport = reservation.sports_venue as ISport;
    this.reservation = reservation;
    this.reservationForm.patchValue({
      date_reservation: reservation.date_reservation,
      hours: reservation.hours.toString(),
      hour_initial: ConvertHour.convertHourBack(reservation.hour_initial),
      hour_finish: ConvertHour.convertHourBack(reservation.hour_finish),
      sports_venue: sport.id,
      status: reservation.status
    });
    this.handleOpenOverlay(!this.authService.isUser);
  }

}
