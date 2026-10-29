# ResourceFoundry

Ein kleines Idle-Spiel im Browser: Sammle Rohstoffe, verkaufe sie, stelle Arbeiter ein und schalte nach und nach neue Ressourcen frei.

**Jetzt spielen:** https://clothosummoner.github.io/ResourceFoundry/

## Features

- Holz, Stein und Sand per Klick sammeln
- Rohstoffe verkaufen, wahlweise ×1, ×10, ×100 oder Max (Schalter mit animiertem Slider)
- Arbeiter einstellen, die automatisch produzieren, jeder weitere Arbeiter wird teurer
- Werkzeuge kaufen, die die Produktion der passenden Arbeiter verdoppeln
- Stein und Sand müssen erst freigeschaltet werden; passende Shop-Angebote erscheinen erst danach
- Automatisches Speichern alle 10 Sekunden, manuelles Speichern und Zurücksetzen

## Technik

- HTML, CSS und JavaScript – ohne Frameworks oder Bibliotheken
- Spielstand wird mit `localStorage` als JSON gespeichert; ältere Spielstände werden beim Laden abgefangen
- Spieldaten (Arbeiter, Werkzeuge, Freischaltungen) liegen in Objekten, sodass z. B. eine Funktion `buyTool(toolType)` alle Werkzeuge abdeckt
- Kosten steigen exponentiell: `Grundpreis × 1,15^Anzahl`
- Shop-Elemente werden über `data-requires`-Attribute im HTML gesteuert – neue Inhalte brauchen keinen zusätzlichen JavaScript-Code

## Über das Projekt

Ich programmiere ResourceFoundry, um mir Programmieren selbst beizubringen, und möchte mich um eine Ausbildung als Fachinformatiker für Anwendungsentwicklung bewerben.

## Geplant

- Lager-Limit mit ausbaubarem Lager
- Händler und automatischer Verkauf
- Foundry: Rohstoffe weiterverarbeiten (Holz → Bretter, Stein → Ziegel, Sand → Glas)
- Spielmenü mit Einstellungen
- Quests und zufällige Ereignisse

## Starten

Einfach den Link oben öffnen – oder das Repository herunterladen und `index.html` im Browser öffnen.

## Credits

- Schriftart: [Cinzel](https://fonts.google.com/specimen/Cinzel) (SIL Open Font License)
- Amboss-Sound: freesound_community via [Pixabay](https://pixabay.com) (Pixabay Content License)
- Menümusik: „Sword“ von its_tigri via [Pixabay](https://pixabay.com) (Pixabay Content License)
- Spielmusik (alle via [Pixabay](https://pixabay.com), Pixabay Content License):
  - „Medieval Kingdoms“ von Daniel Roberts
  - „Mountain Knight Castle“ von Vlad Bakutov
  - „Medieval Celtic Violin“ von _Music_for_Creators_
  - „Musik Hintergrund“ von OTH Amberg-Weiden
