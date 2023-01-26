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
                    <div class="purchase_order">
                        <h2>Purchase Order
                            <div class="d-flex">
                                <a href="printlabel" class="print_btn" data-bs-toggle="modal" data-bs-target="#printlabel">
                                    Print Label
                                </a>
                                <a href="scanitem" class="scan_btn ms-4" data-bs-toggle="modal" data-bs-target="#scanitem">
                                    Scan Item
                                </a>
                            </div>
                        </h2>
                        <div class="row purchase_form">
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Purchase ID</label>
                                <input type="text" class="form-control" id="" placeholder="">
                            </div>
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Purchase Agreement</label>
                                <input type="text" class="form-control" id="" placeholder="">
                            </div>
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Vendor</label>
                                <input type="text" class="form-control" id="" placeholder="">
                            </div>
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Purchase  Date</label>
                                <input type="text" class="form-control" id="" placeholder="">
                            </div>
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Vendor Refference</label>
                                <input type="text" class="form-control" id="" placeholder="">
                            </div>
                            <div class="col-md-6 col-sm-12 col-12">
                                <label class="form-label">Delivery Date</label>
                                <input type="text" class="form-control" id="" placeholder="">
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-borderless purchase_table">
                                <thead>
                                    <tr>
                                        <th class="text-center">Product Name</th>
                                        <th class="text-center">Qty Request</th>
                                        <th class="text-center">Qty Received</th>
                                        <th class="text-center">Qty Billed</th>
                                        <th class="text-center">UoM</th>
                                        <th class="text-center">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td  class="text-center">Bakso</td>
                                        <td  class="text-center">10</td>
                                        <td  class="text-center">8</td>
                                        <td  class="text-center">8</td>
                                        <td  class="text-center">-</td>
                                        <td  class="text-center">Bakso sapi</td>
                                    </tr>
                                    <tr>
                                        <td  class="text-center">Sosis</td>
                                        <td  class="text-center">20</td>
                                        <td  class="text-center">20</td>
                                        <td  class="text-center">20</td>
                                        <td  class="text-center">-</td>
                                        <td  class="text-center">Sosis Ayam</td>
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
        <div class="modal fade" id="printlabel" tabindex="-1" aria-labelledby="printlabelLabel" aria-hidden="true">
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
        </div>

        <!-- scan item Modal -->
        <div class="modal fade" id="scanitem" tabindex="-1" aria-labelledby="scanitemLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" id="scanitemLabel">Scan Item</h1>
                    </div>
                    <div class="modal-body">
                        <div class="row purchase_form">
                            <div class="col-12">
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
    </div>
</template>
  
<script>
import Navigation from "../components/Navigation.vue";
import LeftSideMenu from "../components/LeftSideMenu.vue";

export default {
    name: "PurchaseOrder",
    components: {
      Navigation,
      LeftSideMenu,
    },
};
</script>
  