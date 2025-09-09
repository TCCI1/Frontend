import React, { useEffect, useState } from 'react';

export const Aside: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <aside className={`bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-neutral-800 dark:to-neutral-700 border-l-4 border-orange-400 dark:border-yellow-400 p-4 my-6 rounded-r-lg shadow-sm`}>
      <div className="text-orange-800 dark:text-yellow-200">
        {children}
      </div>
    </aside>
  );
};

// Helper to extract YouTube video ID from URL
function getYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1);
    }
    if (
      parsed.hostname === 'www.youtube.com' ||
      parsed.hostname === 'youtube.com' ||
      parsed.hostname === 'm.youtube.com'
    ) {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v');
      }
      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/')[2];
      }
      if (parsed.pathname.startsWith('/shorts/')) {
        return parsed.pathname.split('/')[2];
      }
    }
  } catch {
    return null;
  }
  return null;
}

// YouTube Embed component styled as in the screenshot
const YouTubeEmbed: React.FC<{ url: string }> = ({ url }) => {
  const videoId = getYouTubeId(url);
  if (!videoId) return null;
  return (
    <div className="my-4 w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg bg-black">
      <div className="relative pb-[56.25%] h-0">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
};

// Simple LinkPreview component for non-YouTube links
const LinkPreview: React.FC<{ url: string; children: React.ReactNode }> = ({ url, children }) => {
  const [meta, setMeta] = useState<{
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
    error?: boolean;
  }>({});

  useEffect(() => {
    let cancelled = false;
    const fetchMeta = async () => {
      try {
        const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
        const data = await res.json();
        if (!cancelled && data.status === 'success') {
          setMeta({
            title: data.data.title,
            description: data.data.description,
            image: data.data.image?.url,
            siteName: data.data.publisher || data.data.source,
          });
        } else if (!cancelled) {
          setMeta({ error: true });
        }
      } catch {
        if (!cancelled) setMeta({ error: true });
      }
    };
    fetchMeta();
    return () => { cancelled = true; };
  }, [url]);

  const isExternal = url.startsWith('http');

  // GFG style: image on right, text on left, border, rounded, shadow, dark mode
  return (
    <div className="my-4">
      <a
        href={url}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="block max-w-full"
        style={{ textDecoration: 'none' }}
      >
        <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 bg-white dark:bg-neutral-800 overflow-hidden">
          <div className="flex-1 min-w-0 p-4">
            <div className="font-semibold text-neutral-900 dark:text-neutral-100 text-base mb-1 truncate">
              {meta.title || children}
            </div>
            {meta.description && (
              <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                {meta.description}
              </div>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {meta.siteName || (isExternal ? url.replace(/^https?:\/\//, '').split('/')[0] : url)}
              </span>
              {isExternal && (
                <span className="text-xs text-neutral-400 dark:text-neutral-500 flex-shrink-0">
                  ↗
                </span>
              )}
            </div>
          </div>
          {meta.image && (
            <div className="flex-shrink-0 w-28 h-20 bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={meta.image}
                alt={meta.title || ''}
                className="object-contain w-full h-full"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </a>
    </div>
  );
};

export const components = {
  Aside,
  table: ({ children, ...props }: React.HTMLProps<HTMLTableElement>) => (
    <div className="notion-table">
      <table {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: React.HTMLProps<HTMLTableSectionElement>) => (
    <thead {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: React.HTMLProps<HTMLTableSectionElement>) => (
    <tbody {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: React.HTMLProps<HTMLTableRowElement>) => (
    <tr {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: React.HTMLProps<HTMLTableCellElement>) => (
    <th {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLProps<HTMLTableCellElement>) => (
    <td {...props}>
      {children}
    </td>
  ),
  // Anchor should stay inline. Previews are handled by the paragraph renderer.
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = typeof href === 'string' && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
        className={
          [
            'text-orange-700 dark:text-orange-300 underline hover:text-orange-900 dark:hover:text-orange-100 transition-colors',
            props.className || ''
          ].join(' ').trim()
        }
      >
        {children}
      </a>
    );
  },
  h1: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold text-orange-900 dark:text-neutral-100 mb-6 mt-8 pb-2 border-b-2 border-orange-200 dark:border-neutral-700" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold text-orange-800 dark:text-neutral-200 mb-4 mt-6" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="text-xl font-medium text-orange-700 dark:text-neutral-300 mb-3 mt-5" {...props}>
      {children}
    </h3>
  ),
  ul: ({ children, ...props }: React.HTMLProps<HTMLUListElement>) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-neutral-700 dark:text-neutral-300" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLProps<HTMLOListElement>) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-neutral-700 dark:text-neutral-300" {...(props as any)}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLProps<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote className="notion-blockquote" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: React.HTMLProps<HTMLElement>) => (
    <code className="bg-orange-100 dark:bg-neutral-700 px-2 py-1 rounded text-sm font-mono text-orange-800 dark:text-orange-200" {...props}>
      {children}
    </code>
  ),
  p: ({ children, ...props }: React.HTMLProps<HTMLParagraphElement>) => {
    // Flatten children and strip empty/whitespace-only text nodes
    const childArray = React.Children.toArray(children).filter((node) => {
      if (typeof node === 'string') return node.trim().length > 0;
      return node !== null && node !== undefined;
    });

    if (childArray.length === 1) {
      const onlyChild = childArray[0] as React.ReactNode;

      // Direct anchor (supports overridden MDX anchor component)
      if (React.isValidElement(onlyChild)) {
        const anchorEl = onlyChild as React.ReactElement<{ href?: string; children?: React.ReactNode }>;
        const href = anchorEl.props?.href ?? '';
        if (typeof href === 'string' && /^https?:\/\//.test(href)) {
          if (getYouTubeId(href)) return <YouTubeEmbed url={href} />;
          return <LinkPreview url={href}>{anchorEl.props?.children}</LinkPreview>;
        }
      }

      // Fragment-wrapped single anchor
      if (React.isValidElement(onlyChild) && onlyChild.type === React.Fragment) {
        const fragKids = React.Children.toArray((onlyChild.props as { children?: React.ReactNode })?.children ?? []);
        const cleanedFragKids = fragKids.filter((node) => (typeof node === 'string' ? node.trim().length > 0 : node !== null && node !== undefined));
        if (cleanedFragKids.length === 1) {
          const fragOnly = cleanedFragKids[0] as React.ReactNode;
          if (React.isValidElement(fragOnly)) {
            const anchorEl = fragOnly as React.ReactElement<{ href?: string; children?: React.ReactNode }>;
            const href = anchorEl.props?.href ?? '';
            if (typeof href === 'string' && /^https?:\/\//.test(href)) {
              if (getYouTubeId(href)) return <YouTubeEmbed url={href} />;
              return <LinkPreview url={href}>{anchorEl.props?.children}</LinkPreview>;
            }
          }
        }
      }
    }

    return (
      <p className="mb-4 leading-relaxed text-neutral-700 dark:text-neutral-300" {...props}>
        {children}
      </p>
    );
  },
};
