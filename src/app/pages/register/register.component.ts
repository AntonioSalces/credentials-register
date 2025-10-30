import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]]    
    });
  }

  getError(controlName: string): string {
  const control = this.registerForm.get(controlName);
  if (control?.errors) {
    if (control.errors['required']) {
      return 'Este campo es obligatorio';
    }
    if (control.errors['email']) {
      return 'Introduce un email válido';
    }
    if (control.errors['pattern']) {
      return 'La contraseña debe tener mayúsculas, minúsculas, números y al menos 8 caracteres';
    }
    if (control.errors['minlength']) {
      return 'La contraseña es demasiado corta';
    }
  }
  return '';
}


  onSubmit() {
  console.log('onSubmit ejecutado');
  if (this.registerForm.valid) {
    const newCredential = {
      nombre: this.registerForm.value.nombre,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    // Contar cuántas cookies hay que empiezan por credential_
    const allCookies = document.cookie.split('; ');
    const credentialCookies = allCookies.filter(row => row.startsWith('credential_'));
    const nextIndex = credentialCookies.length + 1;

    // Guardar la credencial en una cookie separada, en formato crudo
    document.cookie = `credential_${nextIndex}=${JSON.stringify(newCredential)}; path=/; max-age=${60 * 60 * 24 * 7}`;

    this.registerForm.reset();
    alert(`Usuario registrado en cookie credential_${nextIndex}!`);
  }
}


}