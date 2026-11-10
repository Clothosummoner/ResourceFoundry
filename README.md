# ResourceFoundry

Ein kleines Idle-Spiel im Browser: Sammle Rohstoffe, verkaufe sie, stelle Arbeiter ein, schalte neue Ressourcen frei und verarbeite Holz mit der Säge zu Brettern.

**Jetzt spielen:** https://clothosummoner.github.io/ResourceFoundry/

## Features

### Spiel
- Holz, Stein und Sand per Klick sammeln
- Rohstoffe verkaufen, wahlweise ×1, ×10, ×100 oder Max (Schalter mit animiertem Slider)
- Arbeiter einstellen, die automatisch produzieren, jeder weitere Arbeiter wird teurer
- Werkzeuge kaufen, die die Produktion der passenden Arbeiter verdoppeln
- Stein und Sand müssen erst freigeschaltet werden; passende Shop-Angebote erscheinen erst danach
- **Maschinen:** Die Säge verarbeitet 100 Holz in 60 Sekunden zu 20 Brettern, mit Timer und Fortschrittsbalken. Bretter lassen sich für 6 Geld verkaufen.
- Automatisches Speichern alle 10 Sekunden, manuelles Speichern und Zurücksetzen; auch eine laufende Säge wird mitgespeichert

### Präsentation
- Intro mit Hammer-Animation und Amboss-Sound
- Hauptmenü mit eigener Menümusik
- Spielmusik als Playlist mit vier Titeln, der aktuelle Titel wird angezeigt
- Stumm-Knopf, die Einstellung bleibt nach dem Neuladen erhalten
- Eigene Schriftart (Cinzel)

## Technik

- HTML, CSS und JavaScript – ohne Frameworks oder Bibliotheken
- Spielstand wird mit `localStorage` als JSON gespeichert; ältere Spielstände werden beim Laden abgefangen
- Spieldaten (Arbeiter, Werkzeuge, Maschinen, Freischaltungen) liegen in Objekten, sodass z. B. eine Funktion `buyTool(toolType)` alle Werkzeuge abdeckt
- Kosten steigen exponentiell: `Grundpreis × 1,15^Anzahl`
- Shop-Elemente werden über `data-requires`-Attribute im HTML gesteuert
- Maschinen laufen in der Spielschleife mit; Timer und Fortschrittsbalken werden aus Fortschritt und Dauer berechnet
- Musik über das `Audio`-Objekt: Das `ended`-Event startet das nächste Lied, mit `%` beginnt die Playlist danach wieder von vorn
- Entwicklung mit Git in kleinen Commits; das neue Design habe ich auf einem eigenen Branch gebaut und danach in `master` gemergt

## Über das Projekt

Ich programmiere ResourceFoundry, um mir Programmieren selbst beizubringen, und möchte mich um eine Ausbildung als Fachinformatiker für Anwendungsentwicklung bewerben. Parallel lerne ich C# mit meiner Lagerverwaltung [StockFoundry](https://github.com/Clothosummoner/StockFoundry).

## Geplant

- Weitere Maschinen: Stein → Ziegel, Sand → Glas
- Lager-Limit mit ausbaubarem Lager
- Händler und automatischer Verkauf
- Einstellungen im Menü, z. B. Lautstärke
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