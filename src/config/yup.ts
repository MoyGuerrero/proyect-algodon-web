import * as yup from 'yup';




yup.setLocale({

  mixed: {
    required: 'Este campo es requerido',
  },
  string: {
    email: 'Debe de ser un correo electronico valido'

  }
});
