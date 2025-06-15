import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  OnInit,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  BehaviorSubject,
  Subject,
  interval,
  switchMap
} from 'rxjs';
import { Banner } from '../../model/banner.i';
import { BannerService } from '../../services/banner.service';
import { SvgLeft, SvgRight } from '../../svg';

type Slide = 'forward' | 'back';

@Component({
  selector: 'app-banner-slider',
  standalone: true,
  imports: [CommonModule, RouterLink, SvgLeft, SvgRight],
  templateUrl: './banner-slider.component.html',
  styleUrls: ['./banner-slider.component.scss'],
})
export class BannerSliderComponent implements OnInit {
  banners = signal<Banner[]>([]);
  currentSlideIndex = signal(0);
  private readonly intervalTime = 8000;

  clickEvents$ = new BehaviorSubject<Slide>('forward');
  slideInterval$$ = new Subject<void>();

  constructor(
    private bannerService: BannerService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.loadBanners();
  }

  slide(option: Slide): void {
    switch (option) {
      case 'forward':
        this.nextSlide();
        break;
      case 'back':
        this.prevSlide();
        break;
    }
  }

  clickSlide(option: Slide) {
    this.slideInterval$$.next();
    this.slide(option);
  }

  loadBanners(): void {
    this.bannerService.getBanners$().subscribe((banners) => {
      this.banners.set(banners);
      this.startAutoSlide();

      if (
        this.banners().length > 0 &&
        this.currentSlideIndex() >= this.banners().length
      ) {
        this.currentSlideIndex.set(0);
      }
    });
  }

  startAutoSlide(): void {
    this.slideInterval$$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() =>
          interval(this.intervalTime).pipe(takeUntilDestroyed(this.destroyRef))
        ),
      )
      .subscribe(() => {
        this.slide('forward');
      });

    this.slideInterval$$.next();
  }

  nextSlide(): void {
    if (this.banners().length === 0) return;
    this.currentSlideIndex.set(
      (this.currentSlideIndex() + 1) % this.banners().length
    );
  }

  prevSlide(): void {
    if (this.banners().length === 0) return;
    this.currentSlideIndex.set(
      (this.currentSlideIndex() - 1 + this.banners().length) %
        this.banners().length
    );
  }

  goToSlide(index: number): void {
    if (index < 0 || index >= this.banners().length) return;
    this.slideInterval$$.next();
    this.currentSlideIndex.set(index);
    this.startAutoSlide();
  }
}
