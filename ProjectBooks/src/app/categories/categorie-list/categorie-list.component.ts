import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/shared/services/categorie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit {

  categories : Observable<any[]>

  constructor(private categorieService : CategorieService) { }

  ngOnInit() {
    this.categories = this.categorieService.getCategories();
  }

  onRemove(categorieId)
  {
    console.log(categorieId);
    this.categorieService.removeCategorie(categorieId).subscribe(
      (res) => {
        this.categories = this.categorieService.getCategories();
    })
  }

}
