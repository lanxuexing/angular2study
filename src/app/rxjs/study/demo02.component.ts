import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, from, fromEvent, fromEventPattern, empty, never, throwError, interval, timer, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo02',
    template: `
        <h3>Rxjs Demo02 To Study! -- Observable的建立</h3>
        <button (click)="createHandler()">create</button>
        <button class="mgLeft" (click)="ofHandler()">of</button>
        <button class="mgLeft" (click)="fromHandler()">from</button>
        <button class="mgLeft" (click)="fromEventHandler()">fromEvent</button>
        <button class="mgLeft" (click)="fromEventPatternHandler()">fromEventPattern</button>
        <button class="mgLeft" (click)="emptyHandler()">empty</button>
        <button class="mgLeft" (click)="neverHandler()">never</button>
        <button class="mgLeft" (click)="throwErrorHandler()">throwError</button>
        <button class="mgLeft" (click)="coustomTimerHandler()">自定义定时器</button>
        <button class="mgLeft" (click)="intervalHandler()">interval</button>
        <button class="mgLeft" (click)="timerOfTimeHandler()">timer【时间】</button>
        <button class="mgLeft" (click)="timerOfDateHandler()">timer【时期】</button>
        <button class="mgLeft" id="btn">Button-Click</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo02Component implements OnInit, OnDestroy {
    mySubscription: Subscription;
    mySubscription2: Subscription;
    syncSubscription: Subscription;
    existSubscription: Subscription;
    promiseSubscription: Subscription;
    fromEventSubscription: Subscription;
    fromEventPatternSubscription: Subscription;
    emptySubscription: Subscription;
    neverSubscription: Subscription;
    throwErrorSubscription: Subscription;
    sourceSubscription: Subscription;
    intervalSubscription: Subscription;
    timerSubscription: Subscription;
    timerFromDateSubscription: Subscription;
    onceTimerSubscription: Subscription;

    constructor() { }

    ngOnInit(): void {
        // timer Observable延时定时器, 延迟毫秒执行一次之后取消订阅
        const onceTimerObservable = timer(3000);
        this.onceTimerSubscription = onceTimerObservable.subscribe({
            next: (value) => { console.log('======timer Observable延时定时器, 延迟毫秒执行一次之后取消订阅: ', value); },
            error: (error) => { console.log('======timer Observable延时定时器, 延迟毫秒执行一次之后取消订阅---Error: ', error); },
            complete: () => { console.log('======timer Observable延时定时器, 延迟毫秒执行一次之后取消订阅: complete'); }
        });
    }

    createHandler() {
        // Observable的创建
        const myObservable = Observable.create((observer) => {
            observer.next('Jerry');
            observer.next('Anna');
            setTimeout(() => {
                observer.next('30 days rxjs');
            }, 2000);
            observer.complete();
            observer.next('not work ?');
        });

        // 第一种写法
        console.log('===1====start');
        this.mySubscription = myObservable.subscribe(value => {
            console.log('1. Observable的创建: ', value);
        });
        console.log('===1====end');

        // 第二种写法
        const innerObserver = {
            next: (value) => { console.log('2. Observable的创建: ', value); },
            error: (error) => { console.log('2. Error', error); },
            complete: () => { console.log('2. complete'); }
        };
        console.log('===2====start');
        this.mySubscription2 = myObservable.subscribe(innerObserver);
        console.log('===2====end');
    }

    ofHandler() {
        // 一次同步传递几个值
        const syncObservable = of('Jerry', 'Anna');
        this.syncSubscription = syncObservable.subscribe({
            next: (value) => { console.log('=====一次同步传递值: ', value); },
            error: (error) => { console.log('=====一次同步传递值--Error: ', error); },
            complete: () => { console.log('=====一次同步传递值: complete'); }
        });
    }

    fromHandler() {
        // 从已经存在的阵列产生Observablè
        const existArray = ['Jerry', 'Anna', 2016, 2017, '30 days'];
        const existString = '铁人赛';
        const existObservable = from(existArray);
        this.existSubscription = existObservable.subscribe({
            next: (value) => { console.log('======从已存在的阵列生成Observable: ', value); },
            error: (error) => { console.log('======从已存在的阵列生成Observable---Error: ', error); },
            complete: () => { console.log('======从已存在的阵列生成Observable: complete'); }
        });

        // 来自Promise的Observable
        const promiseObservable = from(new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Hello RXJS!');
            }, 3000);
        }));
        this.promiseSubscription = promiseObservable.subscribe({
            next: (value) => { console.log('======来自Promise的Observable: ', value); },
            error: (error) => { console.log('======来自Promise的Observable---Error: ', error); },
            complete: () => { console.log('======来自Promise的Observable: complete'); }
        });
    }

    fromEventHandler() {
        // FromEvent Observable
        const fromEventObservable = fromEvent(document.getElementById('btn'), 'click');
        this.fromEventSubscription = fromEventObservable.subscribe({
            next: (value) => { console.log('======FromEvent Observable: ', value); },
            error: (error) => { console.log('======FromEvent Observable---Error: ', error); },
            complete: () => { console.log('======FromEvent Observable: complete'); }
        });
    }

    fromEventPatternHandler() {
        // FromEventPattern Observable
        const producer = new Producer();
        const fromEventPatternObservable = fromEventPattern(
            (handler) => producer.addEventListener(handler),
            (handler) => producer.removeEventListener(handler)
        );
        this.fromEventPatternSubscription = fromEventPatternObservable.subscribe({
            next: (value) => { console.log('======FromEventPattern Observable: ', value); },
            error: (error) => { console.log('======FromEventPattern Observable---Error: ', error); },
            complete: () => { console.log('======FromEventPattern Observable: complete'); }
        });
        producer.notify('Hello! Can you hear me?');
    }

    emptyHandler() {
        // empty Observable
        const emptyObservable = empty();
        this.emptySubscription = emptyObservable.subscribe({
            next: (value) => { console.log('======empty Observable: ', value); },
            error: (error) => { console.log('======empty Observable---Error: ', error); },
            complete: () => { console.log('======empty Observable: complete'); }
        });
    }

    neverHandler() {
        // never Observable
        const neverObservable = never();
        this.neverSubscription = neverObservable.subscribe({
            next: (value) => { console.log('======never Observable: ', value); },
            error: (error) => { console.log('======never Observable---Error: ', error); },
            complete: () => { console.log('======never Observable: complete'); }
        });
    }

    throwErrorHandler() {
        // throwError Observable
        const throwErrorObservable = throwError('Oop!');
        this.throwErrorSubscription = throwErrorObservable.subscribe({
            next: (value) => { console.log('======throwError Observable: ', value); },
            error: (error) => { console.log('======throwError Observable---Error: ', error); },
            complete: () => { console.log('======throwError Observable: complete'); }
        });
    }

    coustomTimerHandler() {
        // 自己实现一个定时器interval Observable
        const source = Observable.create(observer => {
            let i = 0;
            const intervalTimer = setInterval(() => {
                observer.next(i++);
                if (i > 4) {
                    clearInterval(intervalTimer);
                }
            }, 1000);
        });
        this.sourceSubscription = source.subscribe({
            next: (value) => { console.log('======自己实现一个定时器interval Observable: ', value); },
            error: (error) => { console.log('======自己实现一个定时器interval Observable---Error: ', error); },
            complete: () => { console.log('======自己实现一个定时器interval Observable: complete'); }
        });
    }

    intervalHandler() {
        // Rxjs版本的interval Observable
        const intervalObservable = interval(1000).pipe(take(4));
        this.intervalSubscription = intervalObservable.subscribe({
            next: (value) => { console.log('======Rxjs版本的interval Observable: ', value); },
            error: (error) => { console.log('======Rxjs版本的interval Observable---Error: ', error); },
            complete: () => { console.log('======Rxjs版本的interval Observable: complete'); }
        });
    }

    timerOfTimeHandler() {
        // timer Observable延时定时器
        const timerObservable = timer(1000, 5000).pipe(take(3));
        this.timerSubscription = timerObservable.subscribe({
            next: (value) => { console.log('======timer Observable延时定时器: ', value); },
            error: (error) => { console.log('======timer Observable延时定时器---Error: ', error); },
            complete: () => { console.log('======timer Observable延时定时器: complete'); }
        });
    }

    timerOfDateHandler() {
        // timer Observable延时定时器【指定日期之后开始执行】
        const timerFromDateObservable = timer(new Date('2019-05-26 23:22:00')).pipe(take(1));
        this.timerFromDateSubscription = timerFromDateObservable.subscribe({
            next: (value) => { console.log('======timer Observable延时定时器【指定日期之后开始执行】: ', value); },
            error: (error) => { console.log('======timer Observable延时定时器【指定日期之后开始执行】---Error: ', error); },
            complete: () => { console.log('======timer Observable延时定时器【指定日期之后开始执行】: complete'); }
        });
    }

    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
        if (this.mySubscription2) {
            this.mySubscription2.unsubscribe();
        }
        if (this.syncSubscription) {
            this.syncSubscription.unsubscribe();
        }
        if (this.existSubscription) {
            this.existSubscription.unsubscribe();
        }
        if (this.promiseSubscription) {
            this.promiseSubscription.unsubscribe();
        }
        if (this.fromEventSubscription) {
            this.fromEventSubscription.unsubscribe();
        }
        if (this.fromEventPatternSubscription) {
            this.fromEventPatternSubscription.unsubscribe();
        }
        if (this.emptySubscription) {
            this.emptySubscription.unsubscribe();
        }
        if (this.neverSubscription) {
            this.neverSubscription.unsubscribe();
        }
        if (this.throwErrorSubscription) {
            this.throwErrorSubscription.unsubscribe();
        }
        if (this.sourceSubscription) {
            this.sourceSubscription.unsubscribe();
        }
        if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
        }
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
        if (this.timerFromDateSubscription) {
            this.timerFromDateSubscription.unsubscribe();
        }
        if (this.onceTimerSubscription) {
            this.onceTimerSubscription.unsubscribe();
        }
    }
}

// 自定义Observable【类事件】
class Producer {
    listener: any[];

    constructor() {
        this.listener = [];
    }

    addEventListener(listener) {
        if (typeof listener === 'function') {
            this.listener.push(listener);
        } else {
            throw new Error('listener 必须是 function!');
        }
    }

    removeEventListener(listener) {
        this.listener.splice(this.listener.indexOf(listener), 1);
    }

    notify(message) {
        this.listener.forEach(listener => {
            listener(message);
        });
    }
}
