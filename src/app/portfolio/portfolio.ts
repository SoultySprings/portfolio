import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-portfolio',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './portfolio.html',
  // ✅ must be plural, and we need global styles
  styleUrls: ['./portfolio.css'],
  // ✅ allow :root / html rules in portfolio.css to affect the whole page
  encapsulation: ViewEncapsulation.None,
})
export class Portfolio implements OnInit {
  contactForm!: FormGroup;
  formStatus = '';
  submitting = false;
  navOpen = false;
  year = new Date().getFullYear();

  currentTheme: 'light' | 'dark' = 'dark';

  readonly SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwIiaIkLDW04ABhj8k2GsptqB4-5_2B8eCiloh21eb6KhoQY0JHU9E6hcO6APvGnBM_/exec'; // your Apps Script URL

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

  /* -------------------------
     Theme handling (SSR safe)
     ------------------------- */
  private initTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; // skip on server
    }
    const saved = localStorage.getItem('theme');
    const theme = (saved as 'light' | 'dark') || 'dark';
    this.setTheme(theme);
  }

  private setTheme(theme: 'light' | 'dark'): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // put the attribute on <html> so your :root[data-theme="light"] rules work
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
    console.log('🌗 Theme set to:', theme);
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
     Contact form submission
     ------------------------- */
  async submitForm(): Promise<void> {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) {
      this.formStatus = 'Please fill all fields correctly.';
      return;
    }

    this.submitting = true;
    this.formStatus = '';

    const payload = {
      name: this.contactForm.value.name.trim(),
      email: this.contactForm.value.email.trim(),
      message: this.contactForm.value.message.trim(),
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    try {
      await firstValueFrom(
        this.http.post(this.SCRIPT_URL, payload, {
          headers,
          responseType: 'json',
        })
      );
      this.formStatus = `✅ Message sent — thanks!`;
      this.contactForm.reset();
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      if (err?.status && err.status >= 400) {
        this.formStatus = '❌ Server error — please try again later.';
      } else {
        this.formStatus = '❌ Network error — check the console and SCRIPT_URL.';
      }
    } finally {
      this.submitting = false;
    }
  }
}
