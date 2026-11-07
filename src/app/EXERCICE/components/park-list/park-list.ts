import { Component, inject, OnInit, Signal } from '@angular/core';
import { ParkService } from '../../services/park-service';
import { Park } from '../../models/park';
import { RouterLink } from '@angular/router';
import { ParkItem } from '../park-item/park-item';

@Component({
  imports: [RouterLink, ParkItem],
  selector: 'app-park-list',
  styleUrl: './park-list.css',
  templateUrl: './park-list.html',
})
export class ParkList implements OnInit {

  private readonly parkService: ParkService = inject(ParkService);
  parks: Signal<Park[]> = this.parkService.parks;
  ngOnInit(): void {
    this.parkService.getParks().subscribe();
  }
  onUpdateLikes(p: Park) {
    let park = { ...p, nbLikes: p.nbLikes + 1 }
    this.parkService.updatePark(park).subscribe()
  }
  onDeletePark(id: string) {
    this.parkService.deletePark(id).subscribe()
  }

}
