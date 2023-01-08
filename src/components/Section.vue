<template>

    <section id="hero">
        <div class="container text-start">
            <div class="row align-items-start mb-1">
                <div class="col-4 offset-1 my-auto">
                    <h1 style="font-weight: bold;">Hi, Peeps!</h1>
                    <h2>Today is a beautiful day</h2>
                </div>
                <div class="col-5 ">
                    <img src="../assets/icon-login.svg" width="400px" height="400px" alt="" class="src">
                </div>
            </div>
        </div>
        <div class="container text-start">
            <div class="row align-items-start mb-3 ">
            <div class="col-md-4 my-auto">
                <div class="info-box-2 bg-indigo">
                    <div class="img-icon">
                        <img src="../assets/setting.svg" alt="">
                    </div>
                    <div class="content">
                        <div class="text">Master Parts</div>
                    </div>
                    <div class="img-icon-right">
                        <a href=""><img src="../assets/show.svg" alt=""></a>
                    </div>
                </div>
            </div>
            <div class="col-md-4 my-auto">
                <div class="info-box-2 bg-indigo">
                    <div class="img-icon">
                        <img src="../assets/barcode.svg" alt="">
                    </div>
                    <div class="content">
                        <div class="text">Scan Barcode</div>
                    </div>
                    <div class="img-icon-right">
                        <a href=""><img src="../assets/show.svg" alt=""></a>
                    </div>
                </div>
            </div>
            <div class="col-md-4 my-auto">
                <div class="info-box-2 bg-indigo">
                    <div class="img-icon">
                        <img src="../assets/tasksquare.svg" alt="">
                    </div>
                    <div class="content">
                        <div class="text">Stock Take</div>
                    </div>
                    <div class="img-icon-right">
                        <a href=""><img src="../assets/show.svg" alt=""></a>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    </section>
    
        
        


    
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'section-hero',

}
</script>
<style>
#hero {
    min-height: 50vh;
}

.info-box-2 {
    box-shadow: 0 2px 10px rgb(0 0 0 / 20%);
    height: 80px;
    display: flex;
    cursor: default;
    background-color: #fff;
    position: relative;
    overflow: hidden;
    margin-bottom: 30px;
    border-radius: 8px;
}

.bg-indigo {
    background-color: #283A8F !important;
    color: #fff;
}

.info-box-2 .img-icon {
    display: inline-block;
    text-align: center;
    width: 80px;
    top: 10.67%;
    position: absolute;
}
.info-box-2 .img-icon-right {
    display: inline-block;
    text-align: right;
    width: 250px;
    top: 30.67%;
    position: absolute;
}

.info-box-2 .content {
    display: inline-block;
    padding: 10px 70px;
}

.info-box-2 .content .text {
    font-family: 'Inter';
    font-weight: 600;
    font-size: 20px;
    margin-top: 11px;
    color: rgb(255, 255, 255);
}
</style>


