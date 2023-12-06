import fs from 'fs';
import path from "path";
import __dirname from "../utils.js";

class ProductManager {

    constructor( pathFile ){

        this.path = path.join(__dirname,`/files/${pathFile}`);
    }

    async getProducts(){

        try{

            if( fs.existsSync(this.path) )
            {
                const productos = JSON.parse(await fs.promises.readFile( this.path, 'utf-8'))
                
                return productos;

            }else{

                return [];
            }

        }catch (err){

            return err;
        }
    }

    async addProduct( producto ){

        if( !producto.title || !producto.description || !producto.price || !producto.code || !producto.stock )
        {   
            return "All fields are required. (Except thumbnails)";
        }

        const productos = await this.getProducts();

        let existe = productos.find(p => p.code == producto.code)

        if(existe){

            return "The Product Code Already Exist.";

        }else{
            
            if( productos.length === 0)
            {
                producto.id = 1;
            }else{

                producto.id = productos[ productos.length-1 ].id + 1;
            }
            
            if ( !producto.status )
            {
                producto.status = true;

            }else{    
                producto.status = producto.status;
            }

            productos.push( producto );

            await fs.promises.writeFile( this.path, JSON.stringify(productos, null, '\t') )

            return productos;
        }

        
    }

    async getProductById(productId){

        const productos = await this.getProducts();

        let producto = productos.find(producto => producto.id == productId)

        if(producto){

            return producto;

        }else{

            return "Product Not Found.";
        }
    }

    async updateProduct(id, updateProduct ){

        try{

            const productos = await this.getProducts();

            const productoIndex = productos.findIndex(prod => prod.id === id)

            if ( productoIndex != -1 ) {

                if( updateProduct.title )
                {
                    productos[ productoIndex ].title = updateProduct.title;
                }

                if( updateProduct.description )
                {
                    productos[ productoIndex ].description = updateProduct.description;
                }

                if( updateProduct.price )
                {
                    productos[ productoIndex ].price = updateProduct.price;
                }

                if( updateProduct.thumbnail )
                {
                    productos[ productoIndex ].thumbnail = updateProduct.thumbnail;
                }

                if( updateProduct.code )
                {
                    productos[ productoIndex ].code = updateProduct.code;
                }

                if( updateProduct.stock )
                {
                    productos[ productoIndex ].stock = updateProduct.stock;
                }

                if( updateProduct.status )
                {
                    productos[ productoIndex ].status = updateProduct.status;
                }
                
                await fs.promises.writeFile( this.path, JSON.stringify(productos, null, '\t') );

                return "Product Updated Successfully."

            } else {

                return "Product not found";
            }

        }catch (err){

            return err;

        }
    }

    async deleteProduct( productId ){

        try{

            const productos = await this.getProducts();

            const productoIndex = productos.findIndex( p => p.id == productId );

            if( productoIndex != -1 )
            {
                productos.splice( productoIndex, 1);

                await fs.promises.writeFile( this.path, JSON.stringify( productos, null, '\t') );

                return "Product Delete Successfully.";
            }else{

                return "Product not found";
            }


        }catch (err){

            return err;

        }

    }

}

export { ProductManager };