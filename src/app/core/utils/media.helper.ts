import { Pipe, PipeTransform } from '@angular/core';

/**
 * Resolves a media URL without prepending any base URL or fallback images.
 */
export function resolveMediaUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return null;
  }
  return url.trim();
}

/**
 * Image fallback handler for (error) events on <img> elements (no-op).
 */
export function handleMediaError(event: Event, fallbackUrl?: string): void {
  // Do not replace API images with default fallback images
}

/**
 * Pipe to use in templates: {{ url | resolveMediaUrl }}
 */
@Pipe({
  name: 'resolveMediaUrl',
  standalone: true,
  pure: true
})
export class ResolveMediaUrlPipe implements PipeTransform {
  transform(url: string | null | undefined): string | null {
    return resolveMediaUrl(url);
  }
}
