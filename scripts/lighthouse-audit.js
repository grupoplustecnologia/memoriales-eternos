#!/usr/bin/env node

/**
 * Simple Lighthouse testing script using npm script
 * Add to package.json and run: npm run lighthouse
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PAGES = [
  'http://localhost:3000',
  'http://localhost:3000/trending',
  'http://localhost:3000/plans',
];

console.log('\n🚀 LIGHTHOUSE AUDIT - Fase 4: Testing & Validation');
console.log('='.repeat(80));

const results = {};

PAGES.forEach((page, idx) => {
  console.log(`\n[${idx + 1}/${PAGES.length}] Testing: ${page}`);
  console.log('-'.repeat(80));

  try {
    // Run lighthouse with JSON output
    const cmd = `lighthouse ${page} --chrome-flags="--headless --no-sandbox" --output=json --emulated-form-factor=mobile --throttling.rttMs=40 --throttling.downloadThroughputKbps=10240`;
    
    const output = execSync(cmd, { encoding: 'utf-8' });
    const json = JSON.parse(output);

    const scores = {
      performance: (json.categories.performance.score * 100).toFixed(0),
      seo: (json.categories.seo.score * 100).toFixed(0),
      accessibility: (json.categories.accessibility.score * 100).toFixed(0),
      bestPractices: (json.categories['best-practices'].score * 100).toFixed(0),
    };

    results[page] = scores;

    console.log(`  ✅ Performance:     ${scores.performance}/100`);
    console.log(`  ✅ SEO:             ${scores.seo}/100`);
    console.log(`  ✅ Accessibility:   ${scores.accessibility}/100`);
    console.log(`  ✅ Best Practices:  ${scores.bestPractices}/100`);

    // Core Web Vitals
    const lcp = json.audits['largest-contentful-paint'];
    const fcp = json.audits['first-contentful-paint'];
    const cls = json.audits['cumulative-layout-shift'];

    if (lcp.numericValue) {
      console.log(`\n  📊 Core Web Vitals:`);
      console.log(`     LCP: ${(lcp.numericValue / 1000).toFixed(2)}s (target: <2.5s)`);
    }
    if (fcp.numericValue) {
      console.log(`     FCP: ${(fcp.numericValue / 1000).toFixed(2)}s (target: <1.8s)`);
    }
    if (cls.numericValue !== undefined) {
      console.log(`     CLS: ${cls.numericValue.toFixed(3)} (target: <0.1)`);
    }

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
  }
});

console.log('\n' + '='.repeat(80));
console.log('📊 SUMMARY - Average Scores');
console.log('='.repeat(80));

const keys = Object.keys(results[0] || {});
keys.forEach(key => {
  const avg = Object.values(results).reduce((sum, r) => sum + parseInt(r[key]), 0) / Object.keys(results).length;
  console.log(`${key.padEnd(15)}: ${avg.toFixed(0)}/100`);
});

console.log('='.repeat(80) + '\n');
