# Sardtv

[Démonstration](https://kevinleguillou.github.io/sardtv/index.html)

## Structure

Le projet utilise une simple page qui s'occupe de charger les 3 iframes du Match, du Caster (ici Sardoche), et du chat Twitch.

L'app utilise les APIs de [Youtube](https://developers.google.com/youtube/iframe_api_reference) et [Twitch](https://dev.twitch.tv/docs/embed/video-and-clips) pour contrôler les embeds vidéo.

Tout est en vanilla JS car pas besoin de sophistications sur ce projet. J'utilise les possibilités de ES6 afin de clarifier le code et isoler les concepts dans des classes, d'où le besoin de Webpack.

## Développer

Pour initialiser le projet, il faut installer les dépendances NPM avec `yarn` ou `npm`.

Pour travailler sur le projet :

- `yarn webpack` : compile le JS dans `dist/bundle.js`
- `yarn sass` : compile le SCSS dans `dist/app.css`