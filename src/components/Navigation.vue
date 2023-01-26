<template>
    <header class="navigation">
        <div class="container d-flex flex-wrap align-items-center justify-content-between">
            <a href="/home" class="text-decoration-none d-flex align-items-center">
                <img src="/assets/images/favicon.svg" alt="" class="src">
                <h1>WMS Inc.</h1>
            </a>
            <form class="login-section-wrapper">
                <a href="#" class="btn-login">Home</a>
                <div class="btn-group ms-4">
                    <button type="button" class="btn btn-default dropdown-toggle" data-bs-toggle="dropdown"
                        data-bs-display="static" aria-expanded="false">
                        ENG
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end p-0">
                        <li><button class="dropdown-item" type="button">ID</button></li>
                    </ul>
                </div>
            </form>
        </div>
    </header>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Navigation',

}
</script>


