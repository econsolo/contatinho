import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { ToastController, NavController } from '@ionic/angular';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { ToastUtil } from 'src/app/utils/toast.util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  private form: FormGroup;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private toastCtrl: ToastController,
    private navCtrl: NavController) {

    this.form = this.createForm();
  }

  ngOnInit() {
    this.get(this.route.snapshot.paramMap.get('id'));
  }

  public save(contact: any): void {

    if (!contact.id)
      this.add(contact);
    else
      this.update(contact);

  }

  public back(): void {
    this.navCtrl.navigateBack('/');
  }

  private get(id: string): void {
    if (!id) return;
    this.contactService.find(id).subscribe((contact: any) => {
      this.form.setValue(contact);
    });
  }

  private add(contact: any): void {
    this.contactService.post(contact).subscribe(() => this.showSuccess('salvo'));
  }

  private update(contact: any): void {
    this.contactService.put(contact).subscribe(() => this.showSuccess('atualizado'));
  }

  private showSuccess(action: string): void {
    ToastUtil.show(this.toastCtrl, `Contato ${action}!`);
    this.back();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      id: ['', []],
      name: ['', [
        CustomValidator.required,
        CustomValidator.maxLength(80),
        CustomValidator.minLength(3)
      ]],
      email: ['', [
        CustomValidator.required,
        CustomValidator.maxLength(100),
        CustomValidator.email
      ]],
      phone: ['', [
        CustomValidator.required,
        CustomValidator.maxLength(15)
      ]],
      image: ['https://picsum.photos/300/300', [
        CustomValidator.required,
      ]],
      address: ['', [
        CustomValidator.required,
        CustomValidator.maxLength(200)
      ]]
    });
  }
}
