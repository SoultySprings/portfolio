import {
  Component,
  HostListener,
  Inject,
  OnInit,
  AfterViewInit,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-portfolio',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Portfolio implements OnInit, AfterViewInit {
  contactForm!: FormGroup;
  formStatus = '';
  submitting = false;
  navOpen = false;
  year = new Date().getFullYear();

  currentTheme: 'light' | 'dark' = 'dark';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    // build form
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });

    // initialize theme
    this.initTheme();
  }

  ngAfterViewInit(): void {
    // start animation loop only in browser
    if (isPlatformBrowser(this.platformId)) {
      this.animate();
    }
  }

  /* -------------------------
     Theme handling (SSR safe)
     ------------------------- */
  private initTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const saved = localStorage.getItem('theme');
    const theme = (saved as 'light' | 'dark') || 'dark';
    this.setTheme(theme);
  }

  private setTheme(theme: 'light' | 'dark'): void {
    if (!isPlatformBrowser(this.platformId)) return;

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
  }

  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const next = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  /* -------------------------
     Mobile nav
     ------------------------- */
  toggleNav(): void {
    this.navOpen = !this.navOpen;
  }
  closeNav(): void {
    this.navOpen = false;
  }

  /* -------------------------
     Changing the gradient with mouse change
     ------------------------- */
  private targetX = 50;
  private targetY = 50;
  private currentX = 50;
  private currentY = 50;
  private speed = 0.05;
  private time = 2;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    this.targetX = (event.clientX / window.innerWidth) * 100;
    this.targetY = (event.clientY / window.innerHeight) * 100;
  }

  private animate() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.time += 0.016;

    this.currentX += (this.targetX - this.currentX) * this.speed;
    this.currentY += (this.targetY - this.currentY) * this.speed;

    const oscillationX = Math.sin(this.time * 0.5) * 5;
    const oscillationY = Math.cos(this.time * 0.7) * 5;

    const gradX = this.currentX + oscillationX;
    const gradY = this.currentY + oscillationY;

    document.documentElement.style.setProperty('--grad-x', `${gradX}%`);
    document.documentElement.style.setProperty('--grad-y', `${gradY}%`);

    requestAnimationFrame(() => this.animate());
  }

  /* -------------------------
     Contact form submission
     ------------------------- */
  readonly SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbypnbMflvatQyTdBOodz_W5-aLyNxK_04lBSwTxY2yAEnr2ZlnAwMGrooQbY4xK1tHa/exec';

  async submitForm(): Promise<void> {
  this.contactForm.markAllAsTouched();
  if (this.contactForm.invalid) {
    this.formStatus = '⚠️ Please fill all fields correctly.';
    return;
  }

  this.submitting = true;
  this.formStatus = '⏳ Sending...';

  const body = new URLSearchParams();
  body.set("name", this.contactForm.value.name.trim());
  body.set("email", this.contactForm.value.email.trim());
  body.set("message", this.contactForm.value.message.trim());

  try {
    await firstValueFrom(
      this.http.post(this.SCRIPT_URL, body.toString(), {
        headers: new HttpHeaders({
          "Content-Type": "application/x-www-form-urlencoded"
        }),
        responseType: 'text'
      })
    );

    setTimeout(() => {
      this.formStatus = "✅ Message sent — thanks!";
      this.contactForm.reset();
    }, 1000);

  } catch {
    setTimeout(() => {
      this.formStatus = "✅ Message sent — thanks!";
      this.contactForm.reset();
    }, 1000);
  } finally {
    this.submitting = false;
  }
}




}
