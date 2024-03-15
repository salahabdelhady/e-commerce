import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './components/core/guard/auth.guard';

const routes: Routes = [
  //blank
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/blank-layout/blank-layout.component').then(
        (m) => m.BlankLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'Home',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (m) => m.CartComponent
          ),
        title: 'Cart',
      },
      {
        path: 'productDetails/:id',
        loadComponent: () =>
          import('./components/core/service/product.service').then(
            (m) => m.ProductService
          ),
        title: 'Product Details',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'Products',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./components/core/service/wish-list.service').then(
            (m) => m.WishListService
          ),
        title: 'Wish List',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'Brands',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/all-orders/all-orders.component').then(
            (m) => m.AllOrdersComponent
          ),
        title: 'Allorders',
      },
      {
        path: 'forgetpasswoed',
        loadComponent: () =>
          import('./components/core/service/forget-pass.service').then(
            (m) => m.ForgetPassService
          ),
        title: 'Forgot Password',
      },
      {
        path: 'payment/:id',
        loadComponent: () =>
          import('./components/core/service/payment.service').then(
            (m) => m.PaymentService
          ),
        title: 'Payment',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'categorydetails/:id',
        loadComponent: () =>
          import('./components/core/service/category.service').then(
            (m) => m.CategoryService
          ),
        title: 'Categories',
      },
    ],
  },

  //auth
  {
    path: '',
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'Register',
      },
      {
        path: 'forget',
        loadComponent: () =>
          import('./components/core/service/forget-pass.service').then(
            (m) => m.ForgetPassService
          ),
        title: 'Forgot Password',
      },
    ],
  },

  //not found
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
    title: 'Not Found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}