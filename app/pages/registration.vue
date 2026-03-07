<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
// import _ from 'lodash'

const router = useRouter()
const route = useRoute()
const auth = useAuth()

/*
/registration/employee?name=Григорий&email=grishadzyin@gmail.com&tgId=1155714398&tgUsername=grisha_tg
*/
const emailFromQuery = ref(route.query.email as string || '');
const nameFromQuery = ref(route.query.name as string || '');

console.log(nameFromQuery.value);

const { meta, handleSubmit } = useForm<{
  name: string,
  email: string,
  password: string,
}>({
  initialValues: {
    name: nameFromQuery.value,
    email: emailFromQuery.value,
    password: '',
  },
  validationSchema: {
    name(value: string) {
      if (!value) return 'Введите ФИО'
      if (value.length < 4) return 'Слишком короткое ФИО'
      if (value.length > 200) return 'Слишком длинное ФИО'
      return true
    },
    email(value: string) {
      if (!value) return 'Введите почту'
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value))
        return 'Некорректный формат почты'
      return true
    },
    password(value: string) {
      if (!value) return 'Введите пароль'
      if (value.length < 8) return 'Пароль должен быть не менее 8 символов'
      if (value.length > 30) return 'Слишком длинный пароль'
      return true
    },
  },
})

let name = useField<string>('name')
let email = useField<string>('email')
let password = useField<string>('password')

let show_password = ref(false)
let loading = ref(false)

const submit = handleSubmit(async values => {
  loading.value = true
  const finalValues: any = {
    ...values,
    email: email.value.value,
  };

  let isSuccessfulRegistration = await auth.registration(Object.assign(finalValues, {
    roles: ["customer"],
  }))

  if (isSuccessfulRegistration) {
    router.push(`/`)
  }

  loading.value = false
})

onMounted(() => {
  if (emailFromQuery.value) {
    email.setValue(emailFromQuery.value);
  }
})
</script>

<template>
  <v-container>
    <v-col cols="12" xs="12" sm="10" md="7" lg="5" class="mt-4 ma-auto">
      <v-card class="d-flex flex-column 
        justify-center align-center 
        text-center w-100 pa-6 rounded-lg">
        <div class="text-h6 font-weight-bold">
          Регистрация
        </div>
        <v-form class="mt-6 w-100" @submit.prevent="submit">
          <v-text-field label="ФИО" placeholder="Иван Иванов Иванович" v-model="name.value.value"
            :error-messages="name.errors.value" variant="outlined" density="compact" class="w-100" />

          <v-text-field label="Email" type="email" placeholder="ivan@mail.com" v-model="email.value.value"
            :error-messages="email.errors.value" variant="outlined" density="compact" class="w-100 mt-1" />

          <v-text-field label="Пароль" v-model="password.value.value"
            :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="show_password = !show_password" :type="show_password ? 'text' : 'password'"
            :error-messages="password.errorMessage.value" variant="outlined" density="compact" class="w-100 mt-1" />
          <v-btn type="submit" :disabled="!meta.valid" :loading="loading" color="accent" class="mt-2" block>
            Зарегистрироваться
          </v-btn>
        </v-form>
        <div @click="router.push('/login')" :loading="loading"
          class="text-body-2 w-100 cursor-pointer font-weight-semibold pa-1 mt-4">
          Вход
        </div>
      </v-card>
    </v-col>
  </v-container>
</template>