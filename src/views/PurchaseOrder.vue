<template>
    <div class="inside_scanbar d-flex">
        <div class="leftside_v_menu">
            <LeftSideMenu></LeftSideMenu>
        </div>
        <div class="rightside_div">
            <Navigation />
            <div class="main_content">
                <div class="container text-start">
                    <a href="/scan-barcode" class="btn_back">Back</a>
                    <div class="purchase_order">
                        <h2>Purchase Order
                            <div class="d-flex">
                                <button class="print_btn" @click="showPrintLabelModal">
                                    Print Label
                                </button>
                                <a href="javascript:void(0)" class="scan_btn ms-4" @click="openScanItem" >
                                    Scan Item
                                </a>
                            </div>

                        </h2>
                        <div class="d-flex">
                            <button v-if="isDesktop" class="print_btn" @click="showModal">Scan Purchase Order</button>
                            <button v-if="isDesktop" class="scan_btn ms-4" @click="removeOrder">CLEAR DATA</button>
                            <a href="scanPO" v-else class="scan_btn ms-4" @click="openCamera = !openCamera"
                                data-bs-toggle="modal" data-bs-target="#scanPO">
                                Scan Barcode PO
                            </a>
                        </div>

                        <div class="row purchase_form mt-5">
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Purchase ID</label>
                                <input type="text" class="form-control" v-model="poName" v-on:change="GetBarcode" ref="po"
                                    placeholder="">
                            </div>
                            <!-- <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Purchase Agreement</label>
                                <input type="text" class="form-control" id="" placeholder="">
                            </div> -->
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Vendor</label>
                                <input type="text" class="form-control" v-model="poVendor" id="" placeholder=""
                                    disabled="1">
                            </div>
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Purchase Date</label>
                                <input type="text" class="form-control" v-model="poDate" id="" placeholder="" disabled="1">
                            </div>
                            <!-- <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Vendor Refference</label>
                                <input type="text" class="form-control" id="" placeholder="">
                            </div> -->
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Receipt Date</label>
                                <input type="text" class="form-control" v-model="poReceive" id="" placeholder=""
                                    disabled="1">
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-borderless purchase_table">
                                <thead>
                                    <tr>
                                        <th class="text-center">Product Name</th>
                                        <th class="text-center">Qty Request</th>
                                        <th class="text-center">Qty Received</th>
                                        <th class="text-center">Action</th>
                                        <!-- <th class="text-center">Description</th> -->
                                        <!-- <th class="text-center">UoM</th> -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="data in filteredItems()" :key="data.id">
                                        <td class="text-center">{{ data.productName }}</td>
                                        <td class="text-center">{{ data.productQtyRequestPO }}</td>
                                        <td class="text-center"><button class="input-group-text-inherit" type="button">
                                        <img src="/assets/images/minus.svg" alt="" title="" />
                                    </button><spacer type="horizontal" width="100" height="100"> ♢ </spacer>{{ data.productQtyDone }}<spacer type="horizontal" width="100" height="100"> ♢ </spacer><button class="input-group-text-inherit" type="button">
                                        <img src="/assets/images/plus.svg" alt="" title="" />
                                    </button></td>
                                    <td>
                                        <button type="button" class="btn btn-dm btn-danger" @click="removeItem(data.productId)">Remove</button>
                                    </td>
                                        <!-- <td class="text-center">{{ data.status }}</td> -->
                                        <!-- <td  class="text-center">Bakso sapi</td> -->
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="text-end">
                            <button type="button" class="btn-login" :disabled="this.items.length == 0"
                                @click="validateProduct">

                                <img src="/assets/images/checkmark.png" alt="" title="" class="me-2" /> Validate
                            </button>
                            <!-- <a href="#" >
                            </a> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- print label Modal -->
        <!-- <div class="modal fade" id="printlabel" tabindex="-1" aria-labelledby="printlabelLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" id="printlabelLabel">Print Label</h1>
                    </div>
                    <div class="modal-body">
                        <div class="row purchase_form" v-for="(d, index) in items" :key="index">
                            <div class="col-12" v-for="(data, index1) in d.purchaseOrderLine" :key="index1">
                                <QRCodeVue3 :width="300" :height="300" v-if="data.productBarcode"
                                    :value="data.productBarcode" margin="0"
                                    :qrOptions='{ "typeNumber": "0", "mode": "Byte", "errorCorrectionLevel": "H" }'
                                    :imageOptions='{ "hideBackgroundDots": true, "imageSize": 0.4, "margin": 0 }'
                                    :dotsOptions='{ "type": "dots", "color": "#1a191a" }'
                                    :backgroundOptions='{ "color": "#ffffff" }'
                                    :dotsOptionsHelper='{ "colorType": { "single": true, "gradient": false }, "gradient": { "linear": true, "radial": false, "color1": "#6a1a4c", "color2": "#6a1a4c", "rotation": "0" } }'
                                    :cornersSquareOptions='{ "type": "square", "color": "#000000" }'
                                    :cornersSquareOptionsHelper='{ "colorType": { "single": true, "gradient": false }, "gradient": { "linear": true, "radial": false, "color1": "#000000", "color2": "#000000", "rotation": "0" } }'
                                    :cornersDotOptions='{ "type": "dot", "color": "#000000", "gradient": null }'
                                    :cornersDotOptionsHelper='{ "colorType": { "single": true, "gradient": false }, "gradient": { "linear": true, "radial": false, "color1": "#000000", "color2": "#000000", "rotation": "0" } }'
                                    :backgroundOptionsHelper='{ "colorType": { "single": true, "gradient": false }, "gradient": { "linear": true, "radial": false, "color1": "#ffffff", "color2": "#ffffff", "rotation": "0" } }'
                                    myclass="my-qur"></QRCodeVue3>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-info" @click="downloadQrCode">Download</button>
                        <button type="button" class="btn btn-primary">Done</button>
                    </div>
                </div>
            </div>
        </div> -->

        <!-- print label Modal -->
        <div class="modal" :class="{ 'is-active': printLabelModalIsActive }" id="printlabel" tabindex="-1" aria-labelledby="printlabelLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" id="printlabelLabel">Print Label</h1>
                    </div>
                    <div class="modal-body">
                        <div class="row purchase_form">
                            <div class="col-12">
                                <div class="input-group mb-3">
                                    <button class="input-group-text" type="button" @click="MinQty">
                                        <img src="/assets/images/minus.svg" alt="" title="" />
                                    </button>
                                    <input type="text" class="form-control mb-0 text-center" v-model="quantity"
                                        id="quantity" min="1">
                                    <button class="input-group-text" type="button" @click="MaxQty">
                                        <img src="/assets/images/plus.svg" alt="" title="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="hidePrintLabelModal">Cancel</button>
                        <button type="button" @click="exportToPDF" class="btn btn-primary ms-4">Cetak Barcode</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="scanitem" tabindex="-1" aria-labelledby="scanitemLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" id="scanitemLabel">Scan Item</h1>
                        
                    </div>
                    <span>Please Scan Barcode Item below this</span>
                    <br/>
                    <div class="modal-body">
                        <div class="row purchase_form">
                            <div class="col-12">
                                <label class="form-label">Product Barcode</label>
                                <input type="text" class="form-control" id="" placeholder="" v-model="productBarcode"
                                    v-on:change="searchProduct" ref="product">
                            </div>
                            <div class="col-12">
                                <label class="form-label">Name Item</label>
                                <input type="text" class="form-control" id="" placeholder="" v-model="productName"
                                    disabled="1">
                            </div>
                            <div class="col-12">
                                <div class="input-group mb-3">
                                    <button class="input-group-text" type="button"  @click="MinQtyProductScan">
                                        <img src="/assets/images/minus.svg" alt="" title="" />
                                    </button>
                                    <input type="number" class="form-control mb-0 text-center" v-model="productQty" id=""
                                        placeholder="" >
                                    <button class="input-group-text" type="button"  @click="MaxQtyProductScan">
                                        <img src="/assets/images/plus.svg" alt="" title="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeScanModal" >Close</button>
                        <button type="button" class="btn btn-primary ms-4" @click="searchAndUpdateProduct">ADD</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal Scan PO-->

        <div class="modal fide" :class="{ 'is-active': modalIsActive }" role="dialog" tabindex="-1"
            aria-labelledby="scanitemLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-background" @click="hideModal"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" id="scanitemLabel">Scan PO</h1>
                    </div>
                    <span>Please Scan PO Item below this</span>
                    <br/>
                    <div class="modal-body-wms">
                        <div class="row">
                            <div class="col-12">
                                <label class="form-label">Barcode PO</label>
                                <input type="text" class="form-control col-12" v-model="ponum" v-on:change="GetBarcodePopup" ref="input" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary col-12" @click="hideModal">Cancel</button>
                        <!-- <button type="button" class="btn btn-primary" @click="resetText">Reset</button> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- end-->
        <!-- scan item Modal -->
        <div class="modal fade" id="scanPO" tabindex="-1" aria-labelledby="scanPOLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" id="scanPOLabel">Scan Barcode PO</h1>
                    </div>
                    <div class="modal-body">
                        <div class="row purchase_form">
                            <!-- <div class="col-12">
                                <label class="form-label">Name Item</label>
                                <input type="text" class="form-control" id="" placeholder="">
                            </div>
                            <div class="col-12">
                                <div class="input-group mb-3">
                                    <button class="input-group-text" type="button">
                                        <img src="/assets/images/minus.svg" alt="" title="" />
                                    </button>
                                    <input type="text" class="form-control mb-0 text-center" id="" placeholder="">
                                    <button class="input-group-text" type="button">
                                        <img src="/assets/images/plus.svg" alt="" title="" />
                                    </button>
                                </div>                                
                            </div> -->
                            <!-- <qrcode-stream @decode="onDecode" @init="onInit" v-if="openCamera" /> -->
                            <StreamBarcodeReader @decode="(a, b, c) => onDecode(a, b, c)" @loaded="() => onLoaded()"
                                v-if="openCamera"></StreamBarcodeReader>
                            <span v-if="errorInItem">Item Not Found!</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeModal" data-bs-dismiss="modal"
                            @click="openCamera = !openCamera" v-if="!retryButton">Cancel</button>
                        <router-link to="/scan-barcode" class="btn btn-secondary text-decoration-none" v-if="retryButton">
                            Cancel </router-link>
                        <button type="button" class="btn btn-primary ms-4" v-if="!retryButton">Done</button>
                        <button type="button" class="btn btn-primary ms-4" v-if="retryButton"
                            @click="clickRetryButton">Retry</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Navigation from "../components/Navigation.vue";
