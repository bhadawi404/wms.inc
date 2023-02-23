<template>
    <div class="container-fluid login-section">
        <form @submit.prevent="submitForm">
            <div class="row">
                <div class="left-login-img d-none d-sm-flex justify-content-around align-items-center">
                    <img src="/assets/images/icon-login.svg" alt="login image" title="">
                </div>
                <div class="login-section-wrapper col-12">
                    <nav class="navbar bg-body-tertiary">
                        <img src="/assets/images/Logo.svg" alt="" title="">
                        <div class="btn-group">
                            <button type="button" class="btn btn-default dropdown-toggle" data-bs-toggle="dropdown"
                                data-bs-display="static" aria-expanded="false">
                                ENG
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end p-0">
                                <li><button class="dropdown-item" type="button">ID</button></li>
                            </ul>
                        </div>
                    </nav>

                    <div class="text-start login-form">
                        <h2>Login</h2>
                        <p class="mb-4">Please enter your email and password</p>
                        <div v-if="errors.wrong_credential" class="alert alert-danger mb-2" role="alert">
                            {{ errors.wrong_credential }}
                        </div>
                        <div class="mb-4">
                            <label>Email Address</label>
                            <div class="input-group form-input">
                                <span class="input-group-text">
                                    <img src="/assets/images/mail.svg" alt="" title="" />
                                </span>
                                <input type="text" class="form-control" placeholder="yourmail@domain.com" id="email" v-model="email" />
                            </div>
                            <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
                        </div>
                        <div class="mb-4">
                            <label>Password</label>
                            <div class="input-group form-input">
                                <span class="input-group-text">
                                    <img src="/assets/images/lock.svg" alt="" title="" />
                                </span>
                                <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="8+ letters and numbers" id="password" v-model="password" />
                                <span @click="handleClick" class="input-group-text" >
                                    <img v-if="!showPassword" src="/assets/images/eye.svg" alt="" title="" />
                                    <img v-if="showPassword" src="/assets/images/hide.png" width="22" height="22" alt="" title="" />
                                </span>
                            </div>
                            <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
                        </div>
                        <div class="d-flex mb-4 align-items-center justify-content-between">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="mySwitch" name="darkmode">
                                <label class="form-check-label mb-0" for="mySwitch">Keep me logged in</label>
                            </div>
                            <a href="#" class="forgot-password-link text-decoration-none">Lupa Password?</a>
                        </div>
                        <button type="submit" class="btn btn-block btn-login">Login</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "LoginView",
    data() {
        return {
            showPassword: false,
            email: "",
            password: "",
            errors: {
                email: "",
                password: "",
                wrong_credential: ""
            }
        }
    },
    methods: {
        is_valid() {
            let valid = true;
            if (!this.email) {
                this.errors.email = "The field cannot be blank";
            }
            else {
                this.errors.email = "";
            }
            if (!this.password) {
                this.errors.password = "The field cannot be blank";
            }
            else {
                this.errors.password = "";
            }
            if (this.errors.email || this.errors.password) {
                valid = false;
            }
            return valid;
        },
        handleClick() {
            this.showPassword = !this.showPassword
        },
        async submitForm() {
            this.$store.commit('setIsLoading', true)
            if (this.is_valid()) {
                axios.defaults.headers.common['Authorization'] = ''
                localStorage.removeItem('token')

                const formData = {
                    email: this.email,
                    password: this.password
                }
                axios
                .post('/user/login/', formData)
                .then(response => {
                    console.log(response);
                    // return false
                    const token = response.data.token
                    const username = response.data.username

                    this.$store.commit('setToken', token)
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                    localStorage.setItem('token', token)
                    localStorage.setItem('username', username)
                    this.$router.push('/home')

                })
                .catch(error => {
                    if (error.response.data.msg) {
                        this.errors.wrong_credential = error.response.data.msg;
                    }
                    if (error.response.data.email) {
                        this.errors.wrong_credential = error.response.data.email[0];
                    }
                })
                this.$store.commit('setIsLoading', false)
            }
        }
    }

};
</script>

