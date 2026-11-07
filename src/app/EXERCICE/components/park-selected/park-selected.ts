import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Park } from '../../models/park';
import { ParkService } from '../../services/park-service';
import { DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  imports: [UpperCasePipe, RouterLink, DatePipe],
  selector: 'app-park-selected',
  styleUrl: './park-selected.css',
  templateUrl: './park-selected.html',
})
export class ParkSelected implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly parkService = inject(ParkService);
  park = signal<Park | undefined>(undefined);
  ngOnInit(): void {
    let parkId = this.activatedRoute.snapshot.paramMap.get('idPark');
    console.log(parkId)
    if (parkId)
      this.parkService.getParkById(parkId).subscribe(
        parc => this.park.set(parc))

  }
}
