// ELIGIBILITY ENGINE FOR FRIEND A FELON PLATFORM

import { convictionTypes } from '../data/mockData';

export interface UserProfile {
  convictionType: string;
  convictionDate: string;
  releaseDate: string;
}

export interface Listing {
  id: number;
  excludedConvictions: string[];
  yearsRequired: number;
  [key: string]: any;
}

/**
 * Calculate years between two dates
 */
export function calculateYearsSince(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(diffYears * 10) / 10; // Round to 1 decimal
}

/**
 * Check if user is eligible for a listing
 */
export function isEligible(listing: Listing, user: UserProfile): boolean {
  // Check conviction type
  if (listing.excludedConvictions && listing.excludedConvictions.length > 0) {
    if (listing.excludedConvictions.includes(user.convictionType)) {
      return false; // User's conviction type is excluded
    }
  }
  
  // Check years since release
  const yearsSinceRelease = calculateYearsSince(user.releaseDate);
  if (listing.yearsRequired && yearsSinceRelease < listing.yearsRequired) {
    return false; // Not enough time has passed
  }
  
  return true; // User is eligible!
}

/**
 * Get ineligibility reason
 */
export function getIneligibilityReason(listing: Listing, user: UserProfile): string | null {
  if (!listing.excludedConvictions && !listing.yearsRequired) {
    return null; // No restrictions
  }

  // Check conviction type
  if (listing.excludedConvictions && listing.excludedConvictions.includes(user.convictionType)) {
    return `This listing does not accept ${user.convictionType} convictions`;
  }
  
  // Check years since release
  const yearsSinceRelease = calculateYearsSince(user.releaseDate);
  if (listing.yearsRequired && yearsSinceRelease < listing.yearsRequired) {
    const yearsNeeded = listing.yearsRequired - yearsSinceRelease;
    return `Requires ${listing.yearsRequired} years since release (you need ${yearsNeeded.toFixed(1)} more years)`;
  }
  
  return null; // Eligible
}

/**
 * Filter listings by eligibility
 */
export function filterEligibleListings<T extends Listing>(
  listings: T[], 
  user: UserProfile,
  showIneligible: boolean = false
): T[] {
  if (showIneligible) {
    return listings; // Show all
  }
  
  return listings.filter(listing => isEligible(listing, user));
}

/**
 * Search listings by keyword
 */
export function searchListings<T>(
  listings: T[],
  query: string,
  searchFields: (keyof T)[]
): T[] {
  if (!query || query.trim() === '') {
    return listings;
  }
  
  const lowerQuery = query.toLowerCase().trim();
  
  return listings.filter(listing => {
    return searchFields.some(field => {
      const value = listing[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerQuery);
      }
      if (typeof value === 'number') {
        return value.toString().includes(lowerQuery);
      }
      if (Array.isArray(value)) {
        return value.some(item => 
          typeof item === 'string' && item.toLowerCase().includes(lowerQuery)
        );
      }
      return false;
    });
  });
}

/**
 * Filter housing by criteria
 */
export interface HousingFilters {
  minRent?: number;
  maxRent?: number;
  bedrooms?: number;
  neighborhood?: string;
  fastTrackOnly?: boolean;
}

export function filterHousing(listings: any[], filters: HousingFilters): any[] {
  let filtered = [...listings];
  
  if (filters.minRent !== undefined) {
    filtered = filtered.filter(h => h.rent >= filters.minRent!);
  }
  
  if (filters.maxRent !== undefined) {
    filtered = filtered.filter(h => h.rent <= filters.maxRent!);
  }
  
  if (filters.bedrooms !== undefined) {
    filtered = filtered.filter(h => h.bedrooms === filters.bedrooms);
  }
  
  if (filters.neighborhood) {
    filtered = filtered.filter(h => 
      h.neighborhood.toLowerCase().includes(filters.neighborhood!.toLowerCase())
    );
  }
  
  if (filters.fastTrackOnly) {
    filtered = filtered.filter(h => h.isFastTrack);
  }
  
  return filtered;
}

/**
 * Filter jobs by criteria
 */
export interface JobFilters {
  minSalary?: number;
  maxSalary?: number;
  type?: 'Full-time' | 'Part-time';
  company?: string;
  fastTrackOnly?: boolean;
}

export function filterJobs(listings: any[], filters: JobFilters): any[] {
  let filtered = [...listings];
  
  if (filters.minSalary !== undefined) {
    filtered = filtered.filter(j => {
      const hourly = parseInt(j.salary.replace(/\D/g, ''));
      return hourly >= filters.minSalary!;
    });
  }
  
  if (filters.maxSalary !== undefined) {
    filtered = filtered.filter(j => {
      const hourly = parseInt(j.salary.replace(/\D/g, ''));
      return hourly <= filters.maxSalary!;
    });
  }
  
  if (filters.type) {
    filtered = filtered.filter(j => j.type === filters.type);
  }
  
  if (filters.company) {
    filtered = filtered.filter(j => 
      j.company.toLowerCase().includes(filters.company!.toLowerCase())
    );
  }
  
  if (filters.fastTrackOnly) {
    filtered = filtered.filter(j => j.isFastTrack);
  }
  
  return filtered;
}

/**
 * Sort listings by various criteria
 */
export type SortOption = 'relevant' | 'price-low' | 'price-high' | 'date-new' | 'date-old';

export function sortListings<T>(
  listings: T[],
  sortBy: SortOption,
  priceField: keyof T = 'rent' as keyof T
): T[] {
  const sorted = [...listings];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => {
        const aPrice = typeof a[priceField] === 'number' ? a[priceField] as number : 0;
        const bPrice = typeof b[priceField] === 'number' ? b[priceField] as number : 0;
        return aPrice - bPrice;
      });
      
    case 'price-high':
      return sorted.sort((a, b) => {
        const aPrice = typeof a[priceField] === 'number' ? a[priceField] as number : 0;
        const bPrice = typeof b[priceField] === 'number' ? b[priceField] as number : 0;
        return bPrice - aPrice;
      });
      
    case 'date-new':
    case 'date-old':
      // For now, keep original order (could sort by ID)
      return sorted;
      
    case 'relevant':
    default:
      return sorted;
  }
}

/**
 * Get eligibility stats for a user
 */
export function getEligibilityStats(listings: any[], user: UserProfile) {
  const eligible = listings.filter(listing => isEligible(listing, user));
  const ineligible = listings.length - eligible.length;
  const percentage = Math.round((eligible.length / listings.length) * 100);
  
  return {
    total: listings.length,
    eligible: eligible.length,
    ineligible,
    percentage
  };
}
