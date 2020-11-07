const http=require('http');
const fs= require('fs');
const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,"utf-8");
const dataObj=JSON.parse(data);
const replaceHtml=(temp,elements)=>{
    let output=temp.replace(/${%PRODUCTNAME%}/g,elements.productName);
    output=output.replace(/{%IMAGE%}/g,elements.image);
    output=output.replace(/{%QUANTITY%}/g,elements.quantity);
    output=output.replace(/{%PRICE%}/g,elements.price);
    output=output.replace(/{%ID%}/g,elements.id);

    //if(!elements.organic) output=output.replace(/{%NOT_ORGANIC%}/g,elements.organic)
    return output;
}

const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,"utf-8");
const tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,"utf-8");
const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,"utf-8");

const server=http.createServer((req,res)=>{
    const path=req.url;
    //API
    if(path ==="/api"){
        res.writeHead(200,{
            "Content-type":"application/json"
        })
        res.end(data)
    }
    //OVERVIEW PAGE
    else if(path ==="/" || path === "/overview"){
        res.writeHead(200,{"Content-type":"text/html"})
        const cardHtml=dataObj.map(el => replaceHtml(tempCard,el));
        res.end(cardHtml);
    } 
    //PRODUCTS PAGE
    else if(path === "/products"){
        res.end("Producs Page!")
    }  
    else{
        res.writeHead(404)
        res.end("PAGE NOT FOUND")
    }
   
});

server.listen(3000,"localhost",()=>{
    console.log("server listening at port 3000");
})