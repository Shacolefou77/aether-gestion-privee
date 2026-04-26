# CLAUDE.md — Æther Gestion Privée

Ce fichier contient tout le contexte du projet. Lis-le intégralement avant de faire quoi que ce soit.

---

## Qui est Johan (le client et propriétaire du projet)

- **Prénom** : Johan, 25 ans
- **Métier** : Conseiller en Gestion de Patrimoine (CGP) indépendant — lancement à la rentrée
- **Localisation** : Région nantaise, opère en France entière (y compris à distance)
- **Réseau** : Associé au réseau Euodia — **EUODIA NE DOIT JAMAIS APPARAÎTRE sur le site, dans le code, dans les métadonnées, nulle part**
- **Profil technique** : Aucune notion de code ni de design. Toujours expliquer ce qu'on fait et pourquoi, en langage clair. Ne jamais mentir : si quelque chose est complexe ou incertain, le dire franchement.

---

## Le cabinet

- **Nom** : Æther Gestion Privée (avec le Æ — le logo utilise cette typographie)
- **Domaine** : `aether-gestion-privee.fr` (déjà acheté)
- **Hébergement** : GitHub Pages (décision prise, migration possible plus tard)
- **Type de site** : Vitrine statique — HTML/CSS/JS vanilla, pas de framework, pas de CMS
- **Fréquence de mise à jour** : Très rare. Pas de blog, pas de grille tarifaire.

---

## Charte graphique

### Couleurs

```css
:root {
  --bleu-marine:  #1a2845;   /* Couleur principale EXACTE — fonds, header, footer, fond logo */
  --or:           #c9aa6f;   /* Or EXACT — typographie logo, titres, séparateurs, hover */
  --blanc:        #FFFFFF;   /* Fonds clairs, texte sur fond sombre */
  --noir:         #0D0D0D;   /* Texte courant sur fond clair */
  --gris-clair:   #F5F4F1;   /* Fonds de sections alternées */
}
```

> ✅ Couleurs confirmées par Johan — valeurs exactes à utiliser partout sans modification.

### Versions du logo

Johan dispose de **deux versions** du logo :

