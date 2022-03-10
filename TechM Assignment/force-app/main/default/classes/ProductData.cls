public class ProductData {

    @AuraEnabled(cacheable=true)
    public static String returnProducts(){
        List<Product__c> productList = new List<Product__c>();
        productList = [Select Id, Name, brand__c, type__c, model__c, price__c From Product__c];
        return JSON.serialize(productList);
    }
}
