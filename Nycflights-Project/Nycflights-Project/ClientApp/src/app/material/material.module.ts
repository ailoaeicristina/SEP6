import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';

const MaterialComponents = [
    MatSidenavModule,
    MatExpansionModule
];

@NgModule({
    imports: [ MaterialComponents],
    exports: [ MaterialComponents],
})
export class MaterialModule {}
