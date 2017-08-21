<template>
	<section>

		<div class="row header-filter">
	        <div class="col-sm-6">
		        <div class="form-group row">
		            <div class="col-md-12">
		                <div class="input-group width-pages">
		                    <span class="input-group-addon">{{titles.entries}}
		                    </span>
		                    <select id="select" @change="query.page=1"  class="form-control" v-model="query.per_page">    
                                <option :value='10' :selected="10 == query.per_page ? 'selected' : ''">10</option>
                                <option :value='25' :selected="25 == query.per_page ? 'selected' : ''">25</option>
                                <option :value='50' :selected="50 == query.per_page ? 'selected' : ''">50</option>
                                <option :value='100' :selected="100 == query.per_page ? 'selected' : ''">100</option>
                            </select>
		                </div>
		            </div>
		        </div>
	        </div>

	        <div class="col-sm-6">
	            <div class="form-group row filter-box">
		            <div class="col-md-12 width-filter"> 
		                <div class="input-group" >
		                    <span class="input-group-addon">{{titles.search}}
		                    </span>
		                   <input type="text" class="form-control" v-model="query.search">
		                </div>
		            </div>
	        	</div>
	        </div>
	    </div>
	    <div class="table-box">
			<table class="table table-bordered table-striped table-sm">
				<thead>
					<slot name="colums">
						<tr>
							<th v-for="colum in keys(items[0])">
								{{colum}}
							</th>
						</tr>
					</slot>
				</thead>
				<tbody>
					<slot name="row" v-for="item in filteredItems" :scope="item">
						<tr>
							<td v-for="value in item">
								{{value}}
							</td>
						</tr>
					</slot>
				</tbody>
			</table>
	    </div>

		<nav class="pagination-content">
            <ul class="pagination">
                <li class="page-item" :class="{disabled:query.page == 1}" >
                    <a class="page-link" href="javascript:void(0)" @click="prev()" >{{titles.pagination.prev}}</a>
                </li>
                <li class="page-item" :class="{active: query.page == p.page}" v-for="p in pagination">
                    <a class="page-link" href="javascript:void(0)" @click="changePage(p.page)">{{p.page}}</a>
                </li>
                <li class="page-item" :class="{disabled:query.page == query.pages}">
                	<a class="page-link" href="javascript:void(0)"  @click="next()">{{titles.pagination.next}}</a>
                </li>
            </ul>
        </nav>
	</section>


</template>
<style>
	.width-pages {
		width:165px;
	}

	.width-filter {
		width:300px;
	}
	.table td,.table th{
		text-align: left;
	}
	.pagination-content,.filter-box {
		display: flex;
		justify-content: flex-end;
	}
	.pagination {
		margin-top: 0;
	}
	.table {
		margin-bottom: 0px;
	}
    .table-box {
         overflow-x: auto;
         display: inherit;
         margin-bottom: 20px;
    }
@media only screen and (max-width: 767px) {
    .width-filter, .width-pages {
	    width: 100%;
	}
	.header-filter,.header-filter .row {
	    margin-right: 0;
    	margin-left: 0;
	}
	.header-filter > .col-sm-6,.header-filter .col-md-12 {
		padding-right: 0;
		padding-left: 0;
	}
}
</style>
<script>
	import Vue from 'vue'
	import lang from './lang.js'
    export default {
    	name:'vueble',

        props: {
        	items: {
        		type: Array,
        		required: true,
        	},
        	lang: {
        		type: String,
        		default: "en",
        	},
            pageLength: {
                type: Number,
                default: 7,
            },
        }, 

        data() {
        	return {
        		query: {
        			search: '',
        			per_page: 10,
        			page: 1,
        			pages:0,
        		},
        	};
        },

        computed: {
            allItems() {
                var items;
                    console.log('sin filtrar: '+this.items.length);


                if (this.query.search == '') {
                    items = this.items;
                } else {
                    var self = this;

                    var regex = new RegExp(self.query.search,'i');
                    
                    items = this.items.filter(function(item) {
                        var prop;

                        for (prop in item) {
                            if (regex.test(item[prop])) {
                                return true;
                            }
                        }

                        return false;
                    });

                    this.query.page = 1;
                }

                return items;
            },
            filteredItems() {
            	var items = this.allItems;

                var inicio = this.query.per_page * (this.query.page  - 1);
            	
                var fin = inicio + this.query.per_page;
            	
                var agregado = (parseInt(items.length % this.query.per_page) > 0) ? 1 : 0;

            	this.query.pages = parseInt(items.length / this.query.per_page)  + agregado;

                return items.slice(inicio,fin);
            },
            pagination() {
            	var pages = [];

            	if(this.query.pages > this.pageLength) {

            		var isPar = (this.pageLength % 2) == 0 ? true : false;

            		var left =  this.query.page - 1;
            		var right =  this.query.pages - this.query.page;

            		var base = parseInt(this.pageLength/2);
            		

            		var baseLeft = (isPar) ?  base - 1 : base;

            		
            		if (left <= baseLeft) {
            			for (var i = 1; i <= left; i++) {
            				pages.push({page: i});
            				base--;
            			}
            		} else {

            			if ((base - right) > 0) {
            				baseLeft = baseLeft + (base - right);
            			}

            			for (var i = baseLeft; i >= 1; i--) {
            				pages.push({page: this.query.page - i});
            				base--;
            			}
            		}

            		base = base + baseLeft;

            		pages.push({page: this.query.page});

            		if (right <= base) {
            			for (var i = this.query.page + 1; i <= this.query.page + right; i++) {
            				pages.push({page: i});
            			}
            		} else {
            			for (var i = 1; i <= base; i++) {
            				pages.push({page: this.query.page + i});
            			}
            		}
            	} else {
	            	for (var i = 0; i < this.query.pages; i++) {
	            		pages.push({page:i+1});
	            	}
            	}

            	return pages;
            },
            titles() {
            	return lang[this.lang];
            }
        },

        methods: {
        	next() {
	            if(this.query.page < this.query.pages) {
	              this.query.page++;
	            }
	        },
	        prev() {
	            if(this.query.page  > 1) {
	              this.query.page--;
	            }
	        },
	        keys(item) {
	        	var keys = [];
				for(var k in item) keys.push(k);
				return keys;
	        },
	        changePage(page) {
	        	this.query.page = page;

	        }
        },
    }
</script>