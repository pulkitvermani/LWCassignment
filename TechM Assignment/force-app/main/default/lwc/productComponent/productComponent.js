import { LightningElement,track,wire } from 'lwc';
import returnProducts from "@salesforce/apex/ProductData.returnProducts";

export default class ProductComponent extends LightningElement {
    productData;
    errors;
    @track activeProducts=[];
    @track activeProdPrice=0;
    @track deletedProducts=[];
    @track deletedProdPrice=0;
    dt;

    @wire(returnProducts)
    products ({error, data}) {
        if (error) {
            this.errors=error;
        } else if (data) {
            // let personsObject=JSON.parse(data);
            // this.productData = new Map(Object.entries(personsObject));
            this.productData =JSON.parse(data);
            this.activeProducts=this.productData;
            this.calculateSum();
            window.console.log(this.activeProducts);
            window.console.log(this.productData);
        }
    }
    
    calculateSum(){
        window.console.log('hijji');
        this.activeProdPrice=0;
        for (let index = 0; index < this.activeProducts.length; index++) {
            this.activeProdPrice+= this.activeProducts[index].Price__c;
            
        }
        this.deletedProdPrice=0;
        for (let index = 0; index < this.deletedProducts.length; index++) {
            this.deletedProdPrice+= this.deletedProducts[index].Price__c;
            
        }
    }

    clickDelete(event){
        console.log('value in the clicked button target name ' , event.target.dataset.name);
        console.log('value in the clicked button target id ' , event.target.dataset.id);
        let index=event.target.dataset.id;
        this.deletedProducts.push(this.activeProducts[index]);
        this.activeProducts.splice(index,1);
        this.calculateSum();
        window.console.log('activeProducts '+ this.activeProducts);
    }
    clickRestore(event){
        console.log('value in the clicked button target name ' , event.target.dataset.name);
        console.log('value in the clicked button target id ' , event.target.dataset.id);
        let index=event.target.dataset.id;
        this.activeProducts.push(this.deletedProducts[index]);
        this.deletedProducts.splice(index,1);
        this.calculateSum();}

    //dataArray= JSON.parse(this.productData);
   
}