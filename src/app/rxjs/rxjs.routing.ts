import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RxjsHomeComponent } from './rxjs-home.component';
import { ShareReplayComponent } from './share-replay.component';
import { RxjsDemo01Component } from './study/demo01.component';
import { RxjsDemo02Component } from './study/demo02.component';

const routes: Routes = [
    { path: '', component: RxjsHomeComponent },
    { path: 'demo01', component: RxjsDemo01Component },
    { path: 'demo02', component: RxjsDemo02Component },
    { path: 'share-replay', component: ShareReplayComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RxjsRoutingModule {}
