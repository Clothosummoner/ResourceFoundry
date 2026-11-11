# ResourceFoundry

Ein kleines Idle-Spiel im Browser: Sammle Rohstoffe, verkaufe sie, stelle Arbeiter ein, schalte neue Ressourcen frei und verarbeite sie in Maschinen weiter.

**Jetzt spielen:** https://clothosummoner.github.io/ResourceFoundry/

## Features

### Spiel
- Holz, Stein und Sand per Klick sammeln
- Rohstoffe verkaufen, wahlweise ×1, ×10, ×100 oder Max (Schalter mit animiertem Slider)
- Arbeiter einstellen, die automatisch produzieren, jeder weitere Arbeiter wird teurer
- Werkzeuge kaufen, die die Produktion der passenden Arbeiter verdoppeln
- Stein und Sand müssen erst freigeschaltet werden; passende Shop-Angebote erscheinen erst danach
- **Maschinen**, jeweils mit Timer und Fortschrittsbalken:
  - Säge: 100 Holz → 20 Bretter in 60 Sekunden
  - Ofen: 150 Stein → 20 Ziegel in 90 Sekunden
  - Glashütte: 200 Sand → 20 Glas in 120 Sekunden
- Verarbeitete Produkte bringen mehr Geld als ihre Rohstoffe, und jede neue Maschine lohnt sich mehr als die vorherige
- Automatisches Speichern alle 10 Sekunden, manuelles Speichern und Zurücksetzen; auch laufende Maschinen werden mitgespeichert

### Präsentation
- Intro mit Hammer-Animation und Amboss-Sound
- Hauptmenü mit eigener Menümusik
- Spielmusik als Playlist mit vier Titeln, der aktuelle Titel wird angezeigt
- Stumm-Knopf, die Einstellung bleibt nach dem Neuladen erhalten
- Eigene Schriftart (Cinzel)

## Technik

- HTML, CSS und JavaScript – ohne Frameworks oder Bibliotheken
- Spielstand wird mit `localStorage` als JSON gespeichert; ältere Spielstände ohne neue Inhalte werden beim Laden mit `?.` und `??` abgefangen
- Spieldaten (Arbeiter, Werkzeuge, Maschinen, Freischaltungen) liegen in Objekten, sodass z. B. `buyTool(toolType)` alle Werkzeuge und `startMachine(machineType)` alle Maschinen abdeckt
- Kosten steigen exponentiell: `Grundpreis × 1,15^Anzahl`
- Shop-Elemente werden über `data-requires`-Attribute im HTML gesteuert
- Maschinen laufen in der Spielschleife mit; Timer und Fortschrittsbalken werden aus Fortschritt und Dauer berechnet
- Verkaufspreise ausbalanciert: Verarbeiten lohnt sich, und jede Maschine bringt mehr Gewinn pro Minute als die vorherige
- Musik über das `Audio`-Objekt: Das `ended`-Event startet das nächste Lied, mit `%` beginnt die Playlist danach wieder von vorn
- Entwicklung mit Git in kleinen Commits; größere Funktionen (Design, Maschinen) baue ich auf eigenen Branches und merge sie danach in `master`

## Über das Projekt

Ich programmiere ResourceFoundry, um mir Programmieren selbst beizubringen, und möchte mich um eine Ausbildung als Fachinformatiker für Anwendungsentwicklung bewerben. Parallel lerne ich C# mit meiner Lagerverwaltung [StockFoundry](https://github.com/Clothosummoner/StockFoundry).

## Geplant

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