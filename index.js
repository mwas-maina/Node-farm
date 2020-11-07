const http=require('http');
const fs= require('fs');
const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,"utf-8");
const url=require('url');
const dataObj=JSON.parse(data);
const replaceHtml=require("./modules/replace");
const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,"utf-8");
const tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,"utf-8");
const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,"utf-8");

const server=http.createServer((req,res)=>{
    const{pathname,query}=url.parse(req.url,true);

    //API
    if(pathname ==="/api"){
        res.writeHead(200,{
            "Content-type":"application/json"
        })
        res.end(data)
    }
    //OVERVIEW PAGE
    else if(pathname ==="/" || pathname === "/overview"){
        res.writeHead(200,{"Content-type":"text/html"})
        const cardHtml=dataObj.map(el => replaceHtml(tempCard,el)).join("");
        const output=tempOverview.replace( `{%PRODUCTSCARD%}`,cardHtml);
        res.end(output);
        
    } 
    //PRODUCTS PAGE
    else if(pathname === "/product"){
        res.writeHead(200,{"Content-type":"text/html"})
        const product=dataObj[query.id];
        const output=replaceHtml(tempProduct,product)
        res.end(output)
    }  
    else{
        res.writeHead(404)
        res.end("PAGE NOT FOUND")
    }
   
});

server.listen(3000,"localhost",()=>{
    console.log("server listening at port 3000");
})