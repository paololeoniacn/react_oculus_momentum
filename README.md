
# 🏆 My Routine App

Un'applicazione **React + Firebase** per gestire la routine giornaliera e monitorare i progressi con un sistema di gamification. 🎯  

---

## 📌 Requisiti

Per eseguire l'app, assicurati di avere:  
- **Node.js** (consigliato v18 o superiore)  
- **NPM** o **Yarn** installato  
- **Un progetto Firebase configurato**  
- **Un file `.env` con le credenziali Firebase**  

---

## 📥 Installazione

1. **Clona il repository:**
   ```bash
   git clone https://github.com/tuo-username/my-routine-app.git
   cd my-routine-app
   ```

2. **Installa le dipendenze:**
   ```bash
   npm install
   ```
   _oppure_
   ```bash
   yarn install
   ```
  _oppure_
   ```bash
   Utilizza gli script ps1
   ```
3. **Crea il file `.env` nella root del progetto** e incolla le credenziali Firebase:  
   ```env
   VITE_FIREBASE_API_KEY=TUO_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN=TUO_PROGETTO.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=TUO_PROGETTO
   VITE_FIREBASE_STORAGE_BUCKET=TUO_PROGETTO.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=TUO_ID
   VITE_FIREBASE_APP_ID=TUO_APP_ID
   ```
   🔹 **⚠️ IMPORTANTE:** Non condividere mai questo file pubblicamente!  

---

## 🔥 Configurazione Firebase

1️⃣ **Vai su [Firebase Console](https://console.firebase.google.com/)**  
2️⃣ **Crea un nuovo progetto Firebase** (o usa uno esistente)  
3️⃣ **Abilita Firestore Database:**  
   - Vai su **Firestore Database** → **Crea database**  
   - Seleziona la **modalità di test**  
   - Scegli la regione più vicina a te  
   - Clicca **Abilita**  
4️⃣ **Ottieni le credenziali Firebase:**  
   - Vai su **Impostazioni del progetto** → **SDK di configurazione**  
   - Copia le credenziali e incollale nel tuo file `.env`  

---

## 🚀 Avvio dell'Applicazione

Una volta configurato Firebase, avvia l’app con:  
```bash
npm run dev
```
Oppure, se usi Yarn:  
```bash
yarn dev
```
🔹 L'app sarà disponibile su **`http://localhost:5173`**  

---

## 🏗️ Struttura del Progetto

```
/my-routine-app
├── src/
│   ├── components/        # Componenti UI
│   ├── context/           # Context API per lo stato globale
│   ├── pages/             # Pagine principali dell'app
│   ├── firebase.js        # Configurazione Firebase
│   ├── App.tsx            # File principale dell'app
│   ├── main.tsx           # Punto di ingresso dell'app
├── public/
├── .env                   # Variabili d'ambiente (NON commitare!)
├── package.json           # Dipendenze e script
├── README.md              # Documentazione
```

---

## 📌 Funzionalità
✔ **Aggiunta automatica delle attività giornaliere**  
✔ **Tracciamento dei progressi e delle attività completate**  
✔ **Gamification con streak e badge personalizzati**  
✔ **Salvataggio e recupero dei dati su Firebase Firestore**  
✔ **Design moderno con TailwindCSS**  

---

## 🚀 Deployment su AWS S3
Se vuoi deployare l’app su AWS S3:  
1. **Genera la build di produzione**  
   ```bash
   npm run build
   ```
2. **Carica i file nella tua bucket S3 con hosting statico**  
3. **Configura i permessi di accesso pubblico per i file statici**  
4. **Collega il dominio personalizzato (opzionale)**  

---

## 🤝 Contributi
Se vuoi contribuire, fai una **pull request** o apri una **issue**.   

---
### LocalStorage
C:\Users\<TuoNomeUtente>\AppData\Local\Google\Chrome\User Data\Default\Local Storage\leveldb
C:\Users\<TuoNomeUtente>\AppData\Local\Microsoft\Edge\User Data\Default\Local Storage\leveldb