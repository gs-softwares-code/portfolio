/**
 * Transforms various Google Drive sharing URLs into direct image streaming URLs.
 * Examples handled:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 */
export function formatDriveImageUrl(url?: string | null): string | null {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Check if it is a Google Drive link
  if (trimmed.includes("drive.google.com")) {
    const fileIdMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      // Google Drive thumbnail endpoint reliably renders high-res images directly without auth redirection issues
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
    }
  }

  return trimmed;
}

