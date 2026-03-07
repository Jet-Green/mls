<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const auth = useAuth();
let { user } = auth

</script>

<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 80vh;">
    <v-card class="pa-6" width="400" elevation="4">
      <v-card-title class="text-center text-h5 mb-4">
        Личный кабинет
      </v-card-title>
      <v-card-text class="text-center">
        <div class="mb-4">
          <div class="text-subtitle-2 text-grey">Имя и фамилия</div>
          <div class="text-h6">{{ user?.name }}</div>
        </div>
        <div class="mb-6">
          <div class="text-subtitle-2 text-grey">Email</div>
          <div class="text-body-1">{{ user?.email }}</div>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between mt-2">
        <v-btn color="primary" variant="outlined" @click="" class="flex-grow-1 mr-2">
          Изменить данные
        </v-btn>
        <v-btn color="error" variant="outlined" @click="auth.logout()" class="flex-grow-1 ml-2">
          Выйти
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>