1. **Logo complet** (`AETHER_FINAL_...jpg`) — Format vertical, fond bleu marine `#1a2845`, figure mythologique grecque dorée (dieu ailé s'élevant vers un diamant), typographie ÆTHER + GESTION PRIVÉE en dessous. À utiliser pour : page d'accueil hero, page "Le cabinet", favicon potentielle, réseaux sociaux.

2. **Logo texte seul** (`logo.png`) — Format horizontal, fond bleu marine `#1a2845` avec coins arrondis, ÆTHER en grande serif dorée + séparateur ligne fine + GESTION PRIVÉE espacé en dessous. À utiliser pour : **navbar du site** (version principale pour la navigation).

> Pour la navbar, le logo texte sera idéalement utilisé **sans son fond bleu** (fond transparent) afin de s'intégrer proprement sur le header. Passer par Vectorizer.ai ou similaire pour obtenir une version SVG fond transparent.

### Typographie

- **Titres / Logo** : Serif élégant — utiliser `'Playfair Display'` (Google Fonts, gratuit) ou `'Cormorant Garamond'`
- **Corps de texte** : Sans-serif lisible — utiliser `'Inter'` ou `'DM Sans'`
- Le logo original utilise une serif avec empattements fins, lettres espacées pour "GESTION PRIVÉE"

### Style général

- Sobre, épuré, beaucoup de blanc et d'espace
- L'or est utilisé avec parcimonie — jamais partout, toujours comme accent
- Pas d'images de banque d'images génériques (éviter les photos de poignées de main en costume)
- Luxe discret — jamais ostentatoire

---

## Clientèle cible

Johan s'adresse à **tous profils** — pas d'exclusion par niveau de patrimoine :
- Particuliers avec un petit capital (ex : 1 000 €) comme des gros patrimoines
- Chefs d'entreprise (trésorerie, PEE, placements)
- Héritiers, familles en situation de transmission

**Tension centrale du positionnement** : *Premium mais accessible.* La gestion haut de gamme, rendue disponible à ceux qui ont de vraies ambitions — sans être élitiste ni intimidant.

---

## Services

- Bilan patrimonial
- Investissement de capital
- Développement du patrimoine
- Préparation de la retraite
- Financement de projets
- Optimisation fiscale
- Investissement immobilier
- Préparation de succession et transmission
- Génération de revenus complémentaires
- Placements financiers, trésorerie d'entreprise, Plan d'Épargne Entreprise (PEE)

---

## Voix de marque — Règles d'écriture absolues

### Principe
**Clarté avant élégance. Chaleur avant autorité.**

### Ce qu'Æther EST vs N'EST PAS

| Æther EST | Æther N'EST PAS |
|-----------|-----------------|
| Direct et clair | Condescendant |
| Chaleureux | Familier ou désinvolte |
| Rigoureux | Froid ou technique |
| Premium | Élitiste |
| Ambitieux | Arrogant |

### Exemples concrets

❌ `"Optimisation de l'allocation d'actifs multi-classes en fonction de votre profil de risque"`
✅ `"Nous construisons une stratégie sur-mesure adaptée à ce que vous avez, ce que vous voulez protéger, et ce que vous voulez transmettre."`

### Règles
1. Zéro jargon financier gratuit — si un mot technique est utilisé, l'expliquer immédiatement après
2. S'adresser à une personne, pas à un portefeuille — phrases courtes, ton direct
3. Pas de superlatifs creux ("expert reconnu", "solutions innovantes", "accompagnement personnalisé")
4. Le mot "privée" dans le nom ne doit pas intimider — le discours doit rassurer : c'est accessible

---

## Structure du site

### Architecture des fichiers

```
/
├── index.html                  ← Page d'accueil
├── contact.html
├── approche.html
├── cabinet.html
├── expertises.html
├── objectifs/
│   ├── bilan-patrimonial.html
│   ├── investir-capital.html
│   ├── developper-patrimoine.html
│   ├── preparer-retraite.html
│   ├── financer-projet.html
│   ├── optimiser-fiscalite.html
│   ├── investir-immobilier.html
│   ├── succession-transmission.html
│   └── revenus-complementaires.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    ├── logo.svg (ou .png)
    └── images/
```

### Navigation — Menu principal

Barre de navigation fixe en haut. Logo à gauche, liens à droite.

| Lien | Type | Comportement |
|------|------|--------------|
| **Vos objectifs** | Dropdown au survol | Affiche les 9 sous-pages |
| **Nos expertises** | Lien direct | → `expertises.html` |
| **Notre approche** | Lien direct | → `approche.html` |
| **Le cabinet** | Lien direct | → `cabinet.html` |
| **Contact** | Lien direct ou CTA bouton | → `contact.html` |

### Sous-menu "Vos objectifs" (dropdown au survol)

1. Faire un bilan de son patrimoine → `objectifs/bilan-patrimonial.html`
2. Investir un capital → `objectifs/investir-capital.html`
3. Développer son patrimoine → `objectifs/developper-patrimoine.html`
4. Préparer sa retraite → `objectifs/preparer-retraite.html`
5. Financer un projet → `objectifs/financer-projet.html`
6. Optimiser sa fiscalité → `objectifs/optimiser-fiscalite.html`
7. Investir dans l'immobilier → `objectifs/investir-immobilier.html`
8. Préparer sa succession et sa transmission → `objectifs/succession-transmission.html`
9. Générer des revenus complémentaires → `objectifs/revenus-complementaires.html`

### Comportement du menu

- Au survol d'un item avec sous-menu → dropdown s'affiche avec surbrillance (comme Auguste Patrimoine)
- Le logo clique → retour à `index.html` (comme Dyade Consultants)
- Menu sticky (reste visible au scroll)
- Sur mobile → menu hamburger

---

## Sites de référence (à garder en tête pour le style)

1. **Auguste Patrimoine** — `auguste-patrimoine.fr` — Référence principale. Menu dropdown fluide, logique par objectifs clients, design moderne et épuré.
2. **Cheval Blanc Patrimoine** — `chevalblanc-patrimoine.fr` — Style premium, bonne structure par projets de vie.
3. **Dyade Consultants** — `dyadeconsultants.fr` — Retenu uniquement pour le comportement du menu (surbrillance au survol) et le logo qui redirige vers l'accueil.

---

## Décisions techniques déjà prises

| Sujet | Décision |
|-------|----------|
| Type de site | HTML/CSS/JS statique — pas de framework, pas de CMS |
| Hébergement | GitHub Pages (migration possible plus tard) |
| Domaine | `aether-gestion-privee.fr` — à connecter à GitHub Pages |
| Mise à jour | Très rare — Johan repassera par Claude Code pour modifier |
| Blog | ❌ Pas de blog |
| Grille tarifaire | ❌ Pas de tarifs affichés |
| Formulaire de contact | À décider — nécessite un service tiers (ex: Formspree, gratuit) |

---

## Règles de collaboration

- **Toujours expliquer** ce qu'on fait et pourquoi, avant de le faire
- **Ne jamais mentir** — si une limite existe, la dire clairement
- **Valider avec Johan** avant de passer à l'étape suivante
- **Avancer étape par étape** — ne pas tout coder d'un coup sans validation intermédiaire
- **Jamais de jargon technique** sans explication immédiate

---

## État d'avancement

- [x] Nom du cabinet : Æther Gestion Privée
- [x] Domaine acheté : aether-gestion-privee.fr
- [x] Palette de couleurs définie
- [x] Logo existant (fourni en image PNG)
- [x] Structure de navigation définie (5 rubriques + 9 sous-pages "Vos objectifs")
- [x] Voix de marque définie
- [x] Choix technique : HTML statique sur GitHub Pages
- [x] Sites de référence analysés
- [ ] Logo fourni en SVG ou PNG haute qualité pour intégration
- [ ] Contenu textuel rédigé page par page (à faire avec Johan)
- [ ] Formulaire de contact : choix du service (Formspree ?)
- [ ] Structure HTML de base créée
- [ ] CSS / charte graphique implémentée
- [ ] Pages "Vos objectifs" créées
- [ ] Connexion domaine → GitHub Pages
- [ ] Site mis en ligne
