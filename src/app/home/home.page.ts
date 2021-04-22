import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

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
  private onEintragSpeichern() {

    const eintragTrimmed = this.eintrag.trim();

    if (eintragTrimmed.length === 0) {

      this.zeigeDialog("Fehler", "Kein Text eingegeben.");
      return;
    }

    this.eintrag = "";
  }


  /**
   * Alert anzeigen, siehe auch https://ionicframework.com/docs/api/alert
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
   * Toast anzeigen, siehe auch https://ionicframework.com/docs/api/toast
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
