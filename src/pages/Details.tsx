import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import SEO from '../components/SEO';
import type { Release } from '../types';

export default function Details() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/nomandhoni-cs/blink-eye/releases')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(setReleases)
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

  return (
    <>
      <SEO
        title="Detailed Download Statistics - Blink Eye Stats"
        description="View detailed file-level download statistics for each Blink Eye release. Track individual asset downloads and access direct download links."
        path="/details"
      />

      {/* Rest of the component remains the same */}
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent mb-2">
            Detailed Statistics
          </h1>
          <p className="text-gray-400">
            File-level download statistics for each release
          </p>
        </div>

        <div className="space-y-6">
          {releases.map((release) => (
            <div
              key={release.tag_name}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-700 hover:border-brand/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">
                  {release.name || release.tag_name}
                </h2>
                <span className="text-sm text-gray-400">
                  {new Date(release.published_at).toLocaleDateString(
                    undefined,
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </span>
              </div>
              <div className="space-y-3">
                {release.assets
                  .filter((asset) => asset.name !== 'latest.json')
                  .map((asset) => (
                    <div
                      key={asset.name}
                      className="flex items-center justify-between p-3 bg-gray-700/50 backdrop-blur-sm rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Download className="h-5 w-5 text-brand" />
                        <span className="font-medium">{asset.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm bg-brand/20 text-brand px-2 py-1 rounded">
                          {asset.download_count.toLocaleString()} downloads
                        </span>
                        <a
                          href={asset.browser_download_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:text-brand-light transition-colors"
                          title={`Download ${asset.name}`}
                        >
                          <Download className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
