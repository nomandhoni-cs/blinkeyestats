export interface Asset {
  name: string;
  download_count: number;
  browser_download_url: string;
}

export interface Release {
  tag_name: string;
  name: string;
  body?: string;
  published_at: string;
  assets: Asset[];
}

export interface ReleaseStats {
  totalDownloads: number;
  releases: Release[];
}