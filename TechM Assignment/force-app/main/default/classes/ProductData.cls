public class ProductData {

    @AuraEnabled(cacheable=true)
    public static String returnProducts(){
        List<Product__c> productList = new List<Product__c>();
        productList = [Select Id, Name, brand__c, type__c, model__c, price__c From Product__c];
        return JSON.serialize(productList);
    }
    
    public static String backup(){
        Map<id,Product__c> productMap = new Map<id,Product__c>();
        List<Product__c> productList = [Select Id, Name, brand__c, type__c, model__c, price__c From Product__c];
        for(Product__c eachProduct : productList){
            productMap.put(eachProduct.id,eachProduct);
        }
        return JSON.serialize(productMap);
    }
}