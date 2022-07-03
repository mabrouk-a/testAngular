import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {TestService} from "../test.service";
import {Info} from "../info";


@Component({
  selector: 'app-accueil',
  templateUrl: './displayp.component.html',
  styleUrls: ['./displayp.component.css']
})

export class DisplaypComponent implements OnInit {

  @ViewChild("relance") relanceEl!: ElementRef;
  infos: any;

  constructor(public service: TestService) {
  }

  ngOnInit(): void {
    this.service.getInfos().subscribe((infos) => (this.infos = infos));
  }
  @HostListener("mouseenter") mouseenter() {
    this.relanceEl.nativeElement.style.backgroundColor = "red";
  }

  @HostListener("mouseleave") mouseleave() {
    this.relanceEl.nativeElement.style.backgroundColor = "transparent";
  }

  getInfoData(info: Info) {
    return info.data !== null;
  }

  command(info: Info) {
    this.service.command(info).subscribe((infos) => (this.infos = infos));
  }

  cancel(info: Info) {
    this.service.cancel(info).subscribe((infos) => (this.infos = infos));
  }

  revival(info: Info) {
    this.service.revival(info).subscribe((infos) => (this.infos = infos));
  }

}
