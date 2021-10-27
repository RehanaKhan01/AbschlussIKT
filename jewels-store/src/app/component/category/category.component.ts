import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public categoriesList:any;
  constructor(private api:CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.api.getCategories().subscribe(res=>{ this.categoriesList = res;});
  }

  onClick(catId){
    this.router.navigate(['/products', catId]);
  }

}
