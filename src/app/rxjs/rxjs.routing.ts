import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RxjsHomeComponent } from './rxjs-home.component';
import { ShareReplayComponent } from './share-replay.component';
import { RxjsDemo01Component } from './study/demo01.component';
import { RxjsDemo02Component } from './study/demo02.component';
import { RxjsDemo03Component } from './study/demo03.component';
import { RxjsDemo04Component } from './study/demo04.component';
import { RxjsDemo05Component } from './study/demo05.component';
import { RxjsDemo06Component } from './study/demo06.component';
import { RxjsDemo07Component } from './study/demo07.component';
import { RxjsDemo08Component } from './study/demo08.component';
import { RxjsDemo09Component } from './study/demo09.component';

const routes: Routes = [
    { path: '', component: RxjsHomeComponent },
    { path: 'demo01', component: RxjsDemo01Component },
    { path: 'demo02', component: RxjsDemo02Component },
    { path: 'demo03', component: RxjsDemo03Component },
    { path: 'demo04', component: RxjsDemo04Component },
    { path: 'demo05', component: RxjsDemo05Component },
    { path: 'demo06', component: RxjsDemo06Component },
    { path: 'demo07', component: RxjsDemo07Component },
    { path: 'demo08', component: RxjsDemo08Component },
    { path: 'demo09', component: RxjsDemo09Component },
    { path: 'share-replay', component: ShareReplayComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RxjsRoutingModule {}