import LeftSideMenu from "../components/LeftSideMenu.vue";
// import { QrcodeStream } from 'vue3-qrcode-reader'
import { StreamBarcodeReader } from "vue-barcode-reader";
// import QRCodeVue3 from "qrcode-vue3";
import * as $ from 'jquery';
// import bootstrap from 'bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import JsBarcode from 'jsbarcode';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import html2pdf from "html2pdf.js";

export default {
    name: "PurchaseOrder",
    components: {
        Navigation,
        LeftSideMenu,
        StreamBarcodeReader,
        // QRCodeVue3,
        // QrcodeStream,
        // QrcodeDropZone,
        // QrcodeCapture
    },
    data() {
        return {
            result: '',
            error: '',
            ponum: '',
            poName: '',
            poDate: '',
            poVendor: '',
            poReceive: '',
            openCamera: false,
            barcode: '',
            retryButton: false,
            errorInItem: false,
            modalIsActive: false,
            printLabelModalIsActive: false,
            isDesktop: false,
            productBarcode: '',
            productName: '',
            productQty: 1,
            items: [],
            products: [],
            quantity: 1,
            pickingId : '',
            purchaseOrderLocationSourceId: '',
            purchaseOrderLocationDestinationId: '',
            purchaseOrderCompanyId: '',

        }
    },
    mounted() {
        // this.scanOrder()
        this.focusInput()
        this.focusInputPopUp()
        this.checkIsDesktop();
        window.addEventListener('resize', this.checkIsDesktop);

    },
    watch:{
        productQty(val){
            console.log(val)
            let product = this.items.find(item => item.productBarcode == this.productBarcode);
            if (product && product.productQtyRequestPO < val){
                this.productQty = product.productQtyRequestPO
                this.showNotificationQtyProduct()
            }else if(val <= 0){
                this.productQty = 1
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'The quantity cannot less or equal to zero!!!.'
                })
            }
        }
    },

    methods: {
        // onDecode (result) {
        //     this.result = result
        //     console.log(result)
        //     if(result){
        //         // $('#scanPO').model('close');
        //     }
        // },
        showNotificationQtyProduct() {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The quantity received cannot exceed the quantity requested !!!.'
            })
        },
        showNotificationErrorNot() {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Data Not Found !!!.'
            })
        },
        showNotificationToken() {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Data Not Found !!!.'
            })
        },
        showNotificationSuccess() {
            Swal.fire({
                icon: 'success',
                title: 'Waww...',
                text: 'Data Berhasil di validate'
            })
        },
        checkIsDesktop() {
            this.isDesktop = window.innerWidth >= 768;
        },
        showPrintLabelModal() {
            this.quantity = 1
            this.printLabelModalIsActive = true;
        },
        hidePrintLabelModal() {
            this.quantity = 1
            this.printLabelModalIsActive = false;
        },
        showModal() {
            this.ponum = ''
            this.modalIsActive = true;
            this.$refs.input.focus();
        },
        hideModal() {
            this.modalIsActive = false;
        },
        resetText() {
            this.ponum = ''
        },
        focusInput() {
            this.$refs.po.focus();
        },
        focusInputPopUp() {
            this.$refs.input.focus();
        },
        filteredItems() {
            return this.items.filter(item => {
                return item.status.toLowerCase().includes('1')
            })
            // if (Array.isArray(this.items)) {
            //     this.items.filter(item => item.status === '1');
            // }
        },
        removeItem(id){
            this.items = this.items.filter(item => {
                if(item.productId == id){
                    item.status = "0"
                    item.productQtyDone = 0
                }
                return item;
            })
        },
        cekQty() {
            let product = this.items.find(item => item.productBarcode == this.productBarcode);
            if (product.productQtyRequestPO < this.productQty){
                this.productQty = product.productQtyRequestPO
                this.showNotificationQtyProduct()
                // alert("The quantity received cannot exceed the quantity requested")
            }
        },
        searchProduct() {
            this.items.forEach(x => {
                if (x.productBarcode == this.productBarcode) {
                    this.productQty = x.productQtyDone + 1
                    this.productName = x.productName
                }
            });
        },
        searchAndUpdateProduct() {
            let new_items = []
            let done = ''
            this.items.forEach(x => {
                if (x.productBarcode == this.productBarcode) {
                    done = '1'
                    new_items.push({ 
                                productBarcode: x.productBarcode, 
                                productName: x.productName, 
                                productQtyRequestPO: x.productQtyRequestPO, 
                                productQtyDone: this.productQty, 
                                productId: x.productId, 
                                orderLineId: x.orderLineId, 
                                moveLineId: x.moveLineId, 
                                moveId: x.moveId, 
                                status: '1' 
                            })
                } else {
                    new_items.push({ 
                                productBarcode: x.productBarcode, 
                                productName: x.productName, 
                                productQtyRequestPO: x.productQtyRequestPO, 
                                productQtyDone: x.productQtyDone, 
                                productId: x.productId, 
                                orderLineId: x.orderLineId, 
                                moveLineId: x.moveLineId, 
                                moveId: x.moveId, 
                                status: x.status 
                    })
                }
            });
            this.items = new_items
            if (done == '1') {
                this.productQty = 1
                this.productName = ''
                this.productBarcode = ''
                $('#scanitem').removeClass('show')
                $('#scanitem').css({'display' : 'none'})
            }
        },
        GetBarcode() {
            let data = {
                'barcode': this.poName
            }
            let token = localStorage.getItem('token')
            axios.defaults.headers.common = { 'Authorization': `Bearer ` + token }
            axios.post('/v1/scan/purchase-order/', data).then(response => {
                if (response.data.statusDesc == '401') {
                    this.items = ""
                    this.poName = ""
                    this.poVendor = ""
                    this.poDate = ""
                    this.poReceive = ""
                    this.items = []
                    this.pickingId = ""
                    this.purchaseOrderLocationSourceId= ""
                    this.purchaseOrderLocationDestinationId= ""
                    this.purchaseOrderCompanyId= ""
                    alert('Token has expired!!! Please Login Again')
                    this.$router.push('/')
                } else {
                    // this.showModal = false

                    // for (let i = 0: i < )
                    this.items = []
                    response.data.data[0].purchaseOrderLine.forEach(x => {
                        this.items.push(
                            {   productBarcode: x.productBarcode, 
                                productName: x.productName, 
                                productQtyRequestPO: x.productQtyRequestPO, 
                                productQtyDone: x.productQtyDone, 
                                productId: x.productId, 
                                orderLineId: x.orderLineId, 
                                moveLineId: x.moveLineId, 
                                moveId: x.moveId, 
                                status: '0' 
                            })
                    });
                    this.pickingId = response.data.data[0].pickingId;
                    this.purchaseOrderLocationSourceId= response.data.data[0].purchaseOrderLocationSourceId;
                    this.purchaseOrderLocationDestinationId= response.data.data[0].purchaseOrderLocationDestinationId;
                    this.purchaseOrderCompanyId= response.data.data[0].purchaseOrderCompanyId;
                    this.products = response.data.data[0].purchaseOrderLine;
                    this.poName = response.data.data[0].purchaseOrderName
                    this.poVendor = response.data.data[0].purchaseOrderVendor
                    this.poDate = response.data.data[0].purchaseOrderDateOrder
                    this.poReceive = response.data.data[0].purchaseOrderReceiptDate
                }
            }).catch(error => {
                // alert(error.message)
                if (error.message == 'Request failed with status code 401') {
                    this.pickingId = ""
                    this.purchaseOrderLocationSourceId= ""
                    this.purchaseOrderLocationDestinationId= ""
                    this.purchaseOrderCompanyId= ""
                    this.items = ""
                    this.poName = ""
                    this.poVendor = ""
                    this.poDate = ""
                    this.poReceive = ""
                    this.items = [];
                    this.showNotificationToken()
                    localStorage.removeItem('token')
                    this.$router.push('/')
                } else if (error.message == 'Request failed with status code 404') {
                    this.pickingId = ""
                    this.purchaseOrderLocationSourceId= ""
                    this.purchaseOrderLocationDestinationId= ""
                    this.purchaseOrderCompanyId= ""
                    this.items = ""
                    this.poName = ""
                    this.poVendor = ""
                    this.poDate = ""
                    this.poReceive = ""
                    this.items = [];
                    this.showNotificationErrorNot()
                }
            })
        },
        GetBarcodePopup() {
            let data = {
                'barcode': this.ponum
            }
            let token = localStorage.getItem('token')
            axios.defaults.headers.common = { 'Authorization': `Bearer ` + token }
            axios.post('/v1/scan/purchase-order/', data).then(response => {
                if (response.data.statusDesc == '401') {
                    this.items = ""
                    this.poName = ""
                    this.poVendor = ""
                    this.poDate = ""
                    this.poReceive = ""
                    this.pickingId = ""
                    this.purchaseOrderLocationSourceId= ""
                    this.purchaseOrderLocationDestinationId= ""
                    this.purchaseOrderCompanyId= ""
                    this.items = [];
                    this.showNotificationErrorNot()
                    localStorage.removeItem('token')
                    this.$router.push('/')
                }
                else {
                    this.hideModal();
                    // this.showModal = false
                    // for (let i = 0: i < )
                    response.data.data[0].purchaseOrderLine.forEach(x => {
                        this.items.push({ 
                                productBarcode: x.productBarcode, 
                                productName: x.productName, 
                                productQtyRequestPO: x.productQtyRequestPO, 
                                productQtyDone: x.productQtyDone, 
                                productId: x.productId, 
                                orderLineId: x.orderLineId, 
                                moveLineId: x.moveLineId, 
                                moveId: x.moveId,  
                                status: '0' 
                        })
                    });
                    // this.items = response.data.data[0].purchaseOrderLine;
                    this.pickingId = response.data.data[0].pickingId;
                    this.purchaseOrderLocationSourceId= response.data.data[0].purchaseOrderLocationSourceId;
                    this.purchaseOrderLocationDestinationId= response.data.data[0].purchaseOrderLocationDestinationId;
                    this.purchaseOrderCompanyId= response.data.data[0].purchaseOrderCompanyId;
                    this.products = response.data.data[0].purchaseOrderLine;
                    this.poName = response.data.data[0].purchaseOrderName
                    this.poVendor = response.data.data[0].purchaseOrderVendor
                    this.poDate = response.data.data[0].purchaseOrderDateOrder
                    this.poReceive = response.data.data[0].purchaseOrderReceiptDate
                }
            }).catch(error => {
                // alert(error.message)
                if (error.message == 'Request failed with status code 401') {
                    this.pickingId = ""
                    this.purchaseOrderLocationSourceId= ""
                    this.purchaseOrderLocationDestinationId= ""
                    this.purchaseOrderCompanyId= ""
                    this.items = ""
                    this.poName = ""
                    this.poVendor = ""
                    this.poDate = ""
                    this.poReceive = ""
                    this.items = [];
                    this.showNotificationErrorNot()
                    localStorage.removeItem('token')
                    this.$router.push('/')
                } else if (error.message == 'Request failed with status code 404') {
                    this.pickingId = ""
                    this.purchaseOrderLocationSourceId= ""
                    this.purchaseOrderLocationDestinationId= ""
                    this.purchaseOrderCompanyId= ""
                    this.items = ""
                    this.poName = ""
                    this.poVendor = ""
                    this.poDate = ""
                    this.poReceive = ""
                    this.items = [];
                    this.showNotificationErrorNot()
                    this.ponum = ""
                }
            })
        },
        onDecode(a, b, c) {
            console.log(a, b, c)
            this.barcode = a, b, c;
            this.openCamera = false
            this.retryButton = true
            // var modalToggle =  document.getElementById('closeModal') // relatedTarget
            //         modalToggle.click()
            if (a) {
                this.scanOrder()
            }
            // if (this.id) clearTimeout(this.id);
            // this.id = setTimeout(() => {
            //     if (this.text === a) {
            //     this.text = "";
            //     }
            // }, 5000);
        },
        onLoaded() {
            console.log("load");
        },
        clickRetryButton() {
            this.openCamera = true
            this.retryButton = false
        },
        downloadQrCode() {
            const image = document.querySelector(".my-qur img");
            const canvas = document.createElement("canvas"); canvas.width = image.width; canvas.height = image.height; const context = canvas.getContext("2d"); context.drawImage(image, 0, 0, image.width, image.height);
            // Get the base64 encoded data of the image
            const url = canvas.toDataURL("image/png");
            var link = document.createElement("a");
            document.body.appendChild(link);
            // for Firefox 
            link.setAttribute("href", url);
            const fileName = (new Date()).toLocaleString() + '-qr-code.png'
            link.setAttribute("download", fileName);
            link.click();
        },
        scanOrder() {
            let data = {
                'barcode': this.barcode
            }
            let token = localStorage.getItem('token')
            axios.defaults.headers.common = { 'Authorization': `Bearer ` + token }
            axios.post('/v1/scan/purchase-order/', data).then(response => {
                console.log(response.data.data[0].purchaseOrderLine)
                if (response.data.statusCode == '404') {
                    this.errorInItem = true
                    this.openCamera = false
                } else {
                    this.items = response.data.data[0].purchaseOrderLine;
                    this.poName = response.data.data[0].purchaseOrderName
                    this.poVendor = response.data.data[0].purchaseOrderVendor
                    this.poDate = response.data.data[0].purchaseOrderDateOrder
                    this.poReceive = response.data.data[0].purchaseOrderReceiptDate
                }
            }).catch(error => {
                console.log(error)
            })
        },
        validateProduct() {
            let token = localStorage.getItem('token')
            axios.defaults.headers.common = { 'Authorization': `Bearer ` + token }
            // let product = this.items.find(item => item.status =='1');
            // if (product.productQtyRequestPO<this.productQty){
            //     this.productQty = product.productQtyRequestPO
            //     this.showNotificationQtyProduct()
            //     // alert("The quantity received cannot exceed the quantity requested")
            // }
            let data = {
                'pickingId': this.pickingId,
                'purchaseOrderLocationSourceId': this.purchaseOrderLocationSourceId,
                'purchaseOrderLocationDestinationId': this.purchaseOrderLocationDestinationId,
                'purchaseOrderCompanyId': this.purchaseOrderCompanyId,
                'purchaseOrderLine': JSON.parse(JSON.stringify(this.items))
            }
            // let data = {
            //     "purchaseOrderLocationSourceId": 4,
            //     "purchaseOrderLocationDestinationId": 9,
            //     "purchaseOrderCompanyId": 1,
            //     "pickingId": 707,
            //     "purchaseOrderLine": [
            //         // {
            //         //     "orderLineId": 156,
            //         //     "moveId": 937,
            //         //     "moveLineId": 643,
            //         //     "productId": 5,
            //         //     "productBarcode": "OF123456",
            //         //     "productQtyDone": 2
            //         // },
            //         {
            //             "orderLineId": 157,
            //             "moveId": 938,
            //             "moveLineId": 644,
            //             "productId": 23,
            //             "productBarcode": "1992300123999",
            //             "productQtyDone": 3
            //         }
            //     ]
            // }
            // console.log(data)
            axios.put('/v1/validate-purchase/validate/', data).then(response => {
                console.log(response)
                if (response.data.statusCode == '200') {
                    this.showNotificationSuccess()
                    this.pickingId = ""
                    this.purchaseOrderLocationSourceId= ""
                    this.purchaseOrderLocationDestinationId= ""
                    this.purchaseOrderCompanyId= ""
                    this.items = ""
                    this.poName = ""
                    this.poVendor = ""
                    this.poDate = ""
                    this.poReceive = ""
                    this.items = [];
                } else {
                    alert('Somethig Went Wrong!')
                }
            }).catch(error => {
                console.log(error)
            })
        },
        async onInit(promise) {
            try {
                await promise
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    this.error = "ERROR: you need to grant camera access permission"
                } else if (error.name === 'NotFoundError') {
                    this.error = "ERROR: no camera on this device"
                } else if (error.name === 'NotSupportedError') {
                    this.error = "ERROR: secure context required (HTTPS, localhost)"
                } else if (error.name === 'NotReadableError') {
                    this.error = "ERROR: is the camera already in use?"
                } else if (error.name === 'OverconstrainedError') {
                    this.error = "ERROR: installed cameras are not suitable"
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.error = "ERROR: Stream API is not supported in this browser"
                } else if (error.name === 'InsecureContextError') {
                    this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
                } else {
                    this.error = `ERROR: Camera error (${error.name})`;
                }
            }
        },
        exportToPDF() {
        // const docDefinition = { content: [] };
        let html = '';
        var options = { day: 'numeric',month: 'long', year: 'numeric'  };
        let pdfName = ''
        this.products.forEach(product => {
            const canvas = document.createElement('canvas');
            JsBarcode(canvas, product.productBarcode);
            const imgData = canvas.toDataURL();
            pdfName = product.productBarcode
            html += '<div class="container_inside"> <p class="bg_grey"> '+ product.productName +' </p><img src="'+imgData+'"> <div class="response_text"> <div class="float_left"> <em>'+ product.productBarcode +'</em> </div><div class="float_right"> <p>'+new Date().toLocaleDateString("en-US", options);+'</p></div></div></div>'
        });

        html2pdf('<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Barcode</title> <link rel="preconnect" href="https://fonts.googleapis.com"> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet"> <style>body{margin: 0px;padding: 0px; font-family: "Roboto", sans-serif;}p{margin: 0px;}.container_inside{width: 600px; margin: 0 auto; border: 1px solid #555555; text-align: center; margin-top: 30px;}.bg_grey{background: #d9d9d9; margin: 0px; font-weight: 500; padding: 8px; margin-bottom: 5px;}.response_text{display: flex; justify-content: space-around; align-items: end; margin-bottom: 20px; font-weight: 700;}.float_right p{font-style: normal;font-weight: 400;}</style></head><body>'+html+' </body></html>', {
                    margin: 1,
                    filename: pdfName+".pdf",
                });
        },
        printBarcode() {
            const docDefinition = { content: [] };

            this.products.forEach(product => {
                const canvas = document.createElement('canvas');
                JsBarcode(canvas, product.productBarcode);
                const imgData = canvas.toDataURL();
                for (let i = 0; i < this.quantity; i++) {
                    docDefinition.content.push({ image: imgData });
                }
            });
            pdfMake.createPdf(docDefinition).print();
        },
        MinQty() {
            this.quantity--;
        },
        MaxQty() {
            this.quantity++;
        },
        MinQtyProductScan() {
            this.productQty--;
        },
        MaxQtyProductScan() {
            this.productQty++;
        },
        removeOrder(){
            this.items = []
            this.products = []
            this.poName = ""
            this.poVendor = ""
            this.poDate = ""
            this.poReceive = ""
        },
        openScanItem(){
            this.productBarcode = ''
            this.productName = ''
            this.productQty = 1
            $('#scanitem').addClass('show')
            $('#scanitem').css({'display' : 'block'})
            this.$refs.product.focus();
        },
        closeScanModal(){
            this.productBarcode = ''
            this.productName = ''
            this.productQty = 1
            $('#scanitem').removeClass('show')
            $('#scanitem').css({'display' : 'none'})
        },
    }
};
</script>

