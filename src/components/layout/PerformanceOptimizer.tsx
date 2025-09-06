"use client";

import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload font display swap
      const fontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
      if (fontLink) {
        fontLink.setAttribute('rel', 'preload');
        fontLink.setAttribute('as', 'style');
      }

      // Optimize images loading
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    };

    // Reduce motion for users who prefer it
    const respectMotionPreferences = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
      }
    };

    // Optimize scroll performance
    const optimizeScrolling = () => {
      let ticking = false;
      
      const updateScrollElements = () => {
        // Add scroll-based optimizations here
        ticking = false;
      };

      const requestScrollUpdate = () => {
        if (!ticking) {
          requestAnimationFrame(updateScrollElements);
          ticking = true;
        }
      };

      window.addEventListener('scroll', requestScrollUpdate, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', requestScrollUpdate);
      };
    };

    // Initialize optimizations
    preloadCriticalResources();
    respectMotionPreferences();
    const cleanupScroll = optimizeScrolling();

    return cleanupScroll;
  }, []);

  return null;
}


