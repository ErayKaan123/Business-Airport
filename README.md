## RPort Flughafen App

---

## 📋 Projektübersicht

Willkommen zur **RPort Website**! Diese Anwendung ist dafür konzipiert, Flüge zu buchen und die gebuchten Flüge und Termine in einem Kalender zu verwalten. Das Projekt nutzt Next.js für das Frontend und einen JSON-Server auf Port 3001 für das Backend.

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
- `userdataservice.js`: Benutzerdatenservice zur Verwaltung von CRUD-Operationen von Benutzerdaten.

---

## 🛠️ Funktionen und Funktionalitäten

### Anwendungsfälle

Die Anwendung implementiert die folgenden drei Anwendungsfälle:

1. **Flugtickets kaufen**: Benutzer können Flugtickets kaufen, Flüge hinzufügen, anzeigen und verwalten.
    ![image](https://github.com/user-attachments/assets/1d306b67-0e85-42e9-bb56-5cac2366963a)

3. **Kalenderansicht**: Termine und Flüge werden in einem Kalender angezeigt, sodass Benutzer ihre Zeitpläne leicht verwalten können.
   ![image](https://github.com/user-attachments/assets/c6805037-0077-4945-b16e-40a7f9e511d0)

5. **Login mit Cookie**: Benutzer können sich einloggen, wobei die Authentifizierung über Cookies verwaltet wird.
   ![image](https://github.com/user-attachments/assets/d55ef696-451a-4254-bf4d-33043dc2cd8e)


### CRUD-Operationen im Detail

#### Create (Erstellen)

Beim Erstellen von neuen Einträgen, wie z.B. neuen Flügen oder Terminen, wird eine HTTP-POST-Anfrage an den Server gesendet. Hier ein Beispielcode:

```javascript
export async function addEntryToUserById(userId, entry) {
    try {
      const response = await fetch(`http://localhost:3001/calendarEntries?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add entry to user.');
      }
      console.log('Event added successfully');
    } catch (error) {
      console.error('Error adding entry:', error);
      throw new Error('Failed to add entry to user.');
    }
  }
```

- **`method: 'POST'`**: Die POST-Methode wird verwendet, um neue Ressourcen zu erstellen.
- **`headers`**: Definiert den Typ der Daten, die gesendet werden (JSON).
- **`body`**: Die tatsächlichen Daten, die im JSON-Format gesendet werden.

#### Read (Lesen)

Zum Lesen oder Abrufen von Daten, wie z.B. das Anzeigen aller Flüge oder Termine, wird eine HTTP-GET-Anfrage verwendet:

```javascript
export async function getCalendarEntriesByUserId(userId) {
    const response = await fetch(`http://localhost:3001/calendarEntries?userId=${userId}`);
    if (response.ok) return response.json();
    throw new Error(`Failed to fetch calendar entries for user id: ${userId}`);
  }

```
- **`method: 'GET'`**: Die GET-Methode wird verwendet, um Daten vom Server abzurufen.
- **`response.json()`**: Die Antwort wird in ein JSON-Format konvertiert, um sie leicht verarbeiten zu können.

#### Update (Aktualisieren)

Um bestehende Einträge zu aktualisieren, wie z.B. das Ändern von Flugdaten, wird eine HTTP-PUT-Anfrage verwendet:

```javascript
export async function updateCalendarEntryById(userId, updatedEvent) {
    try {
      const response = await fetch(`http://localhost:3001/calendarEntries/${updatedEvent.id}?userId=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update Calendar Entry. User Id: ${userId}, Calendar Id: ${updatedEvent.id}`);
      }
      console.log(`Updated Calendar Entry. User Id: ${userId}, Calendar Id: ${updatedEvent.id}`);
      return response.json(); // Return updated event data if needed
    } catch (error) {
      console.error(`Failed to update Calendar Entry. User Id: ${userId}, Calendar Id: ${updatedEvent.id}`, error);
      throw new Error(`Failed to update Calendar Entry. User Id: ${userId}, Calendar Id: ${updatedEvent.id}`);
    }
  }
```

- **`method: 'PUT'`**: Die PUT-Methode wird verwendet, um eine bestehende Ressource zu aktualisieren.
- **`URL mit ID`**: Die spezifische Ressource wird über die ID in der URL angesprochen.
- **`body`**: Die aktualisierten Daten im JSON-Format.

#### Delete (Löschen)

Zum Löschen von Einträgen, wie z.B. das Entfernen eines Fluges, wird eine HTTP-DELETE-Anfrage verwendet:

```javascript
export async function deleteCalendarEntryById(userId, calendarId) {
    try {
      const response = await fetch(`http://localhost:3001/calendarEntries/${calendarId}?userId=${userId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete Calendar Entry. User Id: ${userId}, Calendar Id: ${calendarId}`);
      }
      console.log(`Deleted Calendar Entry. User Id: ${userId}, Calendar Id: ${calendarId}`);
    } catch (error) {
      console.error(`Failed to delete Calendar Entry. User Id: ${userId}, Calendar Id: ${calendarId}`, error);
      throw new Error(`Failed to delete Calendar Entry. User Id: ${userId}, Calendar Id: ${calendarId}`);
    }
  }

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

- **Entwickler**: Eray Kaan Cevik, Jean Luc Jordi
- **E-Mail**: eray.cevik@lernende.bbw.ch, jean.jordi@lernende.bbw.ch

---

Viel Erfolg beim Programmieren! 🚀✨

---
