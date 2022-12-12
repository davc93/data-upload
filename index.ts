import { uploadImage, getAssetInfo, createImageTag } from "./config";
import fs, { read } from "fs";
import path from "path";
import { UploadResponse } from "./models/upload.model";
import { Product } from "./models/product.model";



const uploadImageFolder = (folder:string,cloudinaryFolder:string) => {
  const files: any = [];
  fs.readdirSync(folder).forEach(async (file) => {
    files.push(file);
  });

  return new Promise((resolve, reject) => {
    const urls:any = []
    files.forEach(async (file:string) => {

      const response = await uploadImage(path.resolve(folder,file),cloudinaryFolder)
      urls.push(response?.secure_url)
      if(files.length- 1 == files.indexOf(file)){
        resolve(urls)
      }
  
    })
  })

}

const createFullJson =  async (csvPath:any,filesPath:any,cloudinaryFolder:string, outputFile:string) => { 
  const csvFile:any = fs.readFileSync(csvPath)
  const arrCsv = JSON.parse(csvFile)
  const arrUrl:any = await uploadImageFolder(filesPath,cloudinaryFolder)
  console.log(arrCsv)
  console.log(arrUrl)
  arrCsv.forEach((product:any)=>{
    arrUrl.forEach((url:any)=>{
      const id = url.split("_")[0].at(-1)
      if(product.id == id){
        product.imagenes.push(url)
      }
    }) 
  })

  fs.writeFileSync(outputFile,JSON.stringify(arrCsv))

}
// use full path
// createFullJson()