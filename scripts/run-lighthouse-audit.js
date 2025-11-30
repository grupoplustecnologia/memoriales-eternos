#!/usr/bin/env node

/**
 * Lighthouse Audit Script for Core Web Vitals Testing
 * Tests multiple pages and captures performance metrics
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

// Pages to test
const PAGES_TO_TEST = [
  'http://localhost:3000',                    // Homepage
  'http://localhost:3000/trending',           // Trending (has images)
  'http://localhost:3000/plans',              // Plans page
];

async function launchChrome() {
  return chromeLauncher.launch({ chromeFlags: ['--headless', '--no-sandbox'] });
}

async function runLighthouse(url) {
  console.log(`\n🔍 Running Lighthouse audit for: ${url}`);
  console.log('='.repeat(80));

  const chrome = await launchChrome();
  
  try {
    const options = {
      logLevel: 'error',
      output: 'json',
      port: chrome.port,
      onlyCategories: ['performance', 'seo', 'accessibility', 'best-practices'],
      emulatedFormFactor: 'mobile',  // Test mobile first
      throttling: {
        rttMs: 40,
        downloadThroughputKbps: 10240,
        uploadThroughputKbps: 10240,
      }
    };

    const runnerResult = await lighthouse(url, options);
    
    if (!runnerResult) {
      console.error('❌ Lighthouse audit failed - no result');
      return null;
    }

    const json = JSON.parse(runnerResult.report);
    
    return {
      url,
      timestamp: new Date().toISOString(),
      performance: json.categories.performance,
      seo: json.categories.seo,
      accessibility: json.categories.accessibility,
      bestPractices: json.categories['best-practices'],
      metrics: {
        lcp: json.audits['largest-contentful-paint'],
        fcp: json.audits['first-contentful-paint'],
        cls: json.audits['cumulative-layout-shift'],
        fid: json.audits['max-potential-fid'],
        ttfb: json.audits['server-response-time'],
        speedIndex: json.audits['speed-index'],
      },
      opportunities: json.categories.performance.auditRefs
        .filter(ref => ref.weight > 0)
        .slice(0, 5)
        .map(ref => {
          const audit = json.audits[ref.id];
          return {
            id: ref.id,
            title: audit.title,
            score: audit.score,
            numericValue: audit.numericValue,
          };
        }),
    };
  } catch (error) {
    console.error(`❌ Error running audit for ${url}:`, error.message);
    return null;
  } finally {
    await chrome.kill();
  }
}

async function runAllAudits() {
  console.log('\n' + '='.repeat(80));
  console.log('🚀 LIGHTHOUSE AUDIT - Fase 4: Testing & Validation');
  console.log('='.repeat(80));
  console.log(`📱 Testing on Mobile emulation`);
  console.log(`⏱️  Throttling: 4G`);
  console.log(`📍 Testing ${PAGES_TO_TEST.length} pages\n`);

  const results = [];

  for (const url of PAGES_TO_TEST) {
    const result = await runLighthouse(url);
    if (result) {
      results.push(result);
      
      // Display summary
      console.log(`\n📊 RESULTS for ${url}`);
      console.log(`  Performance:     ${(result.performance.score * 100).toFixed(0)}/100`);
      console.log(`  SEO:             ${(result.seo.score * 100).toFixed(0)}/100`);
      console.log(`  Accessibility:   ${(result.accessibility.score * 100).toFixed(0)}/100`);
      console.log(`  Best Practices:  ${(result.bestPractices.score * 100).toFixed(0)}/100`);
      
      if (result.metrics.lcp.numericValue) {
        console.log(`\n  Core Web Vitals:`);
        console.log(`    LCP: ${(result.metrics.lcp.numericValue / 1000).toFixed(2)}s`);
      }
      if (result.metrics.fcp.numericValue) {
        console.log(`    FCP: ${(result.metrics.fcp.numericValue / 1000).toFixed(2)}s`);
      }
      if (result.metrics.cls.numericValue !== undefined) {
        console.log(`    CLS: ${result.metrics.cls.numericValue.toFixed(3)}`);
      }
    }

    // Delay between audits
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  // Save results to JSON
  const reportPath = path.join(process.cwd(), 'lighthouse-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\n✅ Report saved to: ${reportPath}`);

  // Display summary comparison
  console.log('\n' + '='.repeat(80));
  console.log('📊 SUMMARY - Average Scores');
  console.log('='.repeat(80));

  const avgPerformance = (results.reduce((sum, r) => sum + r.performance.score, 0) / results.length * 100).toFixed(0);
  const avgSEO = (results.reduce((sum, r) => sum + r.seo.score, 0) / results.length * 100).toFixed(0);
  const avgA11y = (results.reduce((sum, r) => sum + r.accessibility.score, 0) / results.length * 100).toFixed(0);
  const avgBP = (results.reduce((sum, r) => sum + r.bestPractices.score, 0) / results.length * 100).toFixed(0);

  console.log(`Performance:     ${avgPerformance}/100`);
  console.log(`SEO:             ${avgSEO}/100`);
  console.log(`Accessibility:   ${avgA11y}/100`);
  console.log(`Best Practices:  ${avgBP}/100`);
  console.log('='.repeat(80) + '\n');
}

// Run audits
runAllAudits().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
