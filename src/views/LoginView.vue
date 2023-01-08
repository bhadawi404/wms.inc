<template>

    <div class="container-fluid">
        <form @submit.prevent="login">
            <div class="row">
                <div class="col-sm-6 px-0-custom d-none d-sm-block">
                    <img src="../assets/icon-login.svg" alt="login image" class="login-img">
                </div>
                <div class="col-sm-6 login-section-wrapper">
                    <nav class="navbar bg-body-tertiary">
                        <div class="container-fluid">
                            <img src="../assets/Logo.svg" alt="" class="src">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default dropdown-toggle" data-bs-toggle="dropdown"
                                    data-bs-display="static" aria-expanded="false">
                                    ENG
                                </button>
                                <ul class="dropdown-menu dropdown-menu-lg-end">
                                    <li><button class="dropdown-item" type="button">ID</button></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <br />
                    <br />

                    <div class="container text-start">
                        <div class="row align-items-start">
                            <h2 style="color: #1B275F; font-family: Inter;">Login</h2>
                        </div>
                        <div class="row align-items-start mb-2">
                            <span class="mb-2" style="color: #4A4E69;">Please enter your email and password</span>

                        </div>
                        <div v-if="errors.wrong_credential" class="alert alert-danger mb-2" role="alert">
                            {{ errors.wrong_credential }}
                        </div>
                    </div>

                    <div class="container text-start">
                        <div class="row align-items-start mb-3">
                            <label class="mb-1">Email Address</label>
                            <div class="inner-addon left-addon mb-1">
                                <i class="bi bi-envelope"></i>
                                <input type="text" class="form-control" placeholder="yourmail@domain.com" id="email"
                                    v-model="email" />

                            </div>
                            <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
                        </div>
                        <div class="row align-items-start mb-3">
                            <label class="mb-1">Password</label>
                            <div class="inner-addon left-addon mb-1">
                                <i class="bi bi-lock"></i>
                                <input type="password" class="form-control" placeholder="8+ letters and numbers"
                                    id="password" v-model="password" />

                            </div>
                            <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
                        </div>
                        <div class="d-flex mb-5 align-items-center">
                            <div class="col-md-8">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="mySwitch" name="darkmode">
                                    <label class="form-check-label" for="mySwitch">Keep me logged in</label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <span class="ml-auto"><a href="#" class="forgot-pass">Forgot Password</a></span>
                            </div>

                        </div>
                    </div>

                    <button type="submit" class="btn btn-block btn-login">Login</button>

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
        login() {
            if (this.is_valid()) {
                const url = '/user/login/';
                // eslint-disable-next-line no-undef
                axios.post(url, { email: this.email, password: this.password })
                    .then(response => {
                        console.log(response.data);
                        this.$store.commit('setToken', response.data)
                        this.email = "";
                        this.password = "";
                        this.$router.replace({ name: "home" });
                    })
                    .catch(error => {
                        if (error.response.data.msg) {
                            this.errors.wrong_credential = error.response.data.msg;
                        }
                        if (error.response.data.email) {
                            this.errors.wrong_credential = error.response.data.email[0];
                        }
                    })
            }
        }
    }

};
</script>
<style>
body {
    font-family: "Karla", sans-serif;
    background-color: #fff;
    min-height: 100vh;
}

.bi {
    position: absolute;
    top: calc(25%);
    left: 1.25rem;
}

.inner-addon {
    position: relative;
}

/* style glyph */
.inner-addon .glyphicon {
    position: absolute;
    padding: 10px;
    pointer-events: none;
}

/* align glyph */
.left-addon .glyphicon {
    left: 0px;
}

.right-addon .glyphicon {
    right: 0px;
}

/* add padding  */
.left-addon input {
    padding-left: 30px;
}

.right-addon input {
    padding-right: 30px;
}

/* enable absolute positioning */
.inner-addon {
    position: relative;
}

/* style glyph */
.inner-addon .glyphicon {
    position: absolute;
    padding: 10px;
    pointer-events: none;
}

/* align glyph */
.left-addon .glyphicon {
    left: 0px;
}

.right-addon .glyphicon {
    right: 0px;
}

/* add padding  */
.left-addon input {
    padding-left: 30px;
}

.right-addon input {
    padding-right: 30px;
}

.btn-login {
    background-color: #1B275F;
    color: #fff;
    font-weight: bold;
    letter-spacing: 0.05em;
    border-radius: 8;
}

.btn-login:hover,
.btn-login:active,
.btn-login:focus,
.btn-login.active {
    /* let's darken #004E64 a bit for hover effect */
    background: #1B275F;
    color: #ffffff;
    border-color: #1B275F;
}

.px-0-custom {
    background-color: #F9F9F9;
}

.brand-wrapper {
    padding-top: 7px;
    padding-bottom: 8px;
}

.brand-wrapper .logo {
    height: 25px;
}

.login-section-wrapper {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    padding: 27px 100px;
    background-color: #fff;
}

@media (max-width: 991px) {
    .login-section-wrapper {
        padding-left: 50px;
        padding-right: 50px;
    }
}

@media (max-width: 575px) {
    .login-section-wrapper {
        padding-top: 20px;
        padding-bottom: 20px;
        min-height: 100vh;
    }
}

.login-wrapper {
    width: 300px;
    max-width: 100%;
    padding-top: 24px;
    padding-bottom: 24px;
}

@media (max-width: 575px) {
    .login-wrapper {
        width: 100%;
    }
}

.login-wrapper label {
    font-size: 14px;
    font-weight: bold;
    color: #b0adad;
}

.login-wrapper .form-control {
    border: none;
    border-bottom: 1px solid #e7e7e7;
    border-radius: 0;
    padding: 9px 5px;
    min-height: 40px;
    font-size: 18px;
    font-weight: normal;
}

.login-wrapper .form-control::-webkit-input-placeholder {
    color: #b0adad;
}

.login-wrapper .form-control::-moz-placeholder {
    color: #b0adad;
}

.login-wrapper .form-control:-ms-input-placeholder {
    color: #b0adad;
}

.login-wrapper .form-control::-ms-input-placeholder {
    color: #b0adad;
}

.login-wrapper .form-control::placeholder {
    color: #b0adad;
}

.login-wrapper .login-btn {
    padding: 13px 20px;
    background-color: #fdbb28;
    border-radius: 0;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 14px;
}

.login-wrapper .login-btn:hover {
    border: 1px solid #fdbb28;
    background-color: #fff;
    color: #fdbb28;
}

.login-wrapper a.forgot-password-link {
    color: #080808;
    font-size: 14px;
    text-decoration: underline;
    display: inline-block;
    margin-bottom: 54px;
}

@media (max-width: 575px) {
    .login-wrapper a.forgot-password-link {
        margin-bottom: 16px;
    }
}

.login-wrapper-footer-text {
    font-size: 16px;
    color: #000;
    margin-bottom: 0;
}

.login-title {
    font-size: 30px;
    color: #000;
    font-weight: bold;
    margin-bottom: 25px;
}

.login-img {
    width: 100%;
    height: 100vh;
    -o-object-fit: none;
    object-fit: none;
    -o-object-position: center;
    object-position: center;
}

.has-search .form-control {
    padding-left: 2.375rem;
}

.has-search .form-control-feedback {
    position: absolute;
    z-index: 1;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
}
</style>
