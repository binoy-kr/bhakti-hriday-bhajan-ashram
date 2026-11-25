import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionService } from '../../../service/motion.service';
import { SiteContentService } from '../../../service/site-content.service';
import { CtaStrip } from '../../../shared/cta-strip/cta-strip';
import { ImageFrame } from '../../../shared/image-frame/image-frame';
import { PageHero } from '../../../shared/page-hero/page-hero';
import { SectionHeading } from '../../../shared/section-heading/section-heading';

interface GuruSource {
  name: string;
  /** Path to the photo, e.g. 'images/guru/krsna.jpg'. Leave empty to show the placeholder. */
  image?: string;
  highlight?: boolean;
}

interface GuruGroupSource {
  label: string;
  title: string;
  description: string;
  gurus: GuruSource[];
}

interface Guru extends GuruSource {
  number: number;
  label: string;
  side: 'left' | 'right';
}

interface GuruGroup {
  label: string;
  title: string;
  description: string;
  gurus: Guru[];
}

const GURU_GROUPS: GuruGroupSource[] = [
  {
    label: 'Branch I',
    title: 'The divine source',
    description: 'Where the knowledge first descended, from the Lord to the sages who carried it.',
    gurus: [
      { name: 'Krsna', image: '' },
      { name: 'Brahma', image: '' },
      { name: 'Narada', image: '' },
      { name: 'Vyasa', image: '' }
    ]
  },
  {
    label: 'Branch II',
    title: 'The Madhva lineage',
    description: 'Acharyas who preserved and passed on the teaching, generation after generation.',
    gurus: [
      { name: 'Madhva', image: '' },
      { name: 'Padmanabha', image: '' },
      { name: 'Nṛhari', image: '' },
      { name: 'Mādhava', image: '' },
      { name: 'Akṣobhya', image: '' },
      { name: 'Jaya Tirtha', image: '' },
      { name: 'Jñānasindhu', image: '' },
      { name: 'Dayānidhi', image: '' },
      { name: 'Vidyānidhi', image: '' },
      { name: 'Rājendra', image: '' },
      { name: 'Jayadharma', image: '' },
      { name: 'Puruṣottama', image: '' },
      { name: 'Brahmaṇya Tirtha', image: '' },
      { name: 'Vyāsa Tirtha', image: '' },
      { name: 'Lakṣmīpati', image: '' },
      { name: 'Madhavendra Puri', image: '' },
      { name: 'Īśvara Puri', image: '' }
    ]
  },
  {
    label: 'Branch III',
    title: 'The Gauḍīya stream',
    description: 'The wave of prema-bhakti that began with Lord Caitanya and reached the world.',
    gurus: [
      { name: 'Lord Caitanya', image: '' },
      { name: 'Rūpa', image: '' },
      { name: 'Raghunātha, Jīva', image: '' },
      { name: 'Kṛṣṇadāsa', image: '' },
      { name: 'Narottama', image: '' },
      { name: 'Viśvanātha', image: '' },
      { name: 'Baladeva, Jagannātha', image: '' },
      { name: 'Bhaktivinoda', image: '' },
      { name: 'Gaurakiśora', image: '' },
      { name: 'Bhaktisiddhānta Sarasvatī', image: '' }
    ]
  },
  {
    label: 'Branch IV',
    title: 'Our ashram',
    description: 'The gurus under whose grace Bhakti Hriday Bhajan Ashram stands today.',
    gurus: [
      { name: 'Bhakti Hridoy Ban Maharaj', image: '', highlight: true },
      { name: 'Bhakti Samasray Sarupananda Ban Maharaj', image: '', highlight: true }
    ]
  }
];

