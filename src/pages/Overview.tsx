import React, { useEffect, useState } from 'react';
import { Download, Package, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import StatsCard from '../components/StatsCard';
import type { Release, ReleaseStats } from '../types';

export default function Overview() {
  const [stats, setStats] = useState<ReleaseStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/nomandhoni-cs/blink-eye/releases')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((releases: Release[]) => {
        const totalDownloads = releases.reduce((total, release) => {
          const releaseDownloads = release.assets.reduce((sum, asset) => {
            if (asset.name !== 'latest.json') {
              return sum + asset.download_count;
            }
            return sum;
          }, 0);
          return total + releaseDownloads;
        }, 0);

        setStats({
          totalDownloads,
          releases,
        });
      })
      .catch((err) => setError('Failed to fetch release data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-brand p-8">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <>
      <SEO
        title="Blink Eye Download Stats - Track Application Downloads"
        description="Track download statistics for Blink Eye application. View total downloads, latest releases, and detailed analytics for all versions."
        path="/"
      />

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent mb-2">
            Blink Eye Statistics
          </h1>
          <p className="text-gray-400">Track downloads and release metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Downloads"
            value={stats.totalDownloads.toLocaleString()}
            icon={<Download className="h-8 w-8" />}
          />
          <StatsCard
            title="Total Releases"
            value={stats.releases.length}
            icon={<Package className="h-8 w-8" />}
          />
          <StatsCard
            title="Latest Release"
            value={stats.releases[0]?.tag_name || 'N/A'}
            icon={<Clock className="h-8 w-8" />}
          />
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-4">All Releases</h2>
          <div className="space-y-4">
            {stats.releases.map((release) => (
              <Link
                key={release.tag_name}
                to={`/version/${release.tag_name}`}
                className="block"
              >
                <div className="flex items-center justify-between p-4 bg-gray-700/50 backdrop-blur-sm rounded-lg hover:bg-gray-700 transition-colors">
                  <div>
                    <h3 className="font-medium">
                      {release.name || release.tag_name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {new Date(release.published_at).toLocaleDateString(
                        undefined,
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="h-4 w-4 text-brand" />
                    <span>
                      {release.assets
                        .reduce(
                          (sum, asset) =>
                            asset.name !== 'latest.json'
                              ? sum + asset.download_count
                              : sum,
                          0
                        )
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
