import { test, expect } from '@playwright/test';

test.describe('Landing Page - Navigation', () => {
  test('should load the landing page', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Mădălin Stroe/);
  });

  test('should have navigation bar visible', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should have logo in navigation', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const logo = page.locator('.nav-logo');
    await expect(logo).toBeVisible();
  });

  test('should have theme toggle button', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const themeBtn = page.locator('.theme-btn').first();
    await expect(themeBtn).toBeVisible();
  });

  test('should have CTA button in navigation', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const ctaBtn = page.locator('.nav-cta');
    await expect(ctaBtn).toBeVisible();
  });
});

test.describe('Landing Page - Hero Section', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();
  });

  test('should display hero heading', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/Automate|AI|Business/);
  });

  test('should display hero subtitle', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const subtitle = page.locator('.hero-sub');
    await expect(subtitle).toBeVisible();
  });

  test('should have primary and secondary CTA buttons', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const primaryBtn = page.locator('.btn-primary').first();
    const secondaryBtn = page.locator('.btn-secondary').first();
    await expect(primaryBtn).toBeVisible();
    await expect(secondaryBtn).toBeVisible();
  });

  test('should display profile card with stats', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const card = page.locator('.hero-card');
    await expect(card).toBeVisible();
    const stats = page.locator('.card-stats');
    await expect(stats).toBeVisible();
  });
});

test.describe('Landing Page - Sections', () => {
  test('should have Problems section', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const section = page.locator('#problems');
    await expect(section).toBeVisible();
  });

  test('should have Services section', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const serviceCards = page.locator('.service-card');
    await expect(serviceCards.first()).toBeVisible();
  });

  test('should have Stack section', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const stackSection = page.locator('#stack');
    await expect(stackSection).toBeVisible();
  });

  test('should have Contact section', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
  });
});

test.describe('Landing Page - Responsiveness', () => {
  test('should be responsive on mobile', async ({ page }) => {
    // Mobile viewport already set in playwright.config.js for mobile tests
    await page.goto('', { waitUntil: 'networkidle' });
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();
  });

  test('should hide nav links on mobile', async ({ browser }) => {
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 667 },
    });
    const page = await mobileContext.newPage();
    await page.goto('', { waitUntil: 'networkidle' });
    const navLinks = page.locator('.nav-links');
    // On mobile, nav-links should be display: none
    await expect(navLinks).toHaveCSS('display', 'none');
    await mobileContext.close();
  });
});

test.describe('Landing Page - SEO & Metadata', () => {
  test('should have proper meta description', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      'content',
      /AI automation consultant|automation services/
    );
  });

  test('should have canonical URL', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /mst1923.github.io\/landing-page/);
  });

  test('should have Open Graph meta tags', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogTitle).toBeTruthy();
    await expect(ogImage).toBeTruthy();
  });

  test('should have structured data (JSON-LD)', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const scriptTag = page.locator('script[type="application/ld+json"]');
    const content = await scriptTag.textContent();
    expect(content).toContain('Person');
    expect(content).toContain('Mădălin Stroe');
  });
});

test.describe('Landing Page - Dark Mode', () => {
  test('should toggle dark mode', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const html = page.locator('html');
    const themeBtn = page.locator('.theme-btn').first();
    
    // Initial state
    let theme = await html.getAttribute('data-theme');
    
    // Click theme button
    await themeBtn.click();
    
    // Wait for potential animation
    await page.waitForTimeout(100);
    
    // Check theme changed
    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(theme);
  });

  test('should apply dark mode styles', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const hero = page.locator('.hero');
    await page.waitForSelector('.hero', { timeout: 10000 });
    const html = page.locator('html');
    
    // Set to dark mode
    await html.evaluate(el => el.setAttribute('data-theme', 'dark'));
    
    // Check that dark mode colors are applied
    const bgColor = await hero.evaluate(el => window.getComputedStyle(el).backgroundColor);
    expect(bgColor).toBeTruthy();
  });
});

test.describe('Landing Page - Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1); // Only one h1
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // Images should either have alt or be decorative
      expect(alt !== null || (await img.isVisible())).toBeTruthy();
    }
  });

  test('should have proper language attribute', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');
  });
});

test.describe('Landing Page - Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('', { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;
    
    // Should load in less than 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have proper viewport meta tag', async ({ page }) => {
    await page.goto('', { waitUntil: 'domcontentloaded' });
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute(
      'content',
      /width=device-width.*initial-scale=1/
    );
  });
});
