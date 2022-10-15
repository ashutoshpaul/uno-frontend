import { transition, trigger, query, style, animate, group } from "@angular/animations";

const DURATION: string = '1s';

export const sliderTrigger = trigger('slider', [
    transition('right => left', [
        query(':leave', [
            style({
                position: "absolute",
                top: 0,
                right: "0%",
                width: "100%",
            }),
        ], { optional: true}),
        query(':enter', [
            style({ 
                position: "absolute", 
                top: 0, 
                right: "0%",
                width: "0%",
            }),
        ], { optional: true}),
        group([
            query(':leave', [
                animate(`${DURATION} ease`, style({ right: "100%" })),
            ], { optional: true}),
            query(':enter', [
                animate(`${DURATION} ease`, style({ right: "100%" })),
            ], { optional: true}),
        ]),
    ]),
    transition('left => right', [
        query(':leave', [
            style({
                position: "absolute",
                top: 0,
                left: "0%",
                width: "100%",
            }),
        ], { optional: true}),
        query(':enter', [
            style({ 
                position: "absolute", 
                top: 0, 
                left: "-100%",
                width: "0%",
            }),
        ], { optional: true}),
        group([
            query(':leave', [
                animate(`${DURATION} ease`, style({ left: "100%" })),
            ], { optional: true}),
            query(':enter', [
                animate(`${DURATION} ease`, style({ left: "0%" })),
            ], { optional: true}),
        ]),
    ]),
    transition('left => game', [
        group([
            query(':leave', [
                query('main', [
                    style({
                        opacity: "1",
                    }),
                ]),
                query('main', [
                    animate(`1s linear`, style({ 
                        opacity: '0'
                    })),
                ]),
            ], { optional: true }),
            query(':enter', [
                query('mat-drawer-container', [
                    style({
                        opacity: "0",
                    }),
                ]),
                query('mat-drawer-container', [
                    animate(`1.5s 1s ease-in-out`, style({ 
                        opacity: "1",
                    })),
                ]),
            ]),
        ]),
    ]),
]);