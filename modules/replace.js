const replace=(temp,elements)=>{
    let output=temp.replace(/{%PRODUCTNAME%}/g,elements.productName);
    output=output.replace(/{%IMAGE%}/g,elements.image);
    output=output.replace(/{%QUANTITY%}/g,elements.quantity);
    output=output.replace(/{%PRICE%}/g,elements.price);
    output=output.replace(/{%ID%}/g,elements.id);
    output=output.replace(/{%DESCRIPTION%}/g,elements.description);
    output=output.replace(/{%NUTRIENTS%}/g,elements.nutrients);
    output=output.replace(/{%FROM%}/g,elements.from);
    if(!elements.organic) output=output.replace(/{%NOT_ORGANIC%}/g,"not-organic")
    return output;
}
module.exports=replace;