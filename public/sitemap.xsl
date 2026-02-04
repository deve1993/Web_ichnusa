<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="it">
      <head>
        <title>Sitemap - Ichnusa Restaurant</title>
        <meta name="robots" content="noindex,follow"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style type="text/css">
          :root {
            --bg: #faf8f5;
            --card: #ffffff;
            --border: #e8e2d9;
            --text: #2c2420;
            --muted: #6b5c52;
            --primary: #8b4513;
            --primary-light: rgba(139, 69, 19, 0.1);
            --accent: #c9a959;
            --success: #5a7247;
            --success-bg: rgba(90, 114, 71, 0.12);
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.6;
            padding: 2rem;
            min-height: 100vh;
          }
          .container { max-width: 1200px; margin: 0 auto; }
          header {
            text-align: center;
            margin-bottom: 2.5rem;
            padding-bottom: 2rem;
            border-bottom: 2px solid var(--border);
          }
          .logo {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 2.5rem;
            font-weight: 600;
            color: var(--primary);
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
          }
          h1 {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 1.5rem;
            font-weight: 400;
            color: var(--muted);
            margin-bottom: 1rem;
          }
          .subtitle {
            color: var(--muted);
            font-size: 0.875rem;
            font-style: italic;
          }
          .stats {
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin-top: 1.5rem;
          }
          .stat {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.25rem;
          }
          .stat strong {
            color: var(--primary);
            font-size: 1.75rem;
            font-weight: 600;
          }
          .stat span {
            font-size: 0.75rem;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: var(--card);
            border-radius: 0.75rem;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
            border: 1px solid var(--border);
          }
          th {
            text-align: left;
            padding: 1rem 1.25rem;
            background: linear-gradient(180deg, #f5f2ed 0%, #ebe6de 100%);
            font-weight: 600;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--muted);
            border-bottom: 2px solid var(--border);
          }
          td {
            padding: 1rem 1.25rem;
            border-bottom: 1px solid var(--border);
            font-size: 0.875rem;
            vertical-align: middle;
          }
          tr:last-child td { border-bottom: none; }
          tr:hover td { background: var(--primary-light); }
          a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s;
          }
          a:hover {
            color: var(--accent);
            text-decoration: underline;
          }
          .priority {
            display: inline-flex;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
          }
          .priority-high {
            background: var(--success-bg);
            color: var(--success);
          }
          .priority-medium {
            background: rgba(201, 169, 89, 0.15);
            color: #9a7b2c;
          }
          .priority-low {
            background: rgba(107, 92, 82, 0.1);
            color: var(--muted);
          }
          .lang-badge {
            display: inline-flex;
            padding: 0.2rem 0.5rem;
            margin-right: 0.35rem;
            border-radius: 0.25rem;
            font-size: 0.65rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            background: var(--primary);
            color: white;
          }
          .lang-badge-default {
            background: var(--accent);
            color: var(--text);
          }
          .date { color: var(--muted); }
          .changefreq {
            font-size: 0.8rem;
            color: var(--muted);
            font-style: italic;
          }
          footer {
            margin-top: 2.5rem;
            padding-top: 1.5rem;
            border-top: 2px solid var(--border);
            text-align: center;
            color: var(--muted);
            font-size: 0.75rem;
          }
          footer a { color: var(--primary); }
          .decorative-line {
            width: 60px;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--accent), transparent);
            margin: 1rem auto;
          }
          @media (max-width: 768px) {
            body { padding: 1rem; }
            th, td { padding: 0.75rem; font-size: 0.8rem; }
            .stats { gap: 1.5rem; }
            .logo { font-size: 2rem; }
            th:nth-child(4), td:nth-child(4) { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="logo">ICHNUSA</div>
            <h1>Sitemap</h1>
            <div class="decorative-line"></div>
            <p class="subtitle">Mappa completa delle pagine del sito</p>
            <div class="stats">
              <div class="stat">
                <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
                <span>URL Totali</span>
              </div>
              <div class="stat">
                <strong>3</strong>
                <span>Lingue</span>
              </div>
              <div class="stat">
                <strong>8</strong>
                <span>Sezioni</span>
              </div>
            </div>
          </header>

          <table>
            <thead>
              <tr>
                <th style="width: 45%">URL</th>
                <th style="width: 20%">Lingue Disponibili</th>
                <th style="width: 12%">Priorita</th>
                <th style="width: 12%">Aggiornamento</th>
                <th style="width: 11%">Ultima Modifica</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:sort select="sitemap:priority" order="descending" data-type="number"/>
                <tr>
                  <td>
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <xsl:for-each select="xhtml:link[@hreflang != 'x-default']">
                      <xsl:choose>
                        <xsl:when test="@hreflang = 'it'">
                          <span class="lang-badge lang-badge-default">
                            <xsl:value-of select="@hreflang"/>
                          </span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="lang-badge">
                            <xsl:value-of select="@hreflang"/>
                          </span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </xsl:for-each>
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="sitemap:priority >= 0.8">
                        <span class="priority priority-high">
                          <xsl:value-of select="sitemap:priority"/>
                        </span>
                      </xsl:when>
                      <xsl:when test="sitemap:priority >= 0.5">
                        <span class="priority priority-medium">
                          <xsl:value-of select="sitemap:priority"/>
                        </span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="priority priority-low">
                          <xsl:value-of select="sitemap:priority"/>
                        </span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td class="changefreq">
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td class="date">
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>

          <footer>
            <p>
              Sitemap generata automaticamente per 
              <a href="https://ichnusa.restaurant">Ichnusa Restaurant</a>
            </p>
            <p style="margin-top: 0.5rem;">
              Valida per Google Search Console, Bing Webmaster Tools e altri motori di ricerca.
            </p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
