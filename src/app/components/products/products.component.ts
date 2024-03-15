import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { CartService } from '../core/service/cart.service';
import { CutTextPipe } from '../core/pipe/cut-text.pipe';
import { WishListService } from '../core/service/wish-list.service';
import { ProductService } from '../core/service/product.service';
import { Product } from '../core/interface/product';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, CutTextPipe, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private _productS: ProductService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _renderer: Renderer2,
    private _WishListService: WishListService
  ) { }


  product: Product[] = []
  pageSize: number = 0
  currPage: number = 1
  total: number = 0
  wishdata: string[] = []


  ngOnInit(): void {
    this._productS.getProducts().subscribe({
      next: (data:any) => {
        console.log("he", data);
        this.product = data.data
        this.pageSize = data.metadata.limit
        this.currPage = data.metadata.currentPage
        this.total = data.results

      },
      error(err:HttpErrorResponse) {
        console.log(err);
      }
    })

    this._WishListService.getWishList().subscribe({
      next: (data:any) => {
        let newData = data.data.map((item: any) => item.id)
        this.wishdata = newData
        this._WishListService.wishNum.next(data.count)
      }
    }
    )
  }




  addProduct(id: any, ele: HTMLButtonElement) {
    this._renderer.setAttribute(ele, 'disabled', "true")
    this._CartService.addToCart(id).subscribe({
      next: (res:any) => {
        console.log(res);
        this._ToastrService.success(res.message)
        this._renderer.removeAttribute(ele, 'disabled')
        this._CartService.cartNum.next(res.numOfCartItems)

      },
      error: (error:HttpErrorResponse) => {
        console.log(error);
        this._renderer.removeAttribute(ele, 'disabled')

      }
    })


  }

  addwish(prodId: any): void {
    this._WishListService.addToWishList(prodId).subscribe({
      next: (res:any) => {
        console.log(res);
        this.wishdata = res.data;
        this._ToastrService.success(res.message)

        this._WishListService.wishNum.next(res.data.length)


      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
      }
    })
  }
  removeWish(prodId: any): void {
    this._WishListService.removeFrWishList(prodId).subscribe({
      next: (res:any) => {
        console.log(res);
        this.wishdata = res.data;
        this._ToastrService.success(res.message)
        this._WishListService.wishNum.next(res.data.length)

      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
      }
    })





  }
  pageChanged(event: any) {
    console.log(event);
    this._productS.getProducts(event).subscribe({
      next:(data:any) => {
        console.log(data.data);
        this.product = data.data
        this.pageSize = data.metadata.limit
        this.currPage = data.metadata.currentPage
        this.total = data.results
        window.scrollTo(0, 0);
      },
      error:(err:HttpErrorResponse)=> {
        console.log(err);
      }
    })

  }



}