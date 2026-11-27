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
- **Lager:** Von jedem Rohstoff und Produkt passt nur eine begrenzte Menge ins Lager (anfangs 500). Die Anzeige zeigt `Menge/Limit` und wird rot, sobald das Lager voll ist
- Das Lager lässt sich in 10 Stufen von 500 bis 10.000 Platz ausbauen. Jede Stufe hat eigene Kosten: Am Anfang nur Geld, später kommen Holz, Stein und Sand dazu und zum Schluss auch Bretter, Ziegel und Glas. Der Button zeigt immer, was die nächste Stufe kostet
- Das Lager führt so durch das Spiel: Um Sand freizuschalten (1000 Stein), muss man es zuerst ausbauen, und für die hohen Stufen braucht man die Produkte aller Maschinen
- **Maschinen**, jeweils mit Timer und Fortschrittsbalken:
  - Säge: 100 Holz → 20 Bretter in 60 Sekunden
  - Ofen: 150 Stein → 20 Ziegel in 90 Sekunden
  - Glashütte: 200 Sand → 20 Glas in 120 Sekunden
- Verarbeitete Produkte bringen mehr Geld als ihre Rohstoffe, und jede neue Maschine lohnt sich mehr als die vorherige
- Automatisches Speichern alle 10 Sekunden, manuelles Speichern und Zurücksetzen; auch laufende Maschinen und das ausgebaute Lager werden mitgespeichert

### Präsentation
- Selbst gepixelte Icons für alle Rohstoffe, Produkte und Maschinen
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
- Das Lager-Limit gilt überall, wo Rohstoffe dazukommen (Klicken, Arbeiter, Maschinen); `Math.min(Menge + Zuwachs, Limit)` sorgt dafür, dass nichts über das Limit hinausgeht
- Die rote Anzeige bei vollem Lager wird mit `classList.toggle('full', Bedingung)` ein- und ausgeschaltet
- Die Lagerstufen stehen in einem Array; jede Stufe ist ein Objekt mit Limit und Preis, z. B. `{ limit: 1500, price: { money: 700, wood: 200 } }`. Gespeichert wird nur die aktuelle Stufe, das Limit kommt beim Laden aus der Liste
- Beim Ausbau prüft eine `for...in`-Schleife zuerst, ob von allem genug da ist, und erst eine zweite Schleife zieht die Kosten ab. So verliert man nichts, wenn nur ein Rohstoff fehlt
- Der Kostentext auf dem Button (z. B. „700 Geld, 200 Holz“) wird in einer Schleife aus dem Preis-Objekt zusammengesetzt
- Pixel-Art-Icons in 16×16 (Rohstoffe) und 32×32 (Maschinen) Pixeln, im Spiel einheitlich auf das Doppelte vergrößert, damit alle Pixel gleich groß sind; `image-rendering: pixelated` hält sie scharf, und ein helleres Feld dahinter sorgt für Kontrast auf den dunklen Karten
- Verkaufspreise ausbalanciert: Verarbeiten lohnt sich, und jede Maschine bringt mehr Gewinn pro Minute als die vorherige
- Musik über das `Audio`-Objekt: Das `ended`-Event startet das nächste Lied, mit `%` beginnt die Playlist danach wieder von vorn
- Entwicklung mit Git in kleinen Commits; größere Funktionen (Design, Maschinen, Lager) baue ich auf eigenen Branches und merge sie danach in `master`

## Über das Projekt

Ich programmiere ResourceFoundry, um mir Programmieren selbst beizubringen, und möchte mich um eine Ausbildung als Fachinformatiker für Anwendungsentwicklung bewerben. Parallel lerne ich C# mit meiner Lagerverwaltung [StockFoundry](https://github.com/Clothosummoner/StockFoundry).

## Geplant

- Händler und automatischer Verkauf
- Offline-Fortschritt: Die Arbeiter arbeiten weiter, während das Spiel geschlossen ist
- Ressourcen in mehreren Stufen und ein großes Endziel
- Einstellungen im Menü, z. B. Lautstärke
- Quests und zufällige Ereignisse

## Starten

Einfach den Link oben öffnen – oder das Repository herunterladen und `index.html` im Browser öffnen.

## Credits

- Icons: selbst gezeichnet mit [Piskel](https://www.piskelapp.com)
- Schriftart: [Cinzel](https://fonts.google.com/specimen/Cinzel) (SIL Open Font License)
- Amboss-Sound: freesound_community via [Pixabay](https://pixabay.com) (Pixabay Content License)
- Menümusik: „Sword“ von its_tigri via [Pixabay](https://pixabay.com) (Pixabay Content License)
- Spielmusik (alle via [Pixabay](https://pixabay.com), Pixabay Content License):
  - „Medieval Kingdoms“ von Daniel Roberts
  - „Mountain Knight Castle“ von Vlad Bakutov
  - „Medieval Celtic Violin“ von _Music_for_Creators_
  - „Musik Hintergrund“ von OTH Amberg-Weiden