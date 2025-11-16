# PWA
Créer une PWA à partir d'un site web en local

## Télécharger

```
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb

sudo dpkg -i cloudflared-linux-amd64.deb
```
## Instructions

### 1. Lancer le serveur local
```
npx serve .
```

### 2. Créer un tunnel avec Cloudflared

```
cloudflared tunnel --url http://localhost:3000
```

### 3. Ouvrir sur votre appareil mobile l'URL généré

### 4. Ouvrir le menu en haut à gauche dans votre navigateur

### 5. Sélectionner "Ajouter à l'écran d'accueil"

### 5. Sélectionner "Installer"

### 6. Ouvrir l'application mobile
