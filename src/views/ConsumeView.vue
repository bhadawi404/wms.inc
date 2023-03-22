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
                        <h2>Consume Issued
                            <div class="d-flex">
                                <!-- <a href="printlabel" class="print_btn" data-bs-toggle="modal" data-bs-target="#printlabel">
                                    Print Label
                                </a> -->
                                <a href="scanitem" class="scan_btn ms-4" data-bs-toggle="modal" data-bs-target="#scanitem">
                                    Scan Item
                                </a>
                            </div>
                        </h2>
                        <div class="d-flex">
                            <button v-if="isDesktop" class="print_btn" @click="showModal">Scan Consume</button>
                            <button v-if="isDesktop" class="scan_btn ms-4" @click="removeOrder">Clear Data</button>
                            <a href="scanPO" v-else class="scan_btn ms-4" @click="openCamera = !openCamera"
                                data-bs-toggle="modal" data-bs-target="#scanPO">
                                Scan Consume
                            </a>
                        </div>
                        <div class="row purchase_form mt-5">
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Consume Number</label>
                                <input type="text" class="form-control" id="" placeholder="" ref="consume"
                                    v-on:change="GetBarcode" v-model="ConsumeNumber">
                            </div>
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Source Location</label>
                                <input type="text" class="form-control" id="" placeholder="" v-model="SourceLocation"
                                    readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Report Date</label>
                                <input type="text" class="form-control" id="" placeholder="" v-model="ReportDate" readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Material Request No.</label>
                                <input type="text" class="form-control" id="" placeholder="" v-model="MaterialNumber"
                                    readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Asset Name</label>
                                <input type="text" class="form-control" id="" placeholder="" v-model="AssetName" readonly>
                            </div>
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Work Order</label>
                                <input type="text" class="form-control" id="" placeholder="" v-model="WoNumber" readonly>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-borderless purchase_table">
                                <thead>
                                    <tr>
                                        <th class="text-center">Product Name</th>
                                        <th class="text-center">Qty Request</th>
                                        <th class="text-center">Qty Done</th>
                                        <th class="text-center">Qty Return</th>
                                        <th class="text-center">UoM</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-center">Bakso</td>
                                        <td class="text-center">10</td>
                                        <td class="text-center">8</td>
                                        <td class="text-center">8</td>
                                        <td class="text-center">-</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div class="text-end">
                            <a href="#" class="btn-login">
                                <img src="/assets/images/checkmark.png" alt="" title="" class="me-2" /> Validate
                            </a>
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
            isDesktop: false,
            ConsumeNumber: "",
            SourceLocation: "",
            CompanyId: "",
            ReportDate: "",
            MaterialNumber: "",
            AssetName: "",
            WoNumber: "",
            productBarcode: '',
            productName: '',
            productQty: 1,
            items: [],
            products: [],
        }

    },
    mounted() {
        this.focusInput();
    },
    methods: {
        focusInput() {
            this.$refs.consume.focus();
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
                                consumeLineId: x.consumeLineId,
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
                                consumeLineId: x.consumeLineId,
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
                'barcode': this.ConsumeNumber
            }
            let token = localStorage.getItem('token')
            axios.defaults.headers.common = { 'Authorization': `Bearer ` + token }
            axios.post('/v1/scan/consume/', data).then(response => {
                if (response.data.statusDesc == '401') {
                    // console.log(response)
                    this.pickingId = ""
                    this.SourceLocation = ""
                    this.WoNumber = ""
                    this.CompanyId = ""
                    this.items = [];
                    this.showNotificationErrorNot()
                    localStorage.removeItem('token')
                    this.$router.push('/')
                } else {
                    this.items = []
                    response.data.data[0].ConsumeLine.forEach(x => {
                        this.items.push(
                            {
                                productBarcode: x.productBarcode,
                                productName: x.productName,
                                productQtyDemand: x.productQtyDemand,
                                productQtyDone: x.productQtyDone,
                                productId: x.productId,
                                consumeLineId: x.consumeLineId,
                                moveLineId: x.moveLineId,
                                moveId: x.moveId,
                                status: '0'
                            })
                    });
                    this.pickingId = response.data.data[0].pickingId;
                    this.SourceLocation = response.data.data[0].SourceLocation;
                    this.WoNumber = response.data.data[0].assignmentId;
                    this.CompanyId = response.data.data[0].CompanyId;
                    // this.products = response.data.data[0].purchaseOrderLine;
                    this.ConsumeNumber = response.data.data[0].consumeNumber
                    this.MaterialNumber = response.data.data[0].MRID
                    this.AssetName = response.data.data[0].AssetId
                    this.ReportDate = response.data.data[0].reportDate
                }
            }).catch(error => {
                // console.log(error)
                if (error.message == 'Request failed with status code 401') {
                    this.pickingId = ""
                    this.SourceLocation = ""
                    this.WoNumber = ""
                    this.CompanyId = ""
                    this.items = [];
                    this.showNotificationToken()
                    localStorage.removeItem('token')
                    this.$router.push('/')
                } else if (error.message == 'Request failed with status code 404') {
                    this.pickingId = ""
                    this.SourceLocation = ""
                    this.WoNumber = ""
                    this.CompanyId = ""
                    this.items = [];
                    this.showNotificationErrorNot()
                }
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
}</style>