import { test, expect } from '@playwright/test';

test.describe('Landing Page - Navigation', () => {
  test('should load the landing page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Mădălin Stroe/);
  });

  test('should have navigation bar visible', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should have theme toggle button', async ({ page }) => {
    await page.goto('/');
    const themeBtn = page.locator('.theme-btn').first();
    await expect(themeBtn).toBeVisible();
  });

  test('should have CTA button in navigation', async ({ page }) => {
    await page.goto('/');
    const ctaBtn = page.locator('.nav-cta');
    await expect(ctaBtn).toBeVisible();
  });
});

test.describe('Landing Page - Hero Section', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();
  });

  test('should display hero heading', async ({ page }) => {
    await page.goto('/');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/Automate|AI|Business/);
  });

  test('should have primary and secondary CTA buttons', async ({ page }) => {
    await page.goto('/');
    const primaryBtn = page.locator('.btn-primary').first();
    const secondaryBtn = page.locator('.btn-secondary').first();
    await expect(primaryBtn).toBeVisible();
    await expect(secondaryBtn).toBeVisible();
  });

  test('should display profile card with stats', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('.hero-card');
    await expect(card).toBeVisible();
    const stats = page.locator('.card-stats');
    await expect(stats).toBeVisible();
  });
});

test.describe('Landing Page - Sections', () => {
  test('should have Problems section', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#problems');
    await expect(section).toBeVisible();
  });

  test('should have Services section', async ({ page }) => {
    await page.goto('/');
    const serviceCards = page.locator('.service-card');
    await expect(serviceCards.first()).toBeVisible();
  });

  test('should have Contact section', async ({ page }) => {
    await page.goto('/');
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
  });
});

test.describe('Landing Page - Responsiveness', () => {
  test('should be responsive on mobile', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();
  });
});

test.describe('Landing Page - SEO & Metadata', () => {
  test('should have proper meta description', async ({ page }) => {
    await page.goto('/');
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      'content',
      /AI automation consultant|automation services/
    );
  });

  test('should have canonical URL', async ({ page }) => {
    await page.goto('/');
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /mst1923.github.io\/landing-page/);
  });

  test('should have structured data (JSON-LD)', async ({ page }) => {
    await page.goto('/');
    const scriptTag = page.locator('script[type="application/ld+json"]');
    const content = await scriptTag.textContent();
    expect(content).toContain('Person');
    expect(content).toContain('Mădălin Stroe');
  });
});

test.describe('Landing Page - Dark Mode', () => {
  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const themeBtn = page.locator('.theme-btn').first();
    
    let theme = await html.getAttribute('data-theme');
    await themeBtn.click();
    await page.waitForTimeout(100);
    
    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(theme);
  });
});

test.describe('Landing Page - Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
  });

  test('should have proper language attribute', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');
  });
});

test.describe('Landing Page - Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have proper viewport meta tag', async ({ page }) => {
    await page.goto('/');
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute(
      'content',
      /width=device-width.*initial-scale=1/
    );
  });
});