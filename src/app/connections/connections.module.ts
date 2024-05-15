import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectionsRoutingModule } from './connections-routing.module';
import { AddComponent } from "./add/add.component"
import { AntModule } from '../ant.module';
import { InstagramComponent } from './instagram/instagram.component';
import { LinkedinComponent } from './linkedin/linkedin.component';
import { TwitterComponent } from './twitter/twitter.component';
import { PintrestComponent } from './pintrest/pintrest.component';
import { FacebookComponent } from './facebook/facebook.component';



@NgModule({
  declarations: [
    AddComponent,
    InstagramComponent,
    LinkedinComponent,
    TwitterComponent,
    PintrestComponent,
    FacebookComponent
  ],
  imports: [
    CommonModule,
    ConnectionsRoutingModule,
    AntModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ConnectionsModule { }
