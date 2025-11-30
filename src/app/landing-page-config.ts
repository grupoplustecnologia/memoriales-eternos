// Landing page configuration - SSR with minimal client JS
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// This header tells browsers to cache but not store in localStorage
export const headers = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
};
