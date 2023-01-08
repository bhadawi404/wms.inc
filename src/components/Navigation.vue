<template>
    <div class="navigation">
        <header class="py-3 mb-4">
            <div class="container d-flex flex-wrap justify-content-center">
                <a href="/home" class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
                    <img src="../assets/Logo.svg" alt="" class="src">
                </a>
                <form class="col-12 col-lg-auto mb-3 mb-lg-0">
                    <a href="#" class="btn btn-block btn-login">Home</a>
                    <div class="btn-group">
                        <button type="button" class="btn btn-default dropdown-toggle" data-bs-toggle="dropdown"
                            data-bs-display="static" aria-expanded="false">
                            ENG
                        </button>
                        <ul class="dropdown-menu dropdown-menu-lg-end">
                            <li><button class="dropdown-item" type="button">ID</button></li>
                        </ul>
                    </div>
                </form>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Navigation',

}
</script>


