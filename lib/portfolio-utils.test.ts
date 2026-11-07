import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  filterProjects,
  calculateSkillCategoryAverage,
  formatTabularNumber,
  calculateMonthsToGraduation,
} from './portfolio-utils';
import { PORTFOLIO_DATA } from './portfolio-data';

test('validateContactForm rejects empty inputs', () => {
  const result = validateContactForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.subject);
  assert.ok(result.errors.message);
});

test('validateContactForm validates email format', () => {
  const invalidEmail = validateContactForm({
    name: 'Sarah Connor',
    email: 'not-an-email',
    subject: 'Opportunity',
    message: 'Hello Divya, we would love to connect with you.',
  });
  assert.equal(invalidEmail.valid, false);
  assert.ok(invalidEmail.errors.email);

  const validForm = validateContactForm({
    name: 'Sarah Connor',
    email: 'sconnor@cyberdyne.org',
    subject: 'Software Engineering Opportunity',
    message: 'Hello Divya, we saw your AetherCache project and want to talk.',
  });
  assert.equal(validForm.valid, true);
  assert.equal(Object.keys(validForm.errors).length, 0);
});

test('filterProjects correctly filters by category', () => {
  const allProjects = PORTFOLIO_DATA.projects;

  const distributed = filterProjects(allProjects, 'distributed', '');
  assert.ok(distributed.length >= 1);
  assert.ok(distributed.every((p) => p.category === 'distributed'));

  const robotics = filterProjects(allProjects, 'robotics', '');
  assert.ok(robotics.length >= 1);
  assert.ok(robotics.every((p) => p.category === 'robotics'));
});

test('filterProjects filters by search query across titles and tags', () => {
  const allProjects = PORTFOLIO_DATA.projects;

  const rustProjects = filterProjects(allProjects, 'all', 'rust');
  assert.ok(rustProjects.length >= 1);
  assert.ok(
    rustProjects.some((p) => p.tags.includes('Rust') || p.title.includes('Rust'))
  );

  const emptyMatch = filterProjects(allProjects, 'all', 'nonexistent-query-xyz');
  assert.equal(emptyMatch.length, 0);
});

test('calculateSkillCategoryAverage computes expected mean', () => {
  const category = PORTFOLIO_DATA.skills[0];
  const avg = calculateSkillCategoryAverage(category);
  assert.ok(avg >= 80 && avg <= 100);
});

test('formatTabularNumber formats thousands with commas', () => {
  assert.equal(formatTabularNumber(1240000), '1,240,000');
  assert.equal(formatTabularNumber(42), '42');
});

test('calculateMonthsToGraduation computes positive delta', () => {
  const fakeNow = new Date(2026, 10, 1); // Nov 2026
  const months = calculateMonthsToGraduation(fakeNow, 2027, 4); // May 2027
  assert.ok(months >= 5 && months <= 8);
});
