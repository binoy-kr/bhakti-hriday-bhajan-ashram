import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { GalleryItem } from '../../model/site.models';

@Component({
  selector: 'app-image-lightbox',
  imports: [],
  templateUrl: './image-lightbox.html',
  styleUrl: './image-lightbox.scss'
})
export class ImageLightbox implements AfterViewInit, OnDestroy {
  @ViewChild('closeButton') closeButton?: ElementRef<HTMLButtonElement>;
  @Input() images: GalleryItem[] = [];
  @Input() index = 0;
  @Output() readonly indexChange = new EventEmitter<number>();
  @Output() readonly closed = new EventEmitter<void>();

  private readonly previousOverflow = typeof document === 'undefined' ? '' : document.body.style.overflow;

  ngAfterViewInit(): void {
    document.body.style.overflow = 'hidden';
    this.closeButton?.nativeElement.focus();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = this.previousOverflow;
  }

  get current(): GalleryItem | undefined {
    return this.images[this.index];
  }

  next(): void {
    if (!this.images.length) {
      return;
    }
    this.indexChange.emit((this.index + 1) % this.images.length);
  }

  previous(): void {
    if (!this.images.length) {
      return;
    }
    this.indexChange.emit((this.index - 1 + this.images.length) % this.images.length);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closed.emit();
    }
    if (event.key === 'ArrowRight') {
      this.next();
    }
    if (event.key === 'ArrowLeft') {
      this.previous();
    }
  }
}