@Component({
  selector: 'app-about',
  imports: [RouterLink, CtaStrip, ImageFrame, PageHero, SectionHeading],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements AfterViewInit, OnDestroy {
  @ViewChild('aboutRoot') aboutRoot?: ElementRef<HTMLElement>;

  readonly content = inject(SiteContentService);
  readonly principles = [
    {
      number: '01',
      title: 'Prem',
      description: 'Love is the beginning and the destination. Every practice is an invitation to love more wholeheartedly.'
    },
    {
      number: '02',
      title: 'Seva',
      description: 'Devotion becomes real when it feeds, shelters and cares for someone else without asking for recognition.'
    },
    {
      number: '03',
      title: 'Shraddha',
      description: 'We hold ancient wisdom with reverence while leaving room for questions, wonder and personal discovery.'
    },
    {
      number: '04',
      title: 'Sangam',
      description: 'The ashram is a meeting place — for voices, generations, traditions and hearts learning to sing together.'
    }
  ];
  readonly milestones = [
    {
      chapter: 'I',
      title: 'A single evening of kirtan',
      description: 'A small circle gathered in a quiet room, singing until the noise of the day fell away.'
    },
    {
      chapter: 'II',
      title: 'A garden for stillness',
      description: 'The grove became a place for lamps, flowers, unhurried conversation and the first resident guests.'
    },
    {
      chapter: 'III',
      title: 'A living community',
      description: 'Today the ashram holds daily worship, wisdom gatherings, festivals and seva for visitors from many lands.'
    }
  ];

  /** Guru Parampara – numbered continuously across branches; sides alternate on desktop. */
  readonly guruGroups: GuruGroup[] = (() => {
    let counter = 0;
    return GURU_GROUPS.map((group) => ({
      label: group.label,
      title: group.title,
      description: group.description,
      gurus: group.gurus.map((guru) => {
        counter += 1;
        return {
          ...guru,
          number: counter,
          label: String(counter).padStart(2, '0'),
          side: counter % 2 === 0 ? ('left' as const) : ('right' as const)
        };
      })
    }));
  })();
  readonly guruCount = this.guruGroups.reduce((total, group) => total + group.gurus.length, 0);

  private readonly motion = inject(MotionService);
  private context?: gsap.Context | null;
  private cleanupMagnetic?: () => void;

  ngAfterViewInit(): void {
    const root = this.aboutRoot?.nativeElement;
    if (!root) {
      return;
    }

    this.context = this.motion.create(root, () => {
      this.motion.pageEnter(root);
      this.motion.reveal(root);
      this.motion.stagger(root, '.principle-item', root.querySelector('.principles-section') ?? root);
      this.motion.stagger(root, '.milestone-item', root.querySelector('.milestone-section') ?? root);
      this.motion.parallax(root, '[data-parallax]', 72);
      this.initParampara(root);
    });

    this.cleanupMagnetic = this.motion.magneticButtons(root);
    this.motion.refresh();
  }

  ngOnDestroy(): void {
    this.cleanupMagnetic?.();
    this.context?.revert();
  }

  private initParampara(root: HTMLElement): void {
    const tree = root.querySelector<HTMLElement>('.guru-tree');
    if (!tree || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    // The golden spine draws itself as the visitor scrolls down the lineage.
    const fill = tree.querySelector<HTMLElement>('.guru-spine-fill');
    if (fill) {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: tree, start: 'top 70%', end: 'bottom 70%', scrub: 0.6 }
        }
      );
    }

    // Branch headings.
    tree.querySelectorAll<HTMLElement>('.guru-branch').forEach((branch) => {
      gsap.from(branch, {
        opacity: 0,
        y: 36,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: branch, start: 'top 88%', once: true }
      });
    });

    // Each guru: dot pops, branch line extends, card slides in from its side.
    tree.querySelectorAll<HTMLElement>('.guru-node').forEach((node) => {
      const fromLeft = node.classList.contains('guru-left');
      const card = node.querySelector('.guru-card');
      const dot = node.querySelector('.guru-dot');
      const link = node.querySelector('.guru-link');
      const photo = node.querySelector('.guru-photo');

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: node, start: 'top 88%', once: true }
      });

      if (dot) {
        timeline.from(dot, { scale: 0, duration: 0.5, ease: 'back.out(2.4)' }, 0);
      }
      if (link) {
        timeline.from(link, { scaleX: 0, duration: 0.5 }, 0.1);
      }
      if (card) {
        timeline.from(card, { opacity: 0, x: isDesktop ? (fromLeft ? -70 : 70) : 36, duration: 0.9 }, 0.15);
      }
      if (photo) {
        timeline.from(photo, { clipPath: 'inset(100% 0% 0% 0%)', duration: 0.9, ease: 'power2.out' }, 0.35);
      }
    });
  }
}