### RPort Flughafen 

---

## 📋 Projektübersicht

Willkommen zur **RPort Website**! Diese Anwendung ist dafür konzipiert, Flüge zu buchen und die gebuchten Flüge und Termine in einem Kalender zu verwalten. Das Projekt nutzt Next Js für das Frontend und einen JSON-Server auf Port 3001 für das Backend.

---

## 🎯 Ziele und Anforderungen

Das Projekt erfüllt die folgenden Anforderungen:

1. **HTTP-Methoden (CRUD)**: Implementiere Create, Read, Update und Delete Operationen.
2. **Website-Design und -Entwicklung**: Erstellen und gestalten der Webseite.
3. **Formularhandling**: Verwenden und validieren von Formularen.
4. **Styling und Layout**: Anwenden von benutzerdefiniertem CSS und teilweise Tailwind CSS.
5. **Deployment**: Veröffentlichen der Webanwendung.

---

## 📁 Projektstruktur

Die Projektstruktur umfasst die folgenden Hauptkomponenten:

- `app/`: Hauptverzeichnis der Anwendung.
- `components/`: Enthält React-Komponenten.
- `dataservice.js`: Datenservice zur Verwaltung von CRUD-Operationen. 
- `dialogs/`: Dialogkomponenten für die App.
- `userdataservice.js`: Benutzerdatenservice zur Verwaltung von CRUD-Operationen von Benutzer Daten.

---

## 🛠️ Funktionen und Funktionalitäten

### Anwendungsfälle

Die Anwendung implementiert die folgenden drei Anwendungsfälle:

1. **Flugtickets kaufen**: Benutzer können Flugtickets kaufen, Flüge hinzufügen, anzeigen und verwalten.
2. **Kalenderansicht**: Termine und Flüge werden in einem Kalender angezeigt, sodass Benutzer ihre Zeitpläne leicht verwalten können.
3. **Login mit Cookie**: Benutzer können sich einloggen, wobei die Authentifizierung über Cookies verwaltet wird.

### CRUD-Operationen im Detail

#### Create (Erstellen)

Beim Erstellen von neuen Einträgen, wie z.B. neuen Flügen oder Terminen, wird eine HTTP-POST-Anfrage an den Server gesendet. Hier ein Beispielcode:

```javascript
const createFlight = async (flightData) => {
    try {
        const response = await fetch('http://localhost:3001/flights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(flightData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating flight:', error);
    }
};
```

- **`method: 'POST'`**: Die POST-Methode wird verwendet, um neue Ressourcen zu erstellen.
- **`headers`**: Definiert den Typ der Daten, die gesendet werden (JSON).
- **`body`**: Die tatsächlichen Daten, die im JSON-Format gesendet werden.

#### Read (Lesen)

Zum Lesen oder Abrufen von Daten, wie z.B. das Anzeigen aller Flüge oder Termine, wird eine HTTP-GET-Anfrage verwendet:

```javascript
const fetchFlights = async () => {
    try {
        const response = await fetch('http://localhost:3001/flights');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching flights:', error);
    }
};
```

- **`method: 'GET'`**: Die GET-Methode wird verwendet, um Daten vom Server abzurufen.
- **`response.json()`**: Die Antwort wird in ein JSON-Format konvertiert, um sie leicht verarbeiten zu können.

#### Update (Aktualisieren)

Um bestehende Einträge zu aktualisieren, wie z.B. das Ändern von Flugdaten, wird eine HTTP-PUT-Anfrage verwendet:

```javascript
const updateFlight = async (id, updatedFlightData) => {
    try {
        const response = await fetch(`http://localhost:3001/flights/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFlightData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating flight:', error);
    }
};
```

- **`method: 'PUT'`**: Die PUT-Methode wird verwendet, um eine bestehende Ressource zu aktualisieren.
- **`URL mit ID`**: Die spezifische Ressource wird über die ID in der URL angesprochen.
- **`body`**: Die aktualisierten Daten im JSON-Format.

#### Delete (Löschen)

Zum Löschen von Einträgen, wie z.B. das Entfernen eines Fluges, wird eine HTTP-DELETE-Anfrage verwendet:

```javascript
const deleteFlight = async (id) => {
    try {
        await fetch(`http://localhost:3001/flights/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error deleting flight:', error);
    }
};
```

- **`method: 'DELETE'`**: Die DELETE-Methode wird verwendet, um eine Ressource zu löschen.
- **`URL mit ID`**: Die spezifische Ressource wird über die ID in der URL angesprochen.

---

## 📊 Präsentation

Die Projektpräsentation umfasst:

- Beschreibung der Anwendungsfälle.
- Screenshots oder Wireframes der Anwendung.
- Live-Demo der Anwendung.

---

## 📚 Kompetenzen

Das Projekt demonstriert die folgenden Kompetenzen:

- **Design und Implementierung**: Verständnis und Anwendung von Designprinzipien.
- **HTTP-Protokoll**: Erklärung und Nutzung von HTTP-Anfragen und -Antworten.
- **Formularhandling**: Erstellen und Validieren von Formularelementen.
- **Web-Deployment**: Veröffentlichung der Webanwendung.

---

## 📞 Support

Für Fragen oder Support, kontaktieren Sie bitte:

- **Entwickler**: Eray Kaan Cevik, 
- **E-Mail**: luigi@example.com

---

Viel Erfolg beim Programmieren! 🚀✨

---

Dieses README-Dokument erfasst den Kern des Projekts und bietet detaillierte Anweisungen und Beschreibungen basierend auf dem bereitgestellten PDF-Dokument.
