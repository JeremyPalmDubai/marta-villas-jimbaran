# MARTA × PALM — Résidences privées à Bali


## Ouvrir le site

Double-cliquer sur **Ouvrir le site.command**. Le site apparaît sur http://127.0.0.1:4173/. Conserver la fenêtre du terminal ouverte pendant la consultation ; Ctrl+C arrête le serveur. Le fichier `dist/index.html` peut aussi être ouvert directement dans un navigateur.

## Contenu

- Six pages HTML complètes : anglais par défaut, français, néerlandais, allemand, espagnol, portugais.
- Logo PALM vectoriel fourni, sept vidéos optimisées, images WebP, deux plans agrandissables.
- FAQ, galerie, lecteur vidéo, menu mobile et préférences de mouvement réduit.
- Formulaire Tally fourni : gbjGGD. Contact WhatsApp fourni : Gabriella Magalhaes — CEO de Palm Signature.
- Métadonnées localisées, données structurées WebSite/Accommodation/FAQPage, titres et textes lisibles sans JavaScript.
- Domaine configuré : marta-villas-jimbaran.com. Les balises canonical, hreflang, sitemap multilingue, robots.txt et CNAME sont générés pour ce domaine.

## Modifier et reconstruire

Les textes traduits sont dans `tools/copy.json`. Le modèle des pages et les textes de collaboration sont dans `tools/build.py`. Les styles et les interactions sont dans `dist/styles.css` et `dist/app.js`. Les médias sont dans `dist/assets`.

```sh
python3 tools/build.py
```

Pour un hébergement avec une adresse connue :

```sh
python3 tools/build.py --base-url https://marta-villas-jimbaran.com
```

Aucune dépendance JavaScript à installer, aucun service serveur à héberger. Le site est écrit en HTML, CSS et JavaScript ; la référence visuelle est reproduite pour le contenu MARTA, sans reprise de ses services internes.

## GitHub Pages

1. Le site et ses médias sont dans ce dépôt.
2. Choisir **Settings → Pages → Source → GitHub Actions**.
3. Dans **Actions → Publish MARTA × PALM → Run workflow**, lancer la publication. Le workflow génère les six langues, les URL canoniques et le sitemap, puis publie `dist`. Le lancement est manuel.

Dépôt : https://github.com/JeremyPalmDubai/marta-villas-jimbaran. Le domaine et son DNS doivent être configurés séparément. Voir `audit/README.md` pour les résultats et limites des contrôles.

## Sources du contenu

Visuels, vidéos, logo, prix et informations commerciales fournis par l’utilisateur. Le texte affiché privilégie « deux villas Signature annoncées vendues » ; le taux de 70 % fourni dans une autre version n’est pas repris. Les disponibilités actuelles se demandent auprès de l’équipe. Les images de Bali sont des images d’ambiance, pas une représentation de la vue depuis les villas. Le formulaire Tally reste dans la langue configurée dans Tally.

La référence Nuanu a servi à relever la composition, les espacements, la palette et la typographie. Les fichiers de polices sont ceux publiquement servis par cette référence ; leur provenance est consignée dans `ASSETS.md`.
