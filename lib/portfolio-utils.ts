import { Project, SkillCategory } from './portfolio-data';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates the contact form inputs
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {};

  const trimmedName = data.name.trim();
  if (!trimmedName) {
    errors.name = 'Please provide your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (trimmedName.length > 80) {
    errors.name = 'Name cannot exceed 80 characters.';
  }

  const trimmedEmail = data.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Please provide your email address.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please provide a valid email address.';
  }

  const trimmedSubject = data.subject.trim();
  if (!trimmedSubject) {
    errors.subject = 'Please enter a message subject.';
  } else if (trimmedSubject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  const trimmedMessage = data.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please write a brief message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  } else if (trimmedMessage.length > 2000) {
    errors.message = 'Message cannot exceed 2000 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Filter projects based on active category and search term
 */
export function filterProjects(
  projects: Project[],
  category: string,
  searchQuery: string
): Project[] {
  const query = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      category === 'all' || project.category === category;

    if (!matchesCategory) return false;

    if (!query) return true;

    const matchesTitle = project.title.toLowerCase().includes(query);
    const matchesTagline = project.tagline.toLowerCase().includes(query);
    const matchesDescription = project.description.toLowerCase().includes(query);
    const matchesTags = project.tags.some((tag) =>
      tag.toLowerCase().includes(query)
    );

    return matchesTitle || matchesTagline || matchesDescription || matchesTags;
  });
}

/**
 * Calculate skill category averages
 */
export function calculateSkillCategoryAverage(category: SkillCategory): number {
  if (!category.skills || category.skills.length === 0) return 0;
  const sum = category.skills.reduce((acc, curr) => acc + curr.level, 0);
  return Math.round(sum / category.skills.length);
}

/**
 * Format numbers with comma separation and tabular alignment
 */
export function formatTabularNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Computes months until target graduation
 */
export function calculateMonthsToGraduation(
  currentDate: Date,
  graduationYear = 2027,
  graduationMonth = 4 // May (0-indexed 4)
): number {
  const gradDate = new Date(graduationYear, graduationMonth, 31);
  const diffTime = gradDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, Math.round(diffDays / 30.44));
}
