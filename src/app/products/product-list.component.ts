import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  _listFilter: string;
  filteredProducts: IProduct[];
  products: IProduct[] = [];
  errorMessage: string

  constructor(private productService: ProductService) {
  }  
  
  private get listFilter(): string {
    return this._listFilter;
  }

  private set listFilter(value:string) {
    const { listFilter } = this;
    this._listFilter = value;
    this.filteredProducts = listFilter ? this.performFilter(listFilter): this.products
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  };

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products ;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
  };

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }  
  
  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message
  }
}
