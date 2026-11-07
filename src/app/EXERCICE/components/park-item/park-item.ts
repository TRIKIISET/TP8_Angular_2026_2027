import { Component, inject, input } from '@angular/core';
import { Park } from '../../models/park';
import { RouterLink } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { ParkService } from '../../services/park-service';

@Component({
  imports: [RouterLink, UpperCasePipe, DatePipe],
  selector: 'app-park-item',
  styleUrl: './park-item.css',
  templateUrl: './park-item.html',
})
export class ParkItem {
  park = input.required<Park>();
  private readonly parkService: ParkService = inject(ParkService);
  onUpdateLikes(p: Park) {
    let park ={...p, nbLikes:p.nbLikes+1}
    this.parkService.updatePark(park).subscribe()
  }
  onDeletePark(id: string) {
    this.parkService.deletePark(id).subscribe()
  }
}
