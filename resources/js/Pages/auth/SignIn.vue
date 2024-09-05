<script setup lang="ts">
import { ref } from 'vue';
import axios from '@/libs/axios';
import { User } from '@/types';
import { block, unblock } from '@/libs/utils';
import * as Yup from "yup";
import { toast } from 'vue3-toastify';
import { useAuthStore } from '@/stores/auth';
import { Field, Form as VForm, ErrorMesssage } from 'vee-validate';
import { useRoute } from 'vue-router';

const formRef = ref()
const user = ref<User>({} as User);
const store = useAuthStore();
const showPw = ref(false);
const passwordField = ref<HTMLInputElement | null>(null);

const formSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required().label('Email'),
    password: Yup.string().min(8, 'Password minimal harus diisi 8 karakter').required().label('Password'),
})

function submit() {
    block(document.getElementById('form-login'));

    axios.post("/auth/login", user.value)
        .then((response: any) => {
            store.setAuth(response.data.user, response.data.token);
            toast.success("Login berhasil!");
        })
        .catch((err: any) => {
            toast.error(err.response.data.message);
        })
        .finally(() => {
            unblock(document.getElementById('form-login'));
        })
}

function togglePass() {
    if (passwordField.value) {
        passwordField.value.type = passwordField.value.type === 'password' ? 'text' : 'password';
        showPw.value = !showPw.value;
    }
}
</script>

<template>
    <VForm :validation-schema="formSchema" ref="formRef" id="form-login" @submit="submit" class="flex justify-center items-center w-full h-full">
        <div class="w-full max-w-md flex flex-col border-[1px] border-gray-700 rounded-xl p-6 space-y-4">
            <h2 class="text-2xl font-bold text-center mb-7">Login</h2>
            <!-- begin:form -->
            <div class="flex flex-col gap-5">
                <!-- begin:input -->
                <div class="flex flex-col gap-3">
                    <label class="text-sm font-semibold">Email</label>
                    <div class="flex flex-col gap-2">
                        <Field autocomplete="off" class="bg-transparent focus:border-gray-600 border-[1px] border-gray-700 rounded-md p-2" name="email"
                            type="email" placeholder="Masukkan Email Anda" v-model="user.email" />
                        <ErrorMessage class="text-red-500" name="email" />
                    </div>
                </div>
                    <!-- end:input -->
                    <!-- begin:input -->
                    <div class="flex flex-col gap-3">
                        <label class="text-sm font-semibold">Password</label>
                        <div class="relative flex flex-col gap-2">
                            <div class="flex relative flex-col">
                                <Field autocomplete="off" class="bg-transparent focus:border-gray-600 border-[1px] border-gray-700 rounded-md p-2"
                                name="password" type="password" placeholder="Masukkan Password Anda"
                                v-model="user.password" />
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                <i class="fa-regular text-xl" :class="{ 'fa-eye' : showPw, 'fa-eye-slash' : !showPw}" @click="togglePass"></i>
                            </span>                                    
                        </div>
                            <ErrorMessage class="text-red-500" name="password" />
                        </div>
                    </div>
                    <!-- end:input -->
                    <div class="flex w-full justify-center mt-3">
                       <button type="submit" class="bg-sky-700 py-3 px-6 rounded-lg text-white text-semibold text-sm">Login</button>
                    </div>
            </div>
        </div>
    </VForm>
</template>