<script setup lang="ts">
import { ref } from 'vue';
import axios from '@/libs/axios';
import type { User } from '@/types';
import * as Yup from "yup";
import { toast } from 'vue3-toastify';
import { block, unblock } from '@/libs/utils';

const user = ref<User>({} as User);
const formRef = ref()

const formSchema = Yup.object().shape({
    nama: Yup.string().required().label('Nama'),
    email: Yup.string().email('Invalid Email').required().label('Email'),
    nomor: Yup.string().matches(/^08[0-9]\d{8,11}$/, 'Invalid nomor telepon').required().label('Nomor'),
    password: Yup.string().min(8, 'Password minimal harus diisi 8 karakter').required().label('Password'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password')], 'Passwords harus sesuai').required().label('Password Confirmation'),
})

function submit () {
    block(document.getElementById('form-register'));
    const formData = new FormData();
    formData.append('name', user.value.name);
    formData.append('nomor', user.value.nomor);
    formData.append('email', user.value.email);

    if(user.value?.password){
        formData.append('password', user.value.password);
        formData.append('password_confirmation', user.value.passwordConfirmation);
    }


    axios({
        method: 'post',
        url: 'auth/register',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(() => {
        toast.success("Registrasi berhasil!");
        formRef.value.resetForm();
    })
    .catch((error: any) => {
        toast.error(error.response.data.message);
    })
    .finally(() => {
        unblock(document.getElementById('form-register'));
    })
}


</script>

<template>
    <VForm @submit="submit" :validation-schema="formSchema" ref="formRef"  id="form-register" class="w-full h-full flex items-center justify-center">
        <div class="w-full max-w-md flex flex-col border-[1px] border-gray-700 rounded-xl p-6 space-y-4">
            <!-- begin:title -->
            <h2 class="text-xl font-semibold mb-7 text-center">Registrasi</h2>
            <!-- end:title -->
            <div class="flex flex-col gap-5">
                <!-- begin:input -->
                <div class="flex flex-col gap-3">
                    <!-- begin:title:input -->
                    <label class="text-lg font-medium">Nama</label>
                    <!-- end:title:input -->
                     <div class="flex flex-col">
                         <Field  name="name" type="text" autocomplete="off" v-model="user.nama" class="border p-2 rounded bg-transparent" placeholder="Masukkan Nama" />
                         <ErrorMessage name="name" class="text-red-500" />
                    </div>
                </div>
                <!-- end:input -->
                <!-- begin:input -->
                <div class="flex flex-col gap-3">
                    <!-- begin:title:input -->
                    <label class="text-lg font-medium">Email</label>
                    <!-- end:title:input -->
                     <div class="flex flex-col">
                         <Field  name="email" type="text" autocomplete="off" v-model="user.email" class="border p-2 rounded bg-transparent" placeholder="Masukkan Email" />
                         <ErrorMessage name="email" class="text-red-500" />
                    </div>
                </div>
                <!-- end:input -->
                <!-- begin:input -->
                <div class="flex flex-col gap-3">
                    <!-- begin:title:input -->
                    <label class="text-lg font-medium">No Telepon</label>
                    <!-- end:title:input -->
                     <div class="flex flex-col">
                         <Field  name="phone" type="text" autocomplete="off" v-model="user.nomor" class="border p-2 rounded bg-transparent" placeholder="Masukkan No Telepon" />
                         <ErrorMessage name="phone" class="text-red-500" />
                    </div>
                </div>
                <!-- end:input -->
                <!-- begin:input -->
                <div class="flex flex-col gap-3">
                    <!-- begin:title:input -->
                    <label class="text-lg font-medium">Password</label>
                    <!-- end:title:input -->
                     <div class="flex flex-col">
                         <Field  name="password" type="password" autocomplete="off" v-model="user.password" class="border p-2 rounded bg-transparent" placeholder="Masukkan Password" />
                         <ErrorMessage name="password" class="text-red-500" />
                    </div>
                </div>
                <!-- end:input -->
                <!-- begin:input -->
                <div class="flex flex-col gap-3">
                    <!-- begin:title:input -->
                    <label class="text-lg font-medium">Konfirmasi Password</label>
                    <!-- end:title:input -->
                     <div class="flex flex-col">
                         <Field  name="passwordConfirmation" type="password" autocomplete="off" v-model="user.passwordConfirmation" class="border p-2 rounded bg-transparent" placeholder="Masukkan Konfirmasi Password" />
                         <ErrorMessage name="passwordConfirmation" class="text-red-500" />
                    </div>
                </div>
                <!-- end:input -->
                <div class="flex w-full justify-center mt-3">
                    <button type="submit" class="bg-sky-600 p-4 rounded-lg text-white text-semibold text-md">Registrasi</button>
                </div>
            </div>
        </div>
    </VForm>
</template>