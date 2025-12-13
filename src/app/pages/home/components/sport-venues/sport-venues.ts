import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Auth, Sport, Reservations } from '../../../../services';
import { IReservation, ISport, IUser } from '../../../../interfaces';
import { Alert } from '../../../../components/alert/alert';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Validator } from '../../../../helpers';

@Component({
  selector: 'app-sport-venues',
  imports: [ ReactiveFormsModule ],
  templateUrl: './sport-venues.html',
  styleUrl: './sport-venues.scss',
})
export class SportVenues implements OnInit{
  protected sports!:ISport[];
  protected sport!:ISport;
  protected isAdmin!:boolean;
  @Input() user!: IUser;
  @Input() token!: string;
  @Input() alert!: Alert;
  @Output() reservations = new EventEmitter<IReservation[]>();
  @Output() sportsEmit = new EventEmitter<ISport[]>();

  @ViewChild("overlaySportVenues", { static:true }) protected overlaySportVenues!:ElementRef<HTMLElement>;

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly authService: Auth,
    private readonly sportService: Sport,
    private readonly reservationService: Reservations,
  ){}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin;
    this.loadSports();
  }

  protected sportVenueForm = new FormGroup({
    name: new FormControl( "", [ Validators.required, Validators.minLength(3), Validators.pattern(Validator.text)]),
    venue: new FormControl( "", [ Validators.required, Validators.pattern(Validator.address)]),
    available: new FormControl( "", [Validators.required, Validators.pattern(Validator.text)]),
  });


  protected name(): FormControl {
    return this.sportVenueForm.get("name") as FormControl;
  }

  protected venue(): FormControl {
    return this.sportVenueForm.get("venue") as FormControl;
  }

  protected available(): FormControl {
    return this.sportVenueForm.get("available") as FormControl;
  }


  private findSportVenues(){
    this.sportService.findSportVenues(this.authService.getTokenLS!).subscribe(
      ({ data, message }) => {
        if(!data) return this.alert.handleAlertDanger(message);
        this.sports = data;
        this.sportsEmit.emit(data.filter( d => d.available !== false ));
        this.cdRef.detectChanges();
      }
    )
  }

  private findSportVenuesByAvailable(){
    this.sportService.findSportVenuesByAvailable(this.authService.getTokenLS!).subscribe(
      ({ data, message }) => {
        if(!data) return this.alert.handleAlertDanger(message);
        this.sports = data;
        this.sportsEmit.emit(data);
        this.cdRef.detectChanges();
      }
    )
  }

  private loadSports(){
    if( this.authService.isAdmin) return this.findSportVenues();
    return this.findSportVenuesByAvailable();
  }


  protected handleViewSportVenue( sport: ISport = {} as ISport ){
    const isActive = this.overlaySportVenues.nativeElement.classList.contains("overlay__sport__venues__active");
    if( isActive) {
      this.sportVenueForm.reset();
      return this.overlaySportVenues.nativeElement.classList.remove("overlay__sport__venues__active");
    }
    this.overlaySportVenues.nativeElement.classList.add("overlay__sport__venues__active");
    this.loadFormSportVenues(sport);
  }

  protected loadFormSportVenues( sport: ISport ){
    this.sport = sport;
    this.sportVenueForm.patchValue({ ...sport, available: (sport.available === true) ? "enabled": "disabled"});
  }


  protected handleSubmitForm(){
    const data = {
      ...this.sportVenueForm.value,
      available: (this.sportVenueForm.value.available === "enabled"),
      userId: this.user.id,
    } as ISport;


    if( this.sport.id ) {
      data.id = this.sport.id;
      this.sportService.updateSportVenue( this.token, data ).subscribe(
        ({ data, message}) => {
          if(!data) return this.alert.handleAlertDanger(message);
          const sport = this.sports.find(({ id }) => id === data.id);
          Object.assign(sport!, data!);
          this.cdRef.detectChanges();
          return this.alert.handleAlertSuccess(message);
        }
      )
    }else {

      this.sportService.createSportVenue(this.token, data).subscribe(
        ({data, message}) => {
          if(!data) return this.alert.handleAlertDanger(message);
          this.sports.push(data);
          this.sportVenueForm.reset();
          return this.alert.handleAlertSuccess(message);
        }
      )
    }
  }

  protected handleSelectReservation( sport: ISport) {

    this.reservationService.findBySportsVenue( sport.id, this.token).subscribe(
      ({ code, data }) => {
        if(data!.length < 1) this.alert.handleAlertSuccess("no hay reservaciones");
        if( data!.length > 0 ) {
          this.alert.handleAlertSuccess(`espacio deportivo seleccionado: ${ sport.name}`);
          this.reservations.emit(data);
        }
        this.cdRef.detectChanges();
      }
    );
  }
}
