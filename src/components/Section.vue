<template>
    <div class="container">
        <section id="hero" class="barcodeapp_select">
            <div class="row align-items-center justify-content-between">
                <div class="col-6 me-auto">
                    <h1>Hi, Peeps!</h1>
                    <h2>Today is a beautiful day</h2>
                </div>
                <div class="col-6 ms-auto text-end">
                    <img src="/assets/images/icon-login.svg" width="400px" height="400px" alt="" class="src">
                </div>
            </div>
        </section>
    
        <section id="hero" class="barcode_infobox">
            <div class="row align-items-start">
                <div class="col-md-4 my-auto">
                    <router-link to="/master-part" class="text-decoration-none">
                        <div class="info-box-2 bg-indigo d-flex align-items-center justify-content-center">
                            <div class="img-icon">
                                <img src="/assets/images/setting.svg" alt="">
                            </div>
                            <div class="content_text">Master Parts</div>
                            <div class="img-icon-right">
                                <img src="/assets/images/show.svg" alt="">
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="col-md-4 my-auto">
                    <router-link to="/scan-barcode" class="text-decoration-none">
                        <div class="info-box-2 bg-indigo d-flex align-items-center justify-content-center">
                            <div class="img-icon">
                                <img src="/assets/images/barcode.svg" alt="">
                            </div>
                            <div class="content_text">Scan Barcode</div>
                            <div class="img-icon-right">
                               <img src="/assets/images/show.svg" alt="">
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="col-md-4 my-auto">
                    <router-link to="/stock-take" class="text-decoration-none">
                        <div class="info-box-2 bg-indigo d-flex align-items-center justify-content-center">
                            <div class="img-icon">
                                <img src="/assets/images/tasksquare.svg" alt="">
                            </div>
                            <div class="content_text">Stock Take</div>
                            <div class="img-icon-right">
                                <img src="/assets/images/show.svg" alt="">
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>            
        </section>  
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'section-hero',

}
</script>



