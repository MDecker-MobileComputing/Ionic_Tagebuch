import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /** Inhalt von Textarea mit Tagebucheintrag. */
  private eintrag = "";


  /**
   * Konstruktor mit leerem Rumpf wird benötigt, um AlertController-
   * und ToastController-Instanz als Member-Variable zu erhalten.
   */
  constructor( private alertCtrl      : AlertController,
               private toastController: ToastController ) {}


  /**
   * Event-Handler für Button "Eintrag speichern".
   */
  private async onEintragSpeichern() {

    const eintragTrimmed = this.eintrag.trim();

    if (eintragTrimmed.length === 0) {

      this.zeigeDialog("Fehler", "Kein Text eingegeben.");
      return;
    }

    await this.eintragSpeichern(eintragTrimmed);

    this.eintrag = "";
  }

  /**
   * Hängt `eintrag` an Tagebuchdatei an.
   *
   * @param eintrag Tagebucheintrag, der an Textdatei anzuhängen.
   */
  private async eintragSpeichern(eintrag: string) {

    let permissionStatus = await Filesystem.requestPermissions();
    if (permissionStatus.publicStorage !== "granted") {

      this.zeigeDialog("Berechtigungsfehler", 
                       "Die App hat derzeit nicht die Berechtigung in den Documents-Ordner zu schreiben.");
      return;
    }

    const trennstrich = this.getTrennstrich();

    try {
      
      await Filesystem.appendFile({
        path: "tagebuch.txt",
        data: trennstrich + eintrag + "\n\n",
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });

      this.zeigeToast("Eintrag gespeichert.");
    }
    catch (ex) {

      this.zeigeDialog("Fehler", "Fehler bei Schreibzugriff auf Datei: " + ex);
    }
  }

  /**
   * Hilfsmethode: String mit Trennstrich erzeugen, der vor einem neuen Tagebucheintrag in die Textdatei 
   * geschrieben wird.
   * 
   * @returns Trennstrich mit Datum und Uhrzeit
   */
  private getTrennstrich(): string {

    const datum = new Date();

    const minutenStr = datum.getMinutes() < 10 ? `0${datum.getMinutes()}` : `${datum.getMinutes()}`;

    const datumZeitStr = `${datum.getDate()}.${datum.getMonth() + 1}.${datum.getFullYear()} - ${datum.getHours()}:${minutenStr}`;

    return `\n=================== ${datumZeitStr} ===================\n\n`;
  }

  /**
   * Hilfsmethode: Alert anzeigen, siehe auch https://ionicframework.com/docs/api/alert
   *
   * @param titel Titel des Dialogs
   * @param nachricht Im Dialog anzuzeigender Text
   */
   async zeigeDialog(titel: string, nachricht: string) {

    const meinAlert =
          await this.alertCtrl.create({
              header  : titel,
              message : nachricht,
              buttons : [ "Ok" ]
          });

    await meinAlert.present();
  }


  /**
   * Hilfsmethode: Toast anzeigen, siehe auch https://ionicframework.com/docs/api/toast
   *
   * @param nachricht Im Toast anzuzeigender Text
   */
  async zeigeToast(nachricht: string) {

    const toast =
          await this.toastController.create({
              message : nachricht,
              duration: 2000  // 2000 ms = 2 seconds
          });

    await toast.present();
  }

}
