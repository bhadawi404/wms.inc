<template>
    <div>
        <a href="/home" class="logo_sidemenu">
            <img src="/assets/images/favicon.svg" alt="" class="src">
        </a>
        <div class="d-flex justify-content-between flex-column inside_vertical_menu">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link active" href="javascript:void(0)">
                        <img src="/assets/images/home.svg" alt="" title="" />
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0)">
                        <img src="/assets/images/activity.svg" alt="" title="" />
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0)">
                        <img src="/assets/images/briefcase.svg" alt="" title="" />
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0)">
                        <img src="/assets/images/profile_user.svg" alt="" title="" />
                    </a>
                </li>
            </ul>
            <ul class="nav flex-column">
                <li class="nav-item mt-auto">
                    <a class="nav-link" @click="logout()">
                        <img src="/assets/images/logout.svg" alt="" title="" />
                    </a>
                </li>
            </ul>
        </div> 
    </div>
</template>
  
<script>

export default {
    name: "LeftSideMenu",
    components: {
    },
    methods: {
        logout(){
            localStorage.removeItem('token')
            this.$router.push('/')
        }
    }
};
</script>
  