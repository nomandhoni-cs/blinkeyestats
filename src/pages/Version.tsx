import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Calendar, GitBranch } from 'lucide-react';
import SEO from '../components/SEO';
import type { Release } from '../types';
import StatsCard from '../components/StatsCard';

export default function Version() {
  const { tagName } = useParams();
  const [release, setRelease] = useState<Release | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `https://api.github.com/repos/nomandhoni-cs/blink-eye/releases/tags/${tagName}`
    )
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch release data');
        return res.json();
      })
      .then(setRelease)
      .catch((err) => setError('Failed to fetch release data'))
      .finally(() => setLoading(false));
  }, [tagName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (error || !release) {
    return (
      <div className="text-center text-brand p-8">
        <p className="text-xl">{error || 'Release not found'}</p>
      </div>
    );
  }

  const totalDownloads = release.assets.reduce(
    (sum, asset) =>
      asset.name !== 'latest.json' ? sum + asset.download_count : sum,
    0
  );

  return (
    <>
      <SEO
        title={`${release.name || release.tag_name} - Blink Eye Release Stats`}
        description={`Download statistics and release details for Blink Eye ${release.tag_name}. View download counts, release notes, and access download links.`}
        path={`/version/${tagName}`}
      />

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent mb-2">
            {release.name || release.tag_name}
          </h1>
          <p className="text-gray-400">Release Details and Statistics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Downloads"
            value={totalDownloads.toLocaleString()}
            icon={<Download className="h-8 w-8" />}
          />
          <StatsCard
            title="Release Date"
            value={new Date(release.published_at).toLocaleDateString(
              undefined,
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            )}
            icon={<Calendar className="h-8 w-8" />}
          />
          <StatsCard
            title="Version"
            value={release.tag_name}
            icon={<GitBranch className="h-8 w-8" />}
          />
        </div>

        {release.body && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Release Notes</h2>
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap bg-gray-700/50 p-4 rounded-lg">
                {release.body}
              </pre>
            </div>
          </div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Download Assets</h2>
          <div className="space-y-3">
            {release.assets
              .filter((asset) => asset.name !== 'latest.json')
              .map((asset) => (
                <div
                  key={asset.name}
                  className="flex items-center justify-between p-4 bg-gray-700/50 backdrop-blur-sm rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Download className="h-5 w-5 text-brand" />
                    <span className="font-medium">{asset.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm bg-brand/20 text-brand px-3 py-1 rounded-full">
                      {asset.download_count.toLocaleString()} downloads
                    </span>
                    <a
                      href={asset.browser_download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-brand text-sm font-medium rounded-md text-brand hover:bg-brand hover:text-white transition-colors duration-200"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
