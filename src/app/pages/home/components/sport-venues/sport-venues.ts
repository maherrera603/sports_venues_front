import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Auth, Sport } from '../../../../services';
import { ISport } from '../../../../interfaces';
import { Alert } from '../../../../components/alert/alert';

@Component({
  selector: 'app-sport-venues',
  imports: [],
  templateUrl: './sport-venues.html',
  styleUrl: './sport-venues.scss',
})
export class SportVenues implements OnInit{
  protected sports!:ISport[];
  @Input() alert!: Alert;

  constructor( 
    private readonly cdRef: ChangeDetectorRef,
    private readonly authService: Auth,
    private readonly sportService: Sport,
  ){}

  ngOnInit(): void {
    this.loadSports();
  }


  private findSportVenues(){
    this.sportService.findSportVenues(this.authService.getTokenLS!).subscribe(
      ({ data, message }) => {
        if(!data) return this.alert.handleAlertDanger(message);
        this.sports = data;
        this.cdRef.detectChanges();
      }
    )
  }

  private findSportVenuesByAvailable(){
    this.sportService.findSportVenuesByAvailable(this.authService.getTokenLS!).subscribe(
      ({ data, message }) => {
        if(!data) return this.alert.handleAlertDanger(message);
        this.sports = data;
        this.cdRef.detectChanges();
      }
    )
  }

  private loadSports(){
    if( this.authService.isAdmin) return this.findSportVenues();
    return this.findSportVenuesByAvailable();
  }


  protected handleDeleteSportVenue( id: string ){
    this.alert.handleAlertDanger("espacio eliminado: " + id)
  }


}
