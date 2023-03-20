import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      { path: '', loadChildren: () => import('./index/index.module').then(m => m.IndexModule) },
      { path: 'index', loadChildren: () => import('./index/index.module').then(m => m.IndexModule) },
      { path: 'blog-single', loadChildren: () => import('./blog-single/blog-single.module').then(m => m.BlogSingleModule) },
      { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
      { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
      { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
      { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
      { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
      { path: 'product-details', loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule) },
      { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
      { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
      { path: 'filter', loadChildren: () => import('./filter/filter.module').then(m => m.FilterModule) },
      { path: 'addressselect', loadChildren: () => import('./addressselect/addressselect.module').then(m => m.AddressselectModule) },
      { path: 'orderdetail', loadChildren: () => import('./orderdetail/orderdetail.module').then(m => m.OrderdetailModule) },
      
      { path: 'TermsofUse', loadChildren: () => import('./termsof-use/termsof-use.module').then(m => m.TermsofUseModule) },
      { path: 'PrivecyPolicy', loadChildren: () => import('./privecy-policy/privecy-policy.module').then(m => m.PrivecyPolicyModule) },
      { path: 'RefundPolicy', loadChildren: () => import('./refund-policy/refund-policy.module').then(m => m.RefundPolicyModule) },
      
  { path: 'ContactUs', loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule) },
  { path: 'faqs', loadChildren: () => import('./faqs/faqs.module').then(m => m.FaqsModule) },
]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
