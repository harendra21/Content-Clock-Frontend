import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { FacebookComponent } from './facebook/facebook.component';
import { InstagramComponent } from './instagram/instagram.component';
import { LinkedinComponent } from './linkedin/linkedin.component';
import { TwitterComponent } from './twitter/twitter.component';
import { PintrestComponent } from './pintrest/pintrest.component';

const routes: Routes = [{
    path: "", component: AddComponent
  },{
    path: "facebook", component: FacebookComponent
  },{
    path: "instagram", component: InstagramComponent
  },{
    path: "linkedin", component: LinkedinComponent
  },{
    path: "twitter", component: TwitterComponent
  },{
    path: "pintrest", component: PintrestComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionsRoutingModule { }
