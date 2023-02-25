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
                                <a href="scanitem" class="print_btn" data-bs-toggle="modal" data-bs-target="#scanitem">
                                    Scan Item
                                </a>
                            </div>
                            <div class="d-flex">
                                <a href="printlabel" class="print_btn" data-bs-toggle="modal" data-bs-target="#printlabel">
                                    Print Label
                                </a>

                                <a href="scanPO" class="scan_btn ms-4" @click="openCamera = !openCamera"
                                    data-bs-toggle="modal" data-bs-target="#scanPO">
                                    Scan Barcode PO
                                </a>

                            </div>

                        </h2>

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
                                <input type="text" class="form-control" v-model="poVendor" id="" placeholder="" disabled="1">
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
                                <input type="text" class="form-control" v-model="poReceive" id="" placeholder="" disabled="1">
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-borderless purchase_table">
                                <thead>
                                    <tr>
                                        <th class="text-center">Product Name</th>
                                        <th class="text-center">Qty Request</th>
                                        <th class="text-center">Qty Received</th>
                                        <th class="text-center">UoM</th>
                                        <!-- <th class="text-center">Description</th> -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="data in filteredItems()" :key="data.id">
                                        <td class="text-center">{{ data.productName }}</td>
                                        <td class="text-center">{{ data.productQtyRequestPO }}</td>
                                        <td class="text-center">{{ data.productQtyReceived }}</td>
                                        <td class="text-center">{{ data.status }}</td>
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
        <div class="modal fade" id="printlabel" tabindex="-1" aria-labelledby="printlabelLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" id="printlabelLabel">Print Label</h1>
                    </div>
                    <div class="modal-body">
                        <div class="row purchase_form" v-for="(d, index) in items" :key="index">
                            <div class="col-12" v-for="(data, index1) in d.purchaseOrderLine" :key="index1">
                                <!-- <div class="input-group mb-3">
                                    <button class="input-group-text" type="button">
                                        <img src="/assets/images/minus.svg" alt="" title="" />
                                    </button>
                                    <input type="text" class="form-control mb-0 text-center" id="" placeholder="">
                                    <button class="input-group-text" type="button">
                                        <img src="/assets/images/plus.svg" alt="" title="" />
                                    </button>
                                </div>-->

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
        </div>
        <div class="modal fade" id="scanitem" tabindex="-1" aria-labelledby="scanitemLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" id="scanitemLabel">Scan Item</h1>
                    </div>
                    <div class="modal-body">
                        <div class="row purchase_form">
                            <div class="col-12">
                                <label class="form-label">Product Barcode</label>
                                <input type="text" class="form-control" id="" placeholder="" ref="product">
                            </div>
                            <div class="col-12">
                                <label class="form-label">Name Item</label>
                                <input type="text" class="form-control" id="" placeholder="" disabled="1">
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
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary ms-4">Done</button>
                    </div>
                </div>
            </div>
        </div>

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
import QRCodeVue3 from "qrcode-vue3";
import axios from 'axios'


export default {
    name: "PurchaseOrder",
    components: {
        Navigation,
        LeftSideMenu,
        StreamBarcodeReader,
        QRCodeVue3,
        // QrcodeStream,
        // QrcodeDropZone,
        // QrcodeCapture
    },
    data() {
        return {
            result: '',
            error: '',
            poName: '',
            poDate: '',
            poVendor: '',
            poReceive: '',
            openCamera: false,
            // barcode:'JKT/IN/00075',
            barcode: '',
            retryButton: false,
            errorInItem: false,
            items: [],
        }
    },
    mounted() {
        // this.scanOrder()
        this.focusInput()
        this.focusInputPopUp()
    },
    methods: {
        // onDecode (result) {
        //     this.result = result
        //     console.log(result)
        //     if(result){
        //         // $('#scanPO').model('close');
        //     }
        // },
        focusInput() {
            this.$refs.po.focus();
        },
        focusInputPopUp() {
            this.$refs.product.focus();
        },
        filteredItems() {
            return this.items.filter(item => {
                return item.status.toLowerCase().includes('1')
            })
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
                    this.items = "";
                    alert('Token has expired!!! Please Login Again')
                    this.$router.push('/')
                } else {
                    // for (let i = 0: i < )
                    response.data.data[0].purchaseOrderLine.forEach(x => {
                        this.items.push({ productName: x.productName, productQtyRequestPO: x.productQtyRequestPO, productQtyReceived: x.productQtyReceived, status: '0' })
                    });
                    // this.items = response.data.data[0].purchaseOrderLine;
                    this.poName = response.data.data[0].purchaseOrderName
                    this.poVendor = response.data.data[0].purchaseOrderVendor
                    this.poDate = response.data.data[0].purchaseOrderDateOrder
                    this.poReceive = response.data.data[0].purchaseOrderReceiptDate
                }
            }).catch(error => {
                // alert(error.message)
                if (error.message == 'Request failed with status code 401') {
                    this.items = ""
                    this.poName = ""
                    this.poVendor = ""
                    this.poDate = ""
                    this.poReceive = ""
                    this.items = "";
                    alert('Token Expired')
                    localStorage.removeItem('token')
                    this.$router.push('/')
                }else if(error.message == 'Request failed with status code 404'){
                    this.items = ""
                    this.poName = ""
                    this.poVendor = ""
                    this.poDate = ""
                    this.poReceive = ""
                    this.items = "";
                    alert('Data Not Found')
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
            axios.put('/v1/validate-purchase/validate/', this.items).then(response => {
                console.log(response)
                if (response.data.statusCode == '200') {
                    alert(response.data.statusCodeDesc)
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
        }
    }
};
</script>