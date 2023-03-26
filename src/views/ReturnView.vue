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
                        <h2>Return
                            <div class="d-flex">
                                <!-- <a href="printlabel" class="print_btn" data-bs-toggle="modal" data-bs-target="#printlabel">
                                    Print Label
                                </a> -->
                                <a href="javascript:void(0)" class="scan_btn ms-4" @click="openScanItem" >
                                    Scan Item
                                </a>
                            </div>
                        </h2>
                        <div class="d-flex">
                            <button v-if="isDesktop" class="print_btn" @click="showModal">Scan Return</button>
                            <button v-if="isDesktop" class="scan_btn ms-4" @click="removeReturn">Clear Data</button>
                            <a href="scanReturn" v-else class="scan_btn ms-4" @click="openCamera = !openCamera"
                                data-bs-toggle="modal" data-bs-target="#scanReturn">
                                Scan Return
                            </a>
                        </div>
                        <div class="row purchase_form mt-5">
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Return Number</label>
                                <input type="text" class="form-control" id="" placeholder="" ref="return"
                                    v-on:change="GetBarcode" v-model="ReturnNumber" readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Return Date</label>
                                <input type="text" class="form-control" id="" placeholder="" v-model="ReturnDate" readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Source Location</label>
                                <input type="text" class="form-control" id="" placeholder="" v-model="SourceLocation"
                                    readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Consume Number</label>
                                <input type="text" class="form-control" id="" placeholder="" v-model="ConsumeNumber"
                                    readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Work Order</label>
                                <input type="text" class="form-control" id="" placeholder="" v-model="WoNumber" readonly>
                            </div>
                            
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Material Request No.</label>
                                <input type="text" class="form-control" id="" placeholder="" v-model="MaterialNumber"
                                    readonly>
                            </div>
                            
                        </div>
                        <div class="table-responsive">
                            <table class="table table-borderless purchase_table">
                                <thead>
                                    <tr>
                                        <th class="text-center">Product Name</th>
                                        <th class="text-center">Qty Consume</th>
                                        <th class="text-center">Qty Return</th>
                                        <th class="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="data in filteredItems()" :key="data.id">
                                        <td class="text-center">{{ data.productName }}</td>
                                        <td class="text-center">{{ data.productQtyDemand }}</td>
                                        <td class="text-center"> <spacer type="horizontal" width="100" height="100"></spacer>{{ data.productQtyDone }}<spacer type="horizontal" width="100" height="100"></spacer></td>
                                        <td>
                                        <button type="button" class="btn btn-dm btn-danger" @click="removeItem(data.productId)">Remove</button>
                                    </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div class="text-end">
                            <button type="button" class="btn-login" :disabled="this.items.length == 0"
                                @click="validateProduct">

                                <img src="/assets/images/checkmark.png" alt="" title="" class="me-2" /> Validate
                            </button>
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
                        <div class="row purchase_form">
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
        </div> -->

        <!-- scan item Modal -->
        <div class="modal fade" id="scanitem" tabindex="-1" aria-labelledby="scanitemLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" id="scanitemLabel">Scan Item</h1>

                    </div>
                    <span>Please Scan Barcode Item below this</span>
                    <br />
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
                                    <button class="input-group-text" type="button" @click="MinQtyProductScan">
                                        <img src="/assets/images/minus.svg" alt="" title="" />
                                    </button>
                                    <input type="number" class="form-control mb-0 text-center" v-model="productQty" id=""
                                        placeholder="">
                                    <button class="input-group-text" type="button" @click="MaxQtyProductScan">
                                        <img src="/assets/images/plus.svg" alt="" title="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeScanModal">Close</button>
                        <button type="button" class="btn btn-primary ms-4" @click="searchAndUpdateProduct">ADD</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fide" :class="{ 'is-active': modalIsActive }" role="dialog" tabindex="-1"
            aria-labelledby="scanitemLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-background" @click="hideModal"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" id="scanitemLabel">Scan Return</h1>
                    </div>
                    <span>Please Scan Return Item below this</span>
                    <br/>
                    <div class="modal-body-wms">
                        <div class="row">
                            <div class="col-12">
                                <label class="form-label">Barcode Return</label>
                                <input type="text" class="form-control col-12" v-model="returnNo" v-on:change="GetBarcodePopup" ref="returnNo" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary col-12" @click="hideModal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="scanReturn" tabindex="-1" aria-labelledby="scanPOLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" id="scanPOLabel">Scan Barcode Return</h1>
                    </div>
                    <div class="modal-body">
                        <div class="row purchase_form">
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
import * as $ from 'jquery';
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: "PurchaseOrder",
    components: {
        Navigation,
        LeftSideMenu,
    },
    data() {
        return {
            modalIsActive: false,
            isDesktop: false,
            openCamera: false,
            retryButton: false,
            errorInItem: false,
            printLabelModalIsActive: false,
            ReturnNumber: "",
            ConsumeNumber: "",
            SourceLocation:"",
            ReturnDate: "",
            MaterialNumber: "",
            ReturnId:"",
            WoNumber: "",
            productBarcode: '',
            productName: '',
            productQty: 1,
            items: [],
            products: [],
            locationSourceId:'',
            pickingId:'',
            destinationId:''
        }

    },
    mounted() {
        // this.focusInput()
        this.focusInputPopUp()
        this.checkIsDesktop();
        window.addEventListener('resize', this.checkIsDesktop);
    },
    watch:{
        productQty(val){
            console.log(val)
            let product = this.items.find(item => item.productBarcode == this.productBarcode);
            if (product && product.productQtyDemand < val){
                this.productQty = product.productQtyDemand
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
        showModal() {
            this.returnNo = ''
            this.modalIsActive = true;
            this.$refs.input.focus();
        },
        hideModal() {
            this.modalIsActive = false;
        },
        resetText() {
            this.returnNo = ''
        },
        focusInput() {
            this.$refs.return.focus();
        },
        focusInputPopUp() {
            this.$refs.returnNo.focus();
        },
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
        filteredItems() {
            return this.items.filter(item => {
                return item.status.toLowerCase().includes('1')
            })
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
            if (product.productQtyDemand < this.productQty){
                this.productQty = product.productQtyDemand
                this.showNotificationQtyProduct()
            }
        },
        searchProduct() {
            this.items.forEach(x => {
                if (x.productBarcode == this.productBarcode) {
                    this.productQty = x.productQtyDone + 1
                    this.productName = x.productName
                }else{
                    this.showNotificationErrorNot()
                    this.productName=""
                    this.productBarcode=""
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
                                productQtyDemand: x.productQtyDemand,
                                productQtyDone: this.productQty,
                                productId: x.productId,
                                moveLineId: x.moveLineId,
                                moveId: x.moveId,
                                status: '1' 

                            })
                } else {
                    new_items.push({ 
                        productBarcode: x.productBarcode,
                                productName: x.productName,
                                productQtyDemand: x.productQtyDemand,
                                productQtyDone: x.productQtyDone,
                                productId: x.productId,
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
                'barcode': this.ReturnNumber
            }
            let token = localStorage.getItem('token')
            axios.defaults.headers.common = { 'Authorization': `Bearer ` + token }
            axios.post('/v1/scan/return/', data).then(response => {
                if (response.data.statusDesc == '401') {
                    // console.log(response)
                    this.ReturnNumber= "",
                    this.ConsumeNumber= "",
                    this.SourceLocation="",
                    this.ReturnDate= "",
                    this.MaterialNumber= "",
                    this.WoNumber= "",
                    this.items = [];
                    this.products = []
                    this.showNotificationErrorNot()
                    localStorage.removeItem('token')
                    this.$router.push('/')
                } else {
                    this.items = []
                    response.data.data[0].ReturnLine.forEach(x => {
                        this.items.push(
                            {
                                productBarcode: x.productBarcode,
                                productName: x.productName,
                                productQtyDemand: x.productQtyDemand,
                                productQtyDone: x.productQtyDone,
                                productId: x.productId,
                                moveLineId: x.moveLineId,
                                moveId: x.moveId,
                                status: '0'
                            })
                    });
                    this.ReturnId = response.data.data[0].ReturnId;
                    this.destinationId = response.data.data[0].LocationDestinationId;
                    this.locationSourceId = response.data.data[0].LocationSourceId;
                    this.pickingId = response.data.data[0].pickingId;
                    this.ConsumeNumber = response.data.data[0].ConsumeNumber;
                    this.WoNumber = response.data.data[0].assignmentId;
                    this.CompanyId = response.data.data[0].CompanyId;
                    this.products = response.data.data[0].ConsumeLine;
                    this.ReturnNumber = response.data.data[0].ReturnNumber
                    this.MaterialNumber = response.data.data[0].MRID
                    this.AssetName = response.data.data[0].AssetId
                    this.ReportDate = response.data.data[0].reportDate
                }
            }).catch(error => {
                // console.log(error)
                if (error.message == 'Request failed with status code 401') {
                    this.ReturnNumber= "",
                    this.ConsumeNumber= "",
                    this.SourceLocation="",
                    this.ReturnDate= "",
                    this.MaterialNumber= "",
                    this.WoNumber= "",
                    this.items = [];
                    this.products = []
                    this.showNotificationToken()
                    localStorage.removeItem('token')
                    this.$router.push('/')
                } else if (error.message == 'Request failed with status code 404') {
                    this.ReturnNumber= "",
                    this.ConsumeNumber= "",
                    this.SourceLocation="",
                    this.ReturnDate= "",
                    this.MaterialNumber= "",
                    this.WoNumber= "",
                    this.items = [];
                    this.products = []
                    this.showNotificationErrorNot()
                    this.ReturnNumber=""
                }
            })
        },
        GetBarcodePopup() {
            let data = {
                'barcode': this.returnNo
            }
            let token = localStorage.getItem('token')
            axios.defaults.headers.common = { 'Authorization': `Bearer ` + token }
            axios.post('/v1/scan/return/', data).then(response => {
                if (response.data.statusDesc == '401') {
                    this.ReturnNumber= "",
                    this.ConsumeNumber= "",
                    this.SourceLocation="",
                    this.ReturnDate= "",
                    this.MaterialNumber= "",
                    this.WoNumber= "",
                    this.ReturnId="",
                    this.items = [];
                    this.products = []
                    this.showNotificationErrorNot()
                    localStorage.removeItem('token')
                    this.$router.push('/')
                } else {
                    this.hideModal();
                    response.data.data[0].ReturnLine.forEach(x => {
                        this.items.push(
                            {
                                productBarcode: x.productBarcode,
                                productName: x.productName,
                                productQtyDemand: x.productQtyDemand,
                                productQtyDone: x.productQtyDone,
                                productId: x.productId,
                                moveLineId: x.moveLineId,
                                moveId: x.moveId,
                                status: '0'
                            })
                    });
                    this.ReturnId = response.data.data[0].ReturnId;
                    this.destinationId = response.data.data[0].LocationDestinationId;
                    this.locationSourceId = response.data.data[0].LocationSourceId;
                    this.pickingId = response.data.data[0].pickingId;
                    this.ConsumeNumber = response.data.data[0].ConsumeNumber;
                    this.SourceLocation = response.data.data[0].SourceLocation;
                    this.WoNumber = response.data.data[0].WorkOrder;
                    this.CompanyId = response.data.data[0].CompanyId;
                    this.products = response.data.data[0].ReturnLine;
                    this.ReturnNumber = response.data.data[0].ReturnNumber
                    this.MaterialNumber = response.data.data[0].MRID
                    this.ReturnDate = response.data.data[0].ReturnDate
                }
            }).catch(error => {
                // console.log(error)
                if (error.message == 'Request failed with status code 401') {
                    this.ReturnNumber= "",
                    this.ConsumeNumber= "",
                    this.SourceLocation="",
                    this.ReturnDate= "",
                    this.MaterialNumber= "",
                    this.WoNumber= "",
                    this.items = [];
                    this.products = []
                    this.showNotificationToken()
                    localStorage.removeItem('token')
                    this.$router.push('/')
                } else if (error.message == 'Request failed with status code 404') {
                    this.pickingId = ""
                    this.ConsumeNumber = ""
                    this.WoNumber = ""
                    this.CompanyId = ""
                    this.AssetName = ""
                    this.MaterialNumber = ""
                    this.ReportDate = ""
                    this.consumeId = ""
                    this.destinationId = ""
                    this.locationSourceId = ""
                    this.items = [];
                    this.products = []
                    this.showNotificationErrorNot()
                    this.consumeNo=""
                }
            })
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
        MinQtyProductScan() {
            this.productQty--;
        },
        MaxQtyProductScan() {
            this.productQty++;
        },
        removeReturn(){
            this.items = []
            this.products = []
            this.pickingId = ""
            this.SourceLocation=""
            this.ReturnNumber=""
            this.ConsumeNumber = ""
            this.WoNumber = ""
            this.CompanyId = ""
            this.AssetName = ""
            this.MaterialNumber = ""
            this.ReturnDate = ""
            this.consumeId = ""
            this.destinationId = ""
            this.locationSourceId = ""
        },
        validateProduct() {
            let token = localStorage.getItem('token')
            axios.defaults.headers.common = { 'Authorization': `Bearer ` + token }
            let data = {
                'pickingId': this.pickingId,
                'ReturnId': this.ReturnId,
                'LocationSourceId': this.locationSourceId,
                'LocationDestinationId': this.destinationId,
                'CompanyId': this.CompanyId,
                'ReturnLine': JSON.parse(JSON.stringify(this.items))
            }
           
            axios.put('/v1/validate-return/validate/', data).then(response => {
                console.log(response)
                if (response.data.statusCode == '200') {
                    this.showNotificationSuccess()
                    this.items = []
                    this.products = []
                    this.pickingId = ""
                    this.ConsumeNumber = ""
                    this.WoNumber = ""
                    this.CompanyId = ""
                    this.AssetName = ""
                    this.MaterialNumber = ""
                    this.ReportDate = ""
                    this.ReturnNumber=""
                } else {
                    alert('Somethig Went Wrong!')
                }
            }).catch(error => {
                console.log(error)
            })
        },
    },
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
    top: 0;
    left: 0;
    z-index: var(--bs-modal-zindex);
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
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