<style>
.modal.is-active {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    --bs-modal-zindex: 1055;
    --bs-modal-width: 500px;
    --bs-modal-padding: 1rem;
    --bs-modal-margin: 0.5rem;
    --bs-modal-color: ;
    --bs-modal-bg: #fff;
    --bs-modal-border-color: var(--bs-border-color-translucent);
    --bs-modal-border-width: 1px;
    --bs-modal-border-radius: 0.5rem;
    --bs-modal-box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    --bs-modal-inner-border-radius: calc(0.5rem - 1px);
    --bs-modal-header-padding-x: 1rem;
    --bs-modal-header-padding-y: 1rem;
    --bs-modal-header-padding: 1rem 1rem;
    --bs-modal-header-border-color: var(--bs-border-color);
    --bs-modal-header-border-width: 1px;
    --bs-modal-title-line-height: 1.5;
    --bs-modal-footer-gap: 0.5rem;
    --bs-modal-footer-bg: ;
    --bs-modal-footer-border-color: var(--bs-border-color);
    --bs-modal-footer-border-width: 1px;
    /* position: fixed; */
    top: 0;
    left: 0;
    z-index: var(--bs-modal-zindex);
    /* display: none; */
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
    /* background-color: var(--bs-backdrop-bg); */
}


.modal-body-wms {
    padding: 0 96px !important;
}
.input-group-text-inherit {
    display: inherit;
    align-items: center;
    padding: -23.625rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: center;
    white-space: nowrap;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 0.375rem;
}
</style>