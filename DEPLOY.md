# RouletteChat — Deploy Guide

## Local dev (Next.js)

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Deploy to Cloudflare Pages (recommended)

### Вариант A — через GitHub (проще всего)

1. **Пуш в GitHub:**
   ```bash
   git init
   git add .
   git commit -m "chore: initial setup"
   git remote add origin https://github.com/YOUR_USER/roulettechatsites.git
   git push -u origin main
   ```

2. **Cloudflare Dashboard → Pages → Create a project → Connect to Git**
   - Выбираешь репозиторий
   - Framework preset: **Next.js**
   - Build command: `npx @cloudflare/next-on-pages`
   - Build output directory: `.vercel/output/static`
   - Environment variables → добавь:
     ```
     NODE_VERSION = 20
     NEXT_PUBLIC_SITE_URL = https://roulettechatsites.com
     ```
   - Compatibility flags (вкладка Functions): добавь `nodejs_compat`
   - Click **Save and Deploy**

3. После деплоя: Settings → Custom Domains → Add `roulettechatsites.com`
   - Cloudflare автоматически выставит DNS если домен у них

После этого каждый `git push main` = автоматический деплой.

---

### Вариант B — через Wrangler CLI (для ручного деплоя)

```bash
npm install
npm run pages:build        # собирает проект для CF Pages
npm run deploy             # деплоит через wrangler
```

Первый раз wrangler попросит авторизоваться:
```bash
npx wrangler login
```

---

### Локальный preview с Cloudflare Workers runtime

```bash
npm run preview
# → http://localhost:8788
```
Это позволяет тестировать точно в том же рантайме что на CF Pages, до деплоя.

---

## Структура проекта

```
roulettechatsites/
├── app/
│   ├── layout.tsx                     # Root layout
│   ├── sitemap.ts                     # → /sitemap.xml (автогенерация)
│   ├── robots.ts                      # → /robots.txt
│   └── [locale]/                      # en, ru, es, pt
│       ├── layout.tsx                 # ← export const runtime = 'edge'
│       ├── page.tsx                   # Главная + iframe
│       ├── reviews/
│       │   ├── page.tsx               # Хаб обзоров
│       │   └── [slug]/page.tsx        # Страница обзора
│       ├── compare/page.tsx           # Сравнение таблицей
│       └── tools/page.tsx             # Инструменты/квизы
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ReviewCard.tsx
│   └── OnlineCounter.tsx
├── lib/
│   ├── cn.ts
│   └── reviews.ts                     # Данные обзоров — редактировать здесь
├── messages/                          # Переводы
│   ├── en.json  ru.json  es.json  pt.json
├── styles/globals.css
├── middleware.ts                      # i18n роутинг
├── i18n.ts                            # next-intl конфиг
├── wrangler.toml                      # Cloudflare конфиг
├── next.config.js
└── package.json
```

---

## Добавление нового обзора

Открой `lib/reviews.ts`, добавь объект в массив `reviews`:

```ts
{
  slug: 'your-site',
  name: 'YourSite',
  tagline: 'Short description',
  description: 'Full review text...',
  rating: 4.0,
  ratingCount: 1000,
  pros: ['Fast', 'Free'],
  cons: ['No filters'],
  features: [
    { label: 'Video chat', value: true },
    { label: 'Mobile app', value: false },
    // ...
  ],
  category: 'video',
  founded: 2020,
  users: '2M+',
  website: 'yoursite.com',
}
```

Страница `/reviews/your-site` создаётся автоматически.

---

## Добавление нового языка

1. `i18n.ts` → добавь в массив `locales`: `'de'`
2. Создай `messages/de.json` (скопируй с `en.json`)
3. Переведи значения — middleware сам начнёт обрабатывать `/de/...`

---

## SEO что уже настроено

| Что | Где |
|---|---|
| `<title>` + `<description>` | `generateMetadata()` на каждой странице |
| Open Graph + Twitter cards | locale layout + каждая страница |
| JSON-LD (WebSite, Review, ItemList) | home, /reviews, /reviews/[slug] |
| `sitemap.xml` | `app/sitemap.ts` — все страницы × все языки |
| `robots.txt` | `app/robots.ts` |
| `hreflang` alternates | locale layout metadata |
| Inter font (нулевой CLS) | `next/font/google` |
| Lazy iframe | `loading="lazy"` |
| AVIF/WebP images | `next/image` + next.config |
