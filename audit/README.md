# Audit local MARTA × PALM — 15 octobre 2026

## Résultats vérifiés

- SEO technique : **126 contrôles sur 126 réussis** (20 contrôles pour chacune des 6 langues et 6 contrôles globaux). Rapport reproductible : `seo.json`, commande `python3 tools/audit-seo.py`.
- Responsive : **24 cas sur 24**, six langues à 320, 390, 768 et 1440 px. Aucun débordement horizontal du document ni titre principal tronqué dans ces cas (`responsive.json`).
- Accessibilité automatisée : **0 violation détectée** sur les vues anglaises ordinateur et mobile, avec axe-core 4.10.3 et les règles WCAG 2 A/AA et WCAG 2.1 AA. 33 règles passent dans chaque vue. Les règles partiellement indéterminées sont consignées dans les rapports.
- Parcours : boutons vers Tally, menu mobile et fermeture après clic, fond flouté, sélecteur de langues au clavier, retour du focus avec Échap, onglets de plans, agrandissement du plan, fermeture des dialogues et vidéos vérifiés. Formulaire Tally affiché, aucune demande fictive envoyée.
- Contact : Gabriella Magalhaes, CEO de Palm Signature. WhatsApp +971 58 247 4950 avec message localisé. Prix de départ 225 000 USD dans les six langues.

## Corrections réalisées

Titres longs ajustés, débordement néerlandais à 320 px corrigé, contraste du sous-titre de visite renforcé, dimensions explicites des images, descriptions et titres localisés, canonical/hreflang réciproques, sitemap multilingue, robots.txt, données structurées, cartes de partage, page 404 non indexable, ancien chemin anglais non indexable, maillage de bas de page.

Plan colorisé avec relief léger ; titres Ground floor et Second floor alignés en vraie typographie Suisse. Original technique accessible séparément. Image fournie de Gabriella intégrée et optimisée.

Dernières retouches : galerie vidéo horizontale bord à bord, six cartes de dimensions identiques, image de Bali avant la FAQ et espacement supérieur adaptatif. Ces retouches sont incluses dans le dépôt.

## Ce que ces résultats signifient

Les 126 vérifications forment une grille interne transparente ; **ce n’est pas un score Lighthouse 100/100**, une certification WCAG ou une garantie de classement Google. La qualité UI/UX ne possède pas de score universel. Les contrôles responsive de géométrie ne remplacent pas une revue visuelle de chaque écran.

Mesure locale antérieure, cache chaud : LCP 124 ms, CLS 0, FCP 92 ms, TTFB 4,9 ms. Ces mesures ne représentent pas les performances mobiles en réseau réel et ne mesurent pas l’INP de vrais visiteurs. Aucun score Lighthouse n’a été mesuré. Le formulaire externe reste dépendant de Tally. Les vidéos d’ambiance sans bouton pause suivent la demande du propriétaire ; ce point empêche d’affirmer une conformité WCAG complète, même en l’absence de violation automatisée.

## Après la mise en ligne du domaine

Vérifier DNS et HTTPS, réponses HTTP 200/404 et redirections, comportement du sitemap sur le domaine final, puis lancer PageSpeed Insights sur mobile et ordinateur. Ajouter le domaine à Google Search Console et soumettre le sitemap après vérification de propriété. Aucun résultat d’indexation ou score public n’est revendiqué à ce stade.

Références : [Lighthouse SEO](https://developer.chrome.com/docs/lighthouse/seo/meta-description), [versions linguistiques Google](https://developers.google.com/search/docs/specialty/international/localized-versions), [Core Web Vitals](https://web.dev/articles/vitals).
