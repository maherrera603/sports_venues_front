import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Auth} from '../../services';
import {isPlatformBrowser} from '@angular/common';


@Component({
  selector: 'app-activate-account',
  imports: [ RouterLink ],
  templateUrl: './activate-account.html',
  styleUrl: './activate-account.scss',
})
export class ActivateAccount implements OnInit {
  @ViewChild("success", { static: true }) protected success!: ElementRef<HTMLElement>;
  @ViewChild("danger", { static: true }) protected danger!:ElementRef<HTMLElement>;

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private readonly authService: Auth,
    @Inject(PLATFORM_ID) private readonly platformId:Object,
  ){}

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.getParams();
      this.cdRef.detectChanges();
    }
  }

  private getParams(){
    this.route.params.subscribe( ({ token }) => this.activateAccount(token));
  }

  private activateAccount( token: string ){
    this.authService.activateAccount(token).subscribe(
      ({code}) => {
        (code === 200) ? this.loadSuccess() : this.loadDanger();
      }
    );
  }

  private loadSuccess(){
      this.success.nativeElement.classList.add(`content__active__body__active` );
  }

  private loadDanger(){
      this.danger.nativeElement.classList.add("content__active__body__active");
  }
}
