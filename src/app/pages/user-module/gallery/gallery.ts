import { NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ImageLightbox } from '../../../dialogs/image-lightbox/image-lightbox';
import { GalleryItem } from '../../../model/site.models';
import { MotionService } from '../../../service/motion.service';
import { SiteContentService } from '../../../service/site-content.service';
import { CtaStrip } from '../../../shared/cta-strip/cta-strip';
import { PageHero } from '../../../shared/page-hero/page-hero';
import { SectionHeading } from '../../../shared/section-heading/section-heading';

type GalleryCategory = 'All' | GalleryItem['category'];

@Component({
  selector: 'app-gallery',
  imports: [NgClass, RouterLink, CtaStrip, ImageLightbox, PageHero, SectionHeading],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery implements AfterViewInit, OnDestroy {
  @ViewChild('galleryRoot') galleryRoot?: ElementRef<HTMLElement>;

  readonly content = inject(SiteContentService);
  readonly categories: GalleryCategory[] = ['All', 'Darshan', 'Festivals', 'Seva', 'Sacred Art'];
  readonly activeCategory = signal<GalleryCategory>('All');
  readonly activeIndex = signal(-1);
  readonly filteredImages = computed(() => {
    const category = this.activeCategory();
    return category === 'All'
      ? this.content.gallery
      : this.content.gallery.filter((image) => image.category === category);
  });

  private readonly motion = inject(MotionService);
  private context?: gsap.Context | null;
  private cleanupMagnetic?: () => void;

  ngAfterViewInit(): void {
    const root = this.galleryRoot?.nativeElement;
    if (!root) {
      return;
    }

    this.context = this.motion.create(root, () => {
      this.motion.pageEnter(root);
      this.motion.reveal(root);
      this.motion.stagger(root, '.masonry-item', root.querySelector('#gallery-grid') ?? root);
      this.motion.parallax(root, '[data-parallax]', 72);
    });

    this.cleanupMagnetic = this.motion.magneticButtons(root);
    this.motion.refresh();
  }

  ngOnDestroy(): void {
    this.cleanupMagnetic?.();
    this.context?.revert();
  }

  selectCategory(category: GalleryCategory): void {
    this.activeCategory.set(category);
    this.activeIndex.set(-1);
    this.motion.refresh();
  }

  openImage(index: number): void {
    this.activeIndex.set(index);
  }

  closeImage(): void {
    this.activeIndex.set(-1);
  }
}
