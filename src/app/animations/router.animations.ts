import { transition, trigger, query, style, animate, group, sequence } from "@angular/animations";

export const sliderTrigger = trigger('slider', [
    transition('fromRight => toLeft', slideTo('right')),
]);

function slideTo(direction: 'right' | 'left'): any {
    return [
        query(':leave', [
            style({
                position: "absolute",
                top: 0,
                [direction]: "0%",
                width: "100%",
            }),
        ], { optional: true}),
        query(':enter', [
            style({ 
                position: "absolute", 
                top: 0, 
                [direction]: "0%",
                width: "0%",
            }),
        ], { optional: true}),
        group([
            query(':leave', [
                animate('1s ease', style({ [direction]: "100%" })),
            ], { optional: true}),
            query(':enter', [
                animate('1s ease', style({ [direction]: "100%" })),
            ], { optional: true}),
        ]),
    ];
}