import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-share',
    template: `
        <h2>Share Components</h2>
        <ul class="heroes">
            <li>
                <a routerLink="./from">
                    <span class="badge">01</span>Form
                </a>
            </li>
            <li>
                <a routerLink="./tooltip">
                    <span class="badge">02</span>Tooltip
                </a>
            </li>
            <li>
                <a routerLink="./multiselect-dropdown">
                    <span class="badge">03</span>Multiselect-Dropdown
                </a>
            </li>
            <li>
                <a routerLink="./progress">
                    <span class="badge">04</span>Progress
                </a>
            </li>
            <li>
                <a routerLink="./carousel">
                    <span class="badge">05</span>Carousel
                </a>
            </li>
            <li>
                <a routerLink="./divider">
                    <span class="badge">06</span>Divider
                </a>
            </li>
            <li>
                <a routerLink="./back-top">
                    <span class="badge">07</span>Back-Top
                </a>
            </li>
            <li>
                <a routerLink="./card">
                    <span class="badge">08</span>Card
                </a>
            </li>
        </ul>
    `,
    styleUrls: ['./share.scss']
})
export class ShareComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
