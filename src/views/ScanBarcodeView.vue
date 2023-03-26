<template>
    <div class="inside_scanbar d-flex">
        <div class="leftside_v_menu">
            <LeftSideMenu></LeftSideMenu>         
        </div>
        <div class="rightside_div">
            <Navigation />
            <div class="main_content">
                <div class="container text-start">
                    <a href="/home" class="btn_back">Back</a>
                    <div class="row">
                        <div class="col-md-6 col-lg-6 col-sm-12 col-12">
                            <div class="barcode_card">
                                <a href="/internal-transfer" class="text-decoration-none">
                                    <div class="icon_card">
                                        <img src="/assets/images/bitcoinconvert.svg" alt="" title="" />
                                    </div>
                                    <div class="card_title d-flex justify-content-between align-items-center">
                                        <h3>Internal Tranfer</h3>
                                        <div class="img-icon-right">
                                            <img src="/assets/images/arrowright.svg" alt="">
                                        </div>
                                    </div>
                                    <img src="/assets/images/bitcoinconvert.svg" alt="" title="" class="icon_absolute"/>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-sm-12 col-12">
                            <div class="barcode_card">
                                <a href="/purchase-order" class="text-decoration-none">
                                    <div class="icon_card">
                                        <img src="/assets/images/shoppingcart.svg" alt="" title="" />
                                    </div>
                                    <div class="card_title d-flex justify-content-between align-items-center">
                                        <h3>In Purchase</h3>
                                        <div class="img-icon-right">
                                            <img src="/assets/images/arrowright.svg" alt="">
                                        </div>
                                    </div>
                                    <img src="/assets/images/shoppingcart.svg" alt="" title="" class="icon_absolute"/>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-sm-12 col-12">
                            <div class="barcode_card">
                                <a href="/consume-issued" class="text-decoration-none">
                                    <div class="icon_card">
                                        <img src="/assets/images/shoppingbag.svg" alt="" title="" />
                                    </div>
                                    <div class="card_title d-flex justify-content-between align-items-center">
                                        <h3>Consume Issued</h3>
                                        <div class="img-icon-right">
                                            <img src="/assets/images/arrowright.svg" alt="">
                                        </div>
                                    </div>
                                    <img src="/assets/images/shoppingbag.svg" alt="" title="" class="icon_absolute"/>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-sm-12 col-12">
                            <div class="barcode_card">
                                <a href="/return" class="text-decoration-none">
                                    <div class="icon_card">
                                        <img src="/assets/images/box.svg" alt="" title="" />
                                    </div>
                                    <div class="card_title d-flex justify-content-between align-items-center">
                                        <h3>Return Item</h3>
                                        <div class="img-icon-right">
                                            <img src="/assets/images/arrowright.svg" alt="">
                                        </div>
                                    </div>
                                    <img src="/assets/images/box.svg" alt="" title="" class="icon_absolute"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Navigation from "../components/Navigation.vue";
import LeftSideMenu from "../components/LeftSideMenu.vue";


export default {
    name: "ScanBarcodeView",
    components: {
      Navigation,
      LeftSideMenu,
    },
};
</script>
  