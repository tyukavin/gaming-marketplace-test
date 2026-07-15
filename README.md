# web-startpack

Современная Gulp-сборка для многостраничной HTML-вёрстки и проектов с PHP-шаблонами.

## Требования

- Node.js 24.15.0 (LTS)
- npm 11+

Версии зафиксированы в `package.json` через Volta. Зависимости устанавливаются строго из `package-lock.json`:

```bash
npm ci
```

## Команды

```bash
npm start       # HTML-разработка и BrowserSync
npm run php     # PHP-разработка, требуется PHP_PROXY
npm run build   # чистая production-сборка
npm run check   # форматирование, линтеры, сборка и HTML-валидация
npm run deploy  # чистая сборка и загрузка по SFTP
```

Чтобы BrowserSync не открывал браузер автоматически:

```bash
BROWSER_SYNC_OPEN=false npm start
```

Для доступа из локальной сети установите `DEV_LISTEN=0.0.0.0`.

Для PHP укажите адрес локального backend:

```bash
PHP_PROXY=http://project.test npm run php
```

## Структура

```text
src/
├── components/       HTML, PHP, SCSS и JS компонентов
├── fonts/            WOFF/WOFF2 или исходные TTF
├── img/              растровые изображения, SVG, GIF и favicon
├── js/01_main.js     главная точка входа JavaScript
├── scss/style.scss   единственная точка входа Sass
├── svg/css/          SVG, преобразуемые в SCSS data URI
└── svg/sprite/       SVG-иконки symbol-спрайта

build/                результат сборки, кроме .gitkeep не хранится в Git
tasks/                задачи Gulp
```

## HTML-компоненты

Используется синтаксис `gulp-file-include`:

```html
@@include('components/page-blocks/_header.html')
```

HTML-файлы внутри `src/components` считаются partial-файлами и отдельно в `build` не копируются.

## Sass

Используется модульная система `@use`. Автоматические glob-импорты намеренно удалены: зависимость компонента должна быть видна в `src/scss/style.scss`.

```scss
@use "../components/bem-blocks/button/button";
```

Общие mixin подключаются внутри использующего их модуля:

```scss
@use "../../scss/base/mixins";
```

Целевые браузеры задаются полем `browserslist` в `package.json` и используются Autoprefixer.

## JavaScript

`src/js/01_main.js` собирается esbuild. Можно использовать `import` из npm-пакетов и локальных модулей. Development-сборка не минифицируется, production-сборка минифицируется; sourcemap создаётся в обоих режимах.

## Изображения и SVG

- PNG и JPEG оптимизируются Sharp; рядом создаются WebP и AVIF.
- SVG из `src/img` оптимизируются SVGO.
- Остальные файлы из `src/img` копируются без преобразования.
- `src/svg/sprite/*.svg` собираются в `build/img/sprite.svg`.
- `src/svg/css/*.svg` доступны как классы `.--svg__имя-файла`.

Результаты никогда не записываются обратно в `src`.

## Шрифты

- WOFF и WOFF2 копируются в `build/fonts`.
- TTF автоматически преобразуется в WOFF2.
- `@font-face` описывается явно в `src/scss/global/_fonts.scss`, чтобы корректно задавать family, weight и style.

## SFTP deploy

Скопируйте нужные значения из `.env.example` в переменные окружения. `.env` игнорируется Git. Требуются:

- `SFTP_HOST`;
- `SFTP_USER`;
- `SFTP_PASSWORD` или `SFTP_KEY`;
- опционально `SFTP_PORT` и `SFTP_PATH`.

Задача загружает содержимое чистой production-сборки. Она не удаляет посторонние файлы на сервере.
