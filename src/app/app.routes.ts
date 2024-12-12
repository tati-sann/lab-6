import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FormComponent} from './form/form.component';
enum RoutePaths {
  HOME = "",
  FORM ="form",
  FORM_EDIT ="form/:id",
}
export const routes: Routes = [
  {
    path: RoutePaths.HOME,
    component: HomeComponent,
  },
  {
    path: RoutePaths.FORM,
    component: FormComponent,
  },
  {
    path: RoutePaths.FORM_EDIT,
    component: FormComponent,
  },
